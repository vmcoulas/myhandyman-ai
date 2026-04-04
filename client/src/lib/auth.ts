import { useQuery } from "@tanstack/react-query";

export interface AuthUser {
  id: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  profileImageUrl?: string | null;
  isPremium: boolean;
}

export function useAuth() {
  const { data: user, isLoading } = useQuery<AuthUser | null>({
    queryKey: ["/api/auth/user"],
    queryFn: async () => {
      const res = await fetch("/api/auth/user");
      if (!res.ok) return null;
      return res.json();
    },
    staleTime: 60_000,
  });

  return { user: user ?? null, isLoading };
}

export function signInWithGoogle() {
  window.location.href = "/api/auth/google";
}

export function signInWithApple() {
  window.location.href = "/api/auth/apple";
}

export function signOut() {
  window.location.href = "/api/auth/logout";
}
