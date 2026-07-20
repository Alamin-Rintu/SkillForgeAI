'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  LayoutDashboard,
  PlusCircle,
  Layers,
  Bookmark,
  Bot,
  User,
  BarChart3,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const sidebarNav = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Add Roadmap', href: '/dashboard/add-roadmap', icon: PlusCircle },
  { name: 'Manage Roadmaps', href: '/dashboard/manage-roadmaps', icon: Layers },
  { name: 'Saved Roadmaps', href: '/dashboard/saved', icon: Bookmark },
  { name: 'AI Interview Coach', href: '/ai-interview-coach', icon: Bot },
  { name: 'AI Generator', href: '/ai-roadmap-generator', icon: Sparkles },
  { name: 'Platform Analytics', href: '/dashboard/analytics', icon: BarChart3 }
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16]">
      <Navbar />

      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 space-y-4">
          <div className="glass-card p-4 space-y-2 border border-slate-200 dark:border-slate-800">
            <h3 className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Workspace Menu</h3>
            <nav className="space-y-1">
              {sidebarNav.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Workspace Main Panel */}
        <main className="flex-1 min-w-0">
          {children}
        </main>

      </div>

      <Footer />
    </div>
  );
}
