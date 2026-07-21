import { createContext, useCallback, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { LoginInput, RegisterInput } from '@krasidge/shared';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiGet, apiPatch, apiPost, setAuthExpiredHandler } from '@/lib/api';
import type { User } from '@/lib/types';

export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (input: LoginInput) => Promise<User>;
  loginAsync: (input: LoginInput) => Promise<User>;
  register: (input: RegisterInput) => Promise<User>;
  logout: () => Promise<void>;
  updateProfile: (name: string) => Promise<User>;
  isLoggingIn: boolean;
  isRegistering: boolean;
  isLoggingOut: boolean;
  refetch: () => Promise<unknown>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ME_QUERY_KEY = ['auth', 'me'] as const;

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const meQuery = useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: async () => {
      try {
        const { user } = await apiGet<{ user: User }>('/auth/me');
        return user;
      } catch {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  useEffect(() => {
    setAuthExpiredHandler(() => {
      queryClient.setQueryData(ME_QUERY_KEY, null);
    });
    return () => setAuthExpiredHandler(null);
  }, [queryClient]);

  const loginMutation = useMutation({
    mutationFn: (input: LoginInput) => apiPost<{ user: User }>('/auth/login', input),
    onSuccess: ({ user }) => {
      queryClient.setQueryData(ME_QUERY_KEY, user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (input: RegisterInput) => apiPost<{ user: User }>('/auth/register', input),
    onSuccess: ({ user }) => {
      queryClient.setQueryData(ME_QUERY_KEY, user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiPost<null>('/auth/logout'),
    onSuccess: () => {
      queryClient.setQueryData(ME_QUERY_KEY, null);
      queryClient.clear();
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: (name: string) => apiPatch<{ user: User }>('/users/me', { name }),
    onSuccess: ({ user }) => {
      queryClient.setQueryData(ME_QUERY_KEY, user);
    },
  });

  const login = useCallback(
    async (input: LoginInput) => (await loginMutation.mutateAsync(input)).user,
    [loginMutation],
  );

  const register = useCallback(
    async (input: RegisterInput) => (await registerMutation.mutateAsync(input)).user,
    [registerMutation],
  );

  const logout = useCallback(async () => {
    await logoutMutation.mutateAsync();
  }, [logoutMutation]);

  const updateProfile = useCallback(
    async (name: string) => (await updateProfileMutation.mutateAsync(name)).user,
    [updateProfileMutation],
  );

  const user = meQuery.data ?? null;

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading: meQuery.isLoading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      login,
      loginAsync: login,
      register,
      logout,
      updateProfile,
      isLoggingIn: loginMutation.isPending,
      isRegistering: registerMutation.isPending,
      isLoggingOut: logoutMutation.isPending,
      refetch: meQuery.refetch,
    }),
    [
      user,
      meQuery.isLoading,
      meQuery.refetch,
      login,
      register,
      logout,
      updateProfile,
      loginMutation.isPending,
      registerMutation.isPending,
      logoutMutation.isPending,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
