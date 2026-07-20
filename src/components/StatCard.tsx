'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: 'blue' | 'purple' | 'cyan' | 'emerald';
}

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'blue' }: StatCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case 'purple':
        return 'from-purple-600/20 to-purple-900/10 text-purple-500 border-purple-500/20';
      case 'cyan':
        return 'from-cyan-600/20 to-cyan-900/10 text-cyan-500 border-cyan-500/20';
      case 'emerald':
        return 'from-emerald-600/20 to-emerald-900/10 text-emerald-500 border-emerald-500/20';
      default:
        return 'from-blue-600/20 to-blue-900/10 text-blue-500 border-blue-500/20';
    }
  };

  return (
    <div className="glass-card p-6 flex items-center gap-4 relative overflow-hidden group">
      <div className={`p-4 rounded-2xl bg-gradient-to-br border ${getColorClasses()}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{value}</h3>
        {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}
