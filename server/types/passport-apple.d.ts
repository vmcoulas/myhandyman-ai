declare module 'passport-apple' {
  import { Strategy as PassportStrategy } from 'passport';

  interface AppleStrategyOptions {
    clientID: string;
    teamID: string;
    keyID: string;
    privateKeyString?: string;
    privateKeyPath?: string;
    callbackURL: string;
    scope?: string[];
    passReqToCallback?: boolean;
  }

  type VerifyCallback = (
    accessToken: string,
    refreshToken: string,
    idToken: object,
    profile: any,
    done: (err: Error | null, user?: any) => void
  ) => void;

  class Strategy extends PassportStrategy {
    constructor(options: AppleStrategyOptions, verify: VerifyCallback);
    name: string;
    authenticate(req: any, options?: any): void;
  }

  export = Strategy;
}
