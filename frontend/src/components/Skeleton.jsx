import React from 'react';

export const TaskSkeleton = () => {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 animate-pulse">
      <div className="flex items-center gap-3 w-2/3">
        <div className="w-5 h-5 rounded-md bg-slate-200 dark:bg-zinc-800"></div>
        <div className="h-4 bg-slate-200 dark:bg-zinc-800 rounded-md w-full"></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-zinc-800"></div>
        <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-zinc-800"></div>
        <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-zinc-800"></div>
      </div>
    </div>
  );
};

export const StatsSkeleton = () => {
  return (
    <div className="glass-panel p-5 rounded-2xl animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 bg-slate-200 dark:bg-zinc-800 rounded-md w-1/3"></div>
        <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-zinc-800"></div>
      </div>
      <div className="h-8 bg-slate-200 dark:bg-zinc-800 rounded-md w-1/2 mt-4"></div>
      <div className="h-3 bg-slate-200 dark:bg-zinc-800 rounded-md w-2/3 mt-2"></div>
    </div>
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatsSkeleton />
        <StatsSkeleton />
        <StatsSkeleton />
      </div>
      <div className="glass-panel p-6 rounded-2xl animate-pulse space-y-4">
        <div className="h-5 bg-slate-200 dark:bg-zinc-800 rounded-md w-1/4"></div>
        <div className="h-40 bg-slate-200/50 dark:bg-zinc-800/50 rounded-xl w-full"></div>
      </div>
    </div>
  );
};
