'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'jobseeker' | 'admin';
  avatar?: string;
  targetRole?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  demoLogin: (role?: 'student' | 'admin') => Promise<void>;
  betterAuthSignIn: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  betterAuthSignUp: (name: string, email: string, password: string, targetRole?: string) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync with Better Auth session hook or local storage fallback
  useEffect(() => {
    async function checkBetterAuthSession() {
      try {
        const sessionRes = await authClient.getSession();
        if (sessionRes?.data?.user) {
          const baUser = sessionRes.data.user;
          const formattedUser: User = {
            id: baUser.id,
            name: baUser.name || 'SkillForge Developer',
            email: baUser.email,
            role: (baUser as any).role || 'student',
            avatar: baUser.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(baUser.name || 'User')}`,
            targetRole: (baUser as any).targetRole || 'Full Stack Engineer'
          };
          setUser(formattedUser);
          setToken('better-auth-session-active');
          localStorage.setItem('skillforge_user', JSON.stringify(formattedUser));
          localStorage.setItem('skillforge_token', 'better-auth-session-active');
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Better Auth session check fallback:', err);
      }

      // Local storage fallback check
      const savedUser = localStorage.getItem('skillforge_user');
      const savedToken = localStorage.getItem('skillforge_token');

      if (savedUser && savedToken) {
        try {
          setUser(JSON.parse(savedUser));
          setToken(savedToken);
        } catch (e) {
          localStorage.removeItem('skillforge_user');
          localStorage.removeItem('skillforge_token');
        }
      } else {
        const defaultUser: User = {
          id: 'demo-user-123',
          name: 'Alex Morgan',
          email: 'alex.morgan@skillforge.ai',
          role: 'student',
          avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
          targetRole: 'Full Stack Engineer'
        };
        setUser(defaultUser);
        setToken('demo-token-123');
        localStorage.setItem('skillforge_user', JSON.stringify(defaultUser));
        localStorage.setItem('skillforge_token', 'demo-token-123');
      }
      setIsLoading(false);
    }

    checkBetterAuthSession();
  }, []);

  const login = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('skillforge_user', JSON.stringify(userData));
    localStorage.setItem('skillforge_token', authToken);
  };

  const logout = async () => {
    try {
      await authClient.signOut();
    } catch (e) {
      console.warn('Better Auth signout error:', e);
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('skillforge_user');
    localStorage.removeItem('skillforge_token');
  };

  const demoLogin = async (role: 'student' | 'admin' = 'student') => {
    setIsLoading(true);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${API_BASE}/custom-auth/demo-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role })
      });
      const data = await res.json();
      if (data.success) {
        login(data.user, data.token);
      } else {
        const fallback: User = role === 'admin' ? {
          id: 'admin-123',
          name: 'Admin Master',
          email: 'admin@skillforge.ai',
          role: 'admin',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
        } : {
          id: 'demo-user-123',
          name: 'Alex Morgan',
          email: 'alex.morgan@skillforge.ai',
          role: 'student',
          avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
        };
        login(fallback, 'demo-token');
      }
    } catch (e) {
      const fallback: User = {
        id: 'demo-user-123',
        name: 'Alex Morgan',
        email: 'alex.morgan@skillforge.ai',
        role: 'student',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'
      };
      login(fallback, 'demo-token');
    } finally {
      setIsLoading(false);
    }
  };

  const betterAuthSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await authClient.signIn.email({
        email,
        password,
      });
      if (res.data?.user) {
        const baUser = res.data.user;
        const formattedUser: User = {
          id: baUser.id,
          name: baUser.name || 'Developer',
          email: baUser.email,
          role: (baUser as any).role || 'student',
          avatar: baUser.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(baUser.name || 'User')}`,
          targetRole: (baUser as any).targetRole || 'Full Stack Engineer'
        };
        login(formattedUser, 'better-auth-session-active');
        return { success: true };
      } else {
        return { success: false, message: (res as any).error?.message || 'Better Auth Sign In failed' };
      }
    } catch (err: any) {
      return { success: false, message: err.message || 'Better Auth Sign In Error' };
    } finally {
      setIsLoading(false);
    }
  };

  const betterAuthSignUp = async (name: string, email: string, password: string, targetRole: string = 'Full Stack Engineer') => {
    setIsLoading(true);
    try {
      const res = await authClient.signUp.email({
        name,
        email,
        password,
        targetRole,
      } as any);
      if (res.data?.user) {
        const baUser = res.data.user;
        const formattedUser: User = {
          id: baUser.id,
          name: baUser.name || name,
          email: baUser.email,
          role: 'student',
          avatar: baUser.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
          targetRole
        };
        login(formattedUser, 'better-auth-session-active');
        return { success: true };
      } else {
        return { success: false, message: (res as any).error?.message || 'Better Auth Sign Up failed' };
      }
    } catch (err: any) {
      return { success: false, message: err.message || 'Better Auth Sign Up Error' };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoading,
      login,
      logout,
      demoLogin,
      betterAuthSignIn,
      betterAuthSignUp
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
