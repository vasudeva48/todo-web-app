import React from 'react';
import { ClipboardList, Plus } from 'lucide-react';

const EmptyState = ({ title = 'No tasks found', description = 'Get started by creating your first task.', onActionClick, actionLabel = 'Create Task' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-2xl border border-dashed border-slate-200 dark:border-zinc-800 bg-white/10 dark:bg-zinc-900/10 backdrop-blur-sm">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 dark:bg-zinc-900 text-slate-400 dark:text-zinc-600 mb-4 shadow-inner">
        <ClipboardList className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-zinc-200">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1 max-w-xs">{description}</p>
      
      {onActionClick && (
        <button
          onClick={onActionClick}
          className="inline-flex items-center gap-1.5 px-4 py-2 mt-5 text-sm font-medium rounded-xl text-white bg-brand-500 hover:bg-brand-600 shadow-sm shadow-brand-500/10 hover:shadow-brand-500/20 active:scale-98 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
