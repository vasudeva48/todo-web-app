import React from 'react';
import GlassCard from '../components/GlassCard';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Activity, 
  BookOpen, 
  Flag, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

const AnalyticsView = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // 1. Calculate Priority Metrics
  const highTasks = tasks.filter(t => t.priority?.toLowerCase() === 'high').length;
  const medTasks = tasks.filter(t => t.priority?.toLowerCase() === 'medium').length;
  const lowTasks = tasks.filter(t => t.priority?.toLowerCase() === 'low').length;

  // SVG parameters for Priority Donut
  const donutRadius = 40;
  const donutStroke = 10;
  const donutCircumference = 2 * Math.PI * donutRadius;

  const highPct = total > 0 ? highTasks / total : 0;
  const medPct = total > 0 ? medTasks / total : 0;
  const lowPct = total > 0 ? lowTasks / total : 0;

  const highOffset = donutCircumference;
  const medOffset = donutCircumference - (highPct * donutCircumference);
  const lowOffset = medOffset - (medPct * donutCircumference);

  // 2. Calculate Course/Subject Metrics
  const subjectMap = {};
  tasks.forEach(t => {
    const s = t.subject || 'General';
    subjectMap[s] = (subjectMap[s] || 0) + 1;
  });

  const subjects = Object.keys(subjectMap).map(name => ({
    name,
    count: subjectMap[name]
  })).sort((a, b) => b.count - a.count).slice(0, 5); // top 5 subjects

  const maxSubjectCount = subjects.length > 0 ? Math.max(...subjects.map(s => s.count)) : 1;

  // 3. Overdue Assignments Metric
  const overdueTasksCount = tasks.filter(t => {
    if (t.completed || !t.dueDate) return false;
    return new Date(t.dueDate) < new Date();
  }).length;

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <GlassCard className="p-6" hover={false}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-500 flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-50">Academic Analytics</h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              High fidelity metrics of your courses and assignment completion performance
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Overview Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <GlassCard className="p-5 text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Completion Efficiency</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-extrabold text-slate-850 dark:text-white">{completionRate}%</span>
            <span className="text-xs font-semibold text-emerald-500 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>Ready</span>
            </span>
          </div>
          <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-2">Overall ratio of submitted work</p>
        </GlassCard>

        <GlassCard className="p-5 text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Total Assignments</span>
          <div className="text-3xl font-extrabold text-slate-850 dark:text-white mt-1">{total}</div>
          <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-2">Active tasks log count</p>
        </GlassCard>

        <GlassCard className="p-5 text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Pending Submissions</span>
          <div className="text-3xl font-extrabold text-slate-850 dark:text-white mt-1">{pending}</div>
          <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-2">Awaiting completion status</p>
        </GlassCard>

        <GlassCard className="p-5 text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Overdue Assignments</span>
          <div className={`text-3xl font-extrabold mt-1 ${overdueTasksCount > 0 ? 'text-rose-500' : 'text-slate-850 dark:text-white'}`}>{overdueTasksCount}</div>
          <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-2">Passed deadline thresholds</p>
        </GlassCard>
      </div>

      {/* SVG Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Priority Density (Donut Chart) */}
        <GlassCard className="p-6 flex flex-col justify-between" hover={false}>
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100 dark:border-zinc-800/60">
            <PieChart className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-zinc-200">Priority Density Distribution</h3>
          </div>

          {total === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
              <Activity className="w-8 h-8 opacity-40 mb-2 animate-pulse" />
              <p className="text-xs font-semibold">No data available</p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
              
              {/* Donut SVG */}
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg width="100%" height="100%" viewBox="0 0 100 100" className="transform -rotate-90">
                  {/* High priority */}
                  <circle
                    cx="50" cy="50" r={donutRadius}
                    fill="transparent" stroke="#f43f5e" strokeWidth={donutStroke}
                    strokeDasharray={donutCircumference}
                    strokeDashoffset={donutCircumference - (highPct * donutCircumference)}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                  {/* Medium priority */}
                  <circle
                    cx="50" cy="50" r={donutRadius}
                    fill="transparent" stroke="#f59e0b" strokeWidth={donutStroke}
                    strokeDasharray={donutCircumference}
                    strokeDashoffset={donutCircumference - (medPct * donutCircumference)}
                    style={{ transform: `rotate(${highPct * 360}deg)`, transformOrigin: '50px 50px' }}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                  {/* Low priority */}
                  <circle
                    cx="50" cy="50" r={donutRadius}
                    fill="transparent" stroke="#3b82f6" strokeWidth={donutStroke}
                    strokeDasharray={donutCircumference}
                    strokeDashoffset={donutCircumference - (lowPct * donutCircumference)}
                    style={{ transform: `rotate(${(highPct + medPct) * 360}deg)`, transformOrigin: '50px 50px' }}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>

                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-xl font-extrabold text-slate-800 dark:text-zinc-50">{total}</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">total</span>
                </div>
              </div>

              {/* Legends */}
              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between gap-4 p-2 rounded-xl bg-slate-50/50 dark:bg-zinc-950/20 border border-slate-100 dark:border-zinc-800/40">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                    <span>High Priority</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-zinc-300">{highTasks} ({Math.round(highPct * 100)}%)</span>
                </div>
                <div className="flex items-center justify-between gap-4 p-2 rounded-xl bg-slate-50/50 dark:bg-zinc-950/20 border border-slate-100 dark:border-zinc-800/40">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span>Medium Priority</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-zinc-300">{medTasks} ({Math.round(medPct * 100)}%)</span>
                </div>
                <div className="flex items-center justify-between gap-4 p-2 rounded-xl bg-slate-50/50 dark:bg-zinc-950/20 border border-slate-100 dark:border-zinc-800/40">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    <span>Low Priority</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-zinc-300">{lowTasks} ({Math.round(lowPct * 100)}%)</span>
                </div>
              </div>
            </div>
          )}
        </GlassCard>

        {/* Chart 2: Subjects Distribution (Vertical Custom Bar Chart) */}
        <GlassCard className="p-6 flex flex-col justify-between" hover={false}>
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100 dark:border-zinc-800/60">
            <BookOpen className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-zinc-200">Assignment Count by Subject</h3>
          </div>

          {subjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
              <Activity className="w-8 h-8 opacity-40 mb-2 animate-pulse" />
              <p className="text-xs font-semibold">No data available</p>
            </div>
          ) : (
            <div className="space-y-4 py-2">
              {subjects.map((sub, index) => {
                const barWidth = (sub.count / maxSubjectCount) * 100;
                return (
                  <div key={index} className="space-y-1.5 text-left">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-650 dark:text-zinc-300">
                      <span>{sub.name}</span>
                      <span>{sub.count} Assignment{sub.count > 1 ? 's' : ''}</span>
                    </div>
                    {/* Visual Bar */}
                    <div className="w-full h-3 bg-slate-100 dark:bg-zinc-800/60 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${barWidth}%` }}
                        className="h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full transition-all duration-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </GlassCard>

      </div>

    </div>
  );
};

export default AnalyticsView;
