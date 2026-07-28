import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { useToast } from '../context/ToastContext';
import { 
  Bell, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Trash2, 
  Info,
  Play
} from 'lucide-react';

const NotificationsView = ({ tasks }) => {
  const { showToast } = useToast();

  // Create some default simulated notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Upcoming Deadline Alert',
      message: 'Your assignment "CS-102: Binary Trees Homework" is due in less than 24 hours.',
      type: 'warning',
      time: '10 mins ago',
      read: false
    },
    {
      id: 2,
      title: 'Assignment Submitted Successfully',
      message: 'You have submitted "Math-240: Linear Algebra HW 2" on time. Excellent work!',
      type: 'success',
      time: '3 hours ago',
      read: true
    },
    {
      id: 3,
      title: 'Course Analytics Synced',
      message: 'Your workspace completed assignment statistics have been synchronized with the Cloud server.',
      type: 'info',
      time: '1 day ago',
      read: true
    }
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'success');
  };

  const clearAll = () => {
    setNotifications([]);
    showToast('Notification logs cleared', 'success');
  };

  const simulateAlert = () => {
    // Pick a random pending assignment from tasks to simulate warning
    const pendingTasks = tasks.filter(t => !t.completed);
    let taskTitle = 'General Project Submission';
    if (pendingTasks.length > 0) {
      taskTitle = pendingTasks[Math.floor(Math.random() * pendingTasks.length)].title;
    }

    const newNotif = {
      id: Date.now(),
      title: 'Automated Deadline Warning',
      message: `Attention! "${taskTitle}" due date is approaching fast. Review your milestones.`,
      type: 'warning',
      time: 'Just now',
      read: false
    };

    setNotifications(prev => [newNotif, ...prev]);
    showToast(`Warning: "${taskTitle}" is due soon!`, 'warning');
  };

  const getNotifIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertCircle className="w-4.5 h-4.5 text-amber-500" />;
      case 'success': return <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />;
      case 'error': return <AlertCircle className="w-4.5 h-4.5 text-rose-500" />;
      default: return <Info className="w-4.5 h-4.5 text-blue-500" />;
    }
  };

  const getNotifBg = (type, read) => {
    if (read) return 'bg-white/40 dark:bg-zinc-950/10 border-slate-100 dark:border-zinc-800/40 opacity-70';
    switch (type) {
      case 'warning': return 'bg-amber-50/50 dark:bg-amber-950/10 border-amber-200/30 dark:border-amber-900/20';
      case 'success': return 'bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200/30 dark:border-emerald-900/20';
      default: return 'bg-blue-50/50 dark:bg-blue-950/10 border-blue-200/30 dark:border-blue-900/20';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <GlassCard className="p-6" hover={false}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-500 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-50">Notifications Center</h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Track deadline warnings and course workspace status updates
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={simulateAlert}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 rounded-xl transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simulate warning</span>
            </button>
            <button 
              onClick={markAllRead}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 rounded-xl transition-all"
            >
              Mark Read
            </button>
            <button 
              onClick={clearAll}
              className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all border border-transparent hover:border-rose-100/50"
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Notifications Feed */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center glass-panel rounded-2xl bg-white/70 dark:bg-zinc-900/60 p-8">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mb-2 animate-bounce" />
            <p className="text-sm font-semibold text-slate-700 dark:text-zinc-200">All Caught Up</p>
            <p className="text-xs text-slate-400 dark:text-zinc-550 mt-1">No active notifications or warnings logs</p>
          </div>
        ) : (
          notifications.map(notif => (
            <div 
              key={notif.id}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${getNotifBg(notif.type, notif.read)}`}
            >
              <div className="w-9 h-9 rounded-lg bg-white dark:bg-zinc-900 shadow-sm flex items-center justify-center flex-shrink-0">
                {getNotifIcon(notif.type)}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`text-xs font-bold ${notif.read ? 'text-slate-550' : 'text-slate-800 dark:text-zinc-105'}`}>
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-medium whitespace-nowrap">{notif.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  {notif.message}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default NotificationsView;
