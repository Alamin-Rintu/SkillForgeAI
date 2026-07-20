'use client';

import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="glass-card h-[380px] flex flex-col overflow-hidden animate-pulse">
      <div className="h-48 w-full bg-slate-200 dark:bg-slate-800/80" />
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-full" />
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-5/6" />
        </div>

        <div className="flex gap-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20" />
        </div>

        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-24" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20" />
        </div>
      </div>
    </div>
  );
}
