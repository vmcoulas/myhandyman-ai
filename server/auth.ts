import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import AppleStrategy from "passport-apple";
import session from "express-session";
import connectPg from "connect-pg-simple";
import type { Express, RequestHandler } from "express";
import { storage } from "./storage";
import { addSubscriber } from "./services/emailList";

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: sessionTtl,
    },
  });
}

/**
 * Upserts a user by email (or creates one) and links their OAuth account.
 * Returns the user record.
 */
async function upsertOAuthUser(opts: {
  provider: "google" | "apple";
  providerAccountId: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  profileImageUrl?: string | null;
  isNewUser?: boolean;
}) {
  // 1. Check if this OAuth account is already linked
  let user = await storage.getUserByOAuthAccount(opts.provider, opts.providerAccountId);

  if (!user) {
    // 2. Try to find an existing user by email to merge accounts
    if (opts.email) {
      user = await storage.getUserByEmail(opts.email);
    }

    if (!user) {
      // 3. Create a new user
      user = await storage.upsertUser({
        email: opts.email ?? undefined,
        firstName: opts.firstName ?? undefined,
        lastName: opts.lastName ?? undefined,
        profileImageUrl: opts.profileImageUrl ?? undefined,
      });

      // Subscribe new users to the email list
      if (opts.email) {
        await addSubscriber(opts.email, opts.firstName).catch((err) =>
          console.error("[emailList] subscribe error:", err)
        );
      }
    }

    // 4. Link the OAuth account to this user
    await storage.createOAuthAccount({
      userId: user.id,
      provider: opts.provider,
      providerAccountId: opts.providerAccountId,
    });
  } else {
    // 5. Update profile info on subsequent logins
    const updates: Record<string, string | null | undefined> = {};
    if (opts.firstName) updates.firstName = opts.firstName;
    if (opts.lastName) updates.lastName = opts.lastName;
    if (opts.profileImageUrl) updates.profileImageUrl = opts.profileImageUrl;
    if (Object.keys(updates).length > 0) {
      user = await storage.updateUser(user.id, updates);
    }
  }

  return user;
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  // --- Google OAuth2 ---
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    const baseUrl = process.env.APP_BASE_URL ?? "http://localhost:5000";
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: `${baseUrl}/api/auth/google/callback`,
          scope: ["email", "profile"],
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const email = profile.emails?.[0]?.value;
            const user = await upsertOAuthUser({
              provider: "google",
              providerAccountId: profile.id,
              email,
              firstName: profile.name?.givenName,
              lastName: profile.name?.familyName,
              profileImageUrl: profile.photos?.[0]?.value,
            });
            done(null, user);
          } catch (err) {
            done(err as Error);
          }
        }
      )
    );
  }

  // --- Apple Sign In ---
  if (
    process.env.APPLE_TEAM_ID &&
    process.env.APPLE_CLIENT_ID &&
    process.env.APPLE_KEY_ID &&
    process.env.APPLE_PRIVATE_KEY
  ) {
    const baseUrl = process.env.APP_BASE_URL ?? "http://localhost:5000";
    passport.use(
      new AppleStrategy(
        {
          clientID: process.env.APPLE_CLIENT_ID,
          teamID: process.env.APPLE_TEAM_ID,
          keyID: process.env.APPLE_KEY_ID,
          // The private key can be stored as a multiline env var (newlines as \n)
          privateKeyString: process.env.APPLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
          callbackURL: `${baseUrl}/api/auth/apple/callback`,
          scope: ["name", "email"],
          passReqToCallback: false,
        } as any,
        async (_accessToken: string, _refreshToken: string, _idToken: object, profile: any, done: (err: Error | null, user?: any) => void) => {
          try {
            // Apple only sends name/email on the very first authorization
            const sub: string = (profile as any).id ?? (profile as any).sub;
            const email: string | undefined = (profile as any).email;
            const firstName: string | undefined = (profile as any).name?.firstName;
            const lastName: string | undefined = (profile as any).name?.lastName;

            const user = await upsertOAuthUser({
              provider: "apple",
              providerAccountId: sub,
              email,
              firstName,
              lastName,
            });
            done(null, user);
          } catch (err) {
            done(err as Error);
          }
        }
      )
    );
  }

  passport.serializeUser((user: any, cb) => cb(null, user.id));
  passport.deserializeUser(async (id: string, cb) => {
    try {
      const user = await storage.getUser(id);
      cb(null, user ?? null);
    } catch (err) {
      cb(err);
    }
  });

  // --- Auth routes ---

  // GET /api/auth/user — returns the current session user or null
  app.get("/api/auth/user", (req, res) => {
    res.json(req.user ?? null);
  });

  // Google OAuth flow
  app.get(
    "/api/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
  );

  app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", {
      failureRedirect: "/?auth=error",
    }),
    (req, res) => {
      res.redirect("/?auth=success");
    }
  );

  // Apple Sign In flow (Apple sends a POST to the callback)
  app.get(
    "/api/auth/apple",
    passport.authenticate("apple")
  );

  app.post(
    "/api/auth/apple/callback",
    passport.authenticate("apple", {
      failureRedirect: "/?auth=error",
    }),
    (req, res) => {
      res.redirect("/?auth=success");
    }
  );

  // Logout
  app.get("/api/auth/logout", (req, res) => {
    req.logout(() => {
      req.session.destroy(() => {
        res.redirect("/");
      });
    });
  });
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};
