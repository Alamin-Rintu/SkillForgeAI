'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import {
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  LayoutDashboard,
  Bookmark,
  LogOut,
  ChevronDown,
  Layers
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-[#090d16]/75 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-500 p-0.5 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
            SkillForge <span className="gradient-text">AI</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-900/60 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-800/60">
          <Link
            href="/"
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
              isActive('/')
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400'
            }`}
          >
            Home
          </Link>
          <Link
            href="/explore"
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
              isActive('/explore')
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400'
            }`}
          >
            Explore
          </Link>

          {user ? (
            <>
              <Link
                href="/dashboard"
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive('/dashboard')
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400'
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/saved"
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive('/dashboard/saved')
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400'
                }`}
              >
                Saved Resources
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/blog"
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive('/blog')
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400'
                }`}
              >
                Blog
              </Link>
              <Link
                href="/about"
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive('/about')
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400'
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  isActive('/contact')
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-400'
                }`}
              >
                Contact
              </Link>
            </>
          )}
        </nav>

        {/* Right CTA / Controls */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Dark/Light Mode Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-3 p-1.5 pr-3 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-all"
              >
                <img
                  src={user.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80'}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500/50"
                />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">{user.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 glass-card bg-white dark:bg-[#0f172a] p-2 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 z-50">
                  <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800 mb-1">
                    <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                  >
                    <LayoutDashboard className="w-4 h-4 text-blue-500" /> Dashboard Overview
                  </Link>
                  <Link
                    href="/dashboard/manage-roadmaps"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                  >
                    <Layers className="w-4 h-4 text-purple-500" /> My Roadmaps
                  </Link>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl mt-1"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-5 py-2.5 text-sm font-semibold gradient-btn rounded-full shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-panel border-t border-slate-200 dark:border-slate-800 px-4 py-6 space-y-3 bg-white dark:bg-[#090d16]">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          >
            Home
          </Link>
          <Link
            href="/explore"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          >
            Explore Roadmaps
          </Link>
          {user ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Dashboard
              </Link>
              <Link
                href="/ai-roadmap-generator"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 rounded-xl"
              >
                AI Roadmap Generator
              </Link>
              <Link
                href="/ai-resume-analyzer"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-950/30 rounded-xl"
              >
                AI Resume Analyzer
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full text-left px-4 py-2.5 text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-xl"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-sm font-semibold gradient-btn rounded-xl"
              >
                Register Free
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
