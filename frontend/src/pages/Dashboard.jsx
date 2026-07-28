import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { DashboardSkeleton } from '../components/Skeleton';
import { 
  ClipboardList, 
  CheckCircle2, 
  Clock, 
  Activity, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  Calendar,
  AlertTriangle,
  PlusCircle,
  BookOpen,
  Flag,
  ListTodo
} from 'lucide-react';

const Dashboard = ({ tasks, isLoading, setActiveTab, onCompleteTask, onAddTask }) => {
  const [quickTitle, setQuickTitle] = useState('');
  const [quickSubject, setQuickSubject] = useState('Computer Science');
  const [quickPriority, setQuickPriority] = useState('Medium');
  const [quickDueDate, setQuickDueDate] = useState('');

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  // Calculate overdue count
  const overdueCount = tasks.filter(t => {
    if (t.completed || !t.dueDate) return false;
    return new Date(t.dueDate) < new Date();
  }).length;

  // Recent 3 assignments
  const recentAssignments = [...tasks].slice(0, 3);

  // Upcoming deadlines (pending assignments with due dates, sorted soonest to latest)
  const upcomingDeadlines = [...tasks]
    .filter(t => !t.completed && t.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 3);

  // Simulated activity logs
  const activityLogs = [
    { text: 'Workspace metrics synchronized with MongoDB Atlas', time: 'Just now', icon: Activity, color: 'text-blue-500' },
    completed > 0 ? { text: 'You completed an assignment recently', time: '1 hour ago', icon: CheckCircle2, color: 'text-emerald-500' } : null,
    total > 0 ? { text: `Registered ${total} total coursework milestones`, time: 'Today', icon: ClipboardList, color: 'text-sky-500' } : null,
  ].filter(Boolean);

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    if (!quickTitle.trim()) return;

    await onAddTask({
      title: quickTitle.trim(),
      subject: quickSubject,
      priority: quickPriority,
      dueDate: quickDueDate
    });

    setQuickTitle('');
    setQuickDueDate('');
  };

  const getPriorityBadge = (p) => {
    switch (p?.toLowerCase()) {
      case 'high': return 'bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-450 border border-rose-250/20';
      case 'medium': return 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-450 border border-amber-250/20';
      case 'low': return 'bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-450 border border-blue-250/20';
      default: return 'bg-slate-50 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Dynamic Welcome Header Banner */}
      <GlassCard className="p-6 bg-gradient-to-r from-blue-500/10 via-sky-500/5 to-transparent relative overflow-hidden text-left" hover={false}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-800 dark:text-zinc-50 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-550 animate-pulse" />
              <span>Academic Workspace Dashboard</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-zinc-400">
              {pending === 0 
                ? "Excellent job! All registered course assignments are submitted." 
                : `You have ${pending} assignments pending. Let's make some progress today!`}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('assignments')}
            className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl text-blue-600 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/80 transition-colors w-fit"
          >
            <span>Assignments Manager</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </GlassCard>

      {/* 2. Key Performance Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Total Card */}
        <GlassCard className="p-4 text-left" hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">Total</span>
            <ClipboardList className="w-4 h-4 text-blue-550" />
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">{total}</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Assignments</p>
          </div>
        </GlassCard>

        {/* Pending Card */}
        <GlassCard className="p-4 text-left" hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">Pending</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">{pending}</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Awaiting submission</p>
          </div>
        </GlassCard>

        {/* Completed Card */}
        <GlassCard className="p-4 text-left" hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">{completed}</h3>
            <p className="text-[9px] text-slate-400 mt-0.5">Marked done</p>
          </div>
        </GlassCard>

        {/* Overdue Card */}
        <GlassCard className="p-4 text-left" hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">Overdue</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-3">
            <h3 className={`text-2xl font-extrabold ${overdueCount > 0 ? 'text-rose-500' : 'text-slate-800 dark:text-white'}`}>{overdueCount}</h3>
            <p className="text-[9px] text-slate-450 mt-0.5">Passed deadlines</p>
          </div>
        </GlassCard>

        {/* Completion % Card */}
        <GlassCard className="p-4 text-left col-span-2 lg:col-span-1" hover={false}>
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">Efficiency</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-white">{completionRate}%</h3>
            <p className="text-[9px] text-slate-450 mt-0.5">Ratio submitted</p>
          </div>
        </GlassCard>

      </div>

      {/* 3. Sub-widgets split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Recent and Upcoming widgets */}
        <div className="lg:col-span-8 space-y-5">
          
          {/* Upcoming Deadlines Widget */}
          <GlassCard className="p-5 text-left" hover={false}>
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span>Upcoming Course Deadlines</span>
            </h3>
            {upcomingDeadlines.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                No upcoming pending deadlines. Excellent status!
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-zinc-800/40">
                {upcomingDeadlines.map((task) => (
                  <div key={task._id} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 dark:text-white truncate">{task.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                        <span className="font-semibold text-slate-500 dark:text-zinc-400">{task.subject}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5 font-medium">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>Due: {task.dueDate}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getPriorityBadge(task.priority)}`}>
                        {task.priority}
                      </span>
                      <button 
                        onClick={() => onCompleteTask(task)}
                        className="px-3 py-1 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold rounded-lg transition-colors"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>

          {/* Recent Assignments log list */}
          <GlassCard className="p-5 text-left" hover={false}>
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-1.5">
              <ListTodo className="w-4 h-4 text-blue-500" />
              <span>Recent Submissions Log</span>
            </h3>
            {recentAssignments.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                Workspace log is empty. Save an assignment details to begin.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-zinc-800/40">
                {recentAssignments.map((task) => (
                  <div key={task._id} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                    <div className="min-w-0">
                      <span className={`text-xs font-bold ${task.completed ? 'line-through text-slate-400 dark:text-zinc-550' : 'text-slate-800 dark:text-zinc-100'}`}>
                        {task.title}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-0.5">{task.subject}</p>
                    </div>

                    <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                      task.completed 
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20' 
                        : 'bg-amber-50 text-amber-600 dark:bg-amber-950/20'
                    }`}>
                      {task.completed ? 'Submitted' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>

        {/* Right Column: Quick Add and Recent Activity widgets */}
        <div className="lg:col-span-4 space-y-5 text-left">
          
          {/* Quick Add Assignment Form Widget */}
          <GlassCard className="p-5" hover={false}>
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-1.5">
              <PlusCircle className="w-4.5 h-4.5 text-blue-500" />
              <span>Quick Register Assignment</span>
            </h3>

            <form onSubmit={handleQuickAdd} className="space-y-3.5">
              <div className="space-y-1">
                <input
                  type="text"
                  required
                  value={quickTitle}
                  onChange={(e) => setQuickTitle(e.target.value)}
                  placeholder="Assignment title..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 text-xs focus:border-blue-550 outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <select
                  value={quickSubject}
                  onChange={(e) => setQuickSubject(e.target.value)}
                  className="w-full px-2 py-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 text-[10px] outline-none"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="History">History</option>
                  <option value="Literature">Literature</option>
                  <option value="General">General</option>
                </select>

                <select
                  value={quickPriority}
                  onChange={(e) => setQuickPriority(e.target.value)}
                  className="w-full px-2 py-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 text-[10px] outline-none"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="space-y-1">
                <input
                  type="date"
                  value={quickDueDate}
                  onChange={(e) => setQuickDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-950/40 text-xs focus:border-blue-550 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
              >
                Register Assignment
              </button>
            </form>
          </GlassCard>

          {/* Recent Activity widget */}
          <GlassCard className="p-5" hover={false}>
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-blue-500" />
              <span>Workspace Activity Feed</span>
            </h3>

            <div className="space-y-3.5">
              {activityLogs.map((log, idx) => {
                const Icon = log.icon;
                return (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="p-1.5 bg-slate-50 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-lg flex-shrink-0">
                      <Icon className={`w-3.5 h-3.5 ${log.color}`} />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-slate-700 dark:text-zinc-300 leading-tight">
                        {log.text}
                      </p>
                      <span className="text-[9px] text-slate-400 mt-0.5 block">{log.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
