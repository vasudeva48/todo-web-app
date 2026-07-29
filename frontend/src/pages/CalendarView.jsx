import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Calendar as CalendarIcon,
  Flag,
  BookOpen,
  CheckCircle2,
  Clock,
  X
} from 'lucide-react';

const CalendarView = ({ tasks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDay(null);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Map parsed tasks to due dates
  const getTasksForDay = (day) => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const matchStr = `${year}-${month}-${dayStr}`;

    return tasks.filter(t => {
      if (!t.dueDate) return false;
      // Extract YYYY-MM-DD from t.dueDate
      return t.dueDate.startsWith(matchStr);
    });
  };

  // Generate days array
  const blankDays = Array(firstDay).fill(null);
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const allDays = [...blankDays, ...monthDays];

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-rose-500 text-white';
      case 'medium': return 'bg-amber-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return 'bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-200/40';
      case 'medium': return 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 border border-amber-200/40';
      case 'low': return 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-200/40';
      default: return 'bg-slate-50 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Calendar Header Card */}
      <GlassCard className="p-6" hover={false}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-500 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-50 flex items-center gap-1.5">
                Assignments Calendar
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Visualize deadlines and schedule milestones dynamically
              </p>
            </div>
          </div>

          {/* Month Controller */}
          <div className="flex items-center gap-3">
            <button 
              onClick={prevMonth}
              className="p-2 rounded-xl border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 text-slate-600 dark:text-zinc-400 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-bold text-slate-800 dark:text-zinc-100 min-w-[120px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button 
              onClick={nextMonth}
              className="p-2 rounded-xl border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 text-slate-600 dark:text-zinc-400 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Monthly Grid */}
      <div className="glass-panel rounded-2xl overflow-hidden bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md border border-slate-200/50 dark:border-zinc-800/50">
        
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 border-b border-slate-200/40 dark:border-zinc-800/40 bg-slate-50/50 dark:bg-zinc-950/40">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
            <div key={i} className="py-3 text-center text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
              {d}
            </div>
          ))}
        </div>

        {/* Days Grid Cells */}
        <div className="grid grid-cols-7 divide-x divide-y divide-slate-100 dark:divide-zinc-800/40">
          {allDays.map((day, idx) => {
            const dayTasks = day ? getTasksForDay(day) : [];
            const isToday = day && 
              new Date().getDate() === day && 
              new Date().getMonth() === currentDate.getMonth() && 
              new Date().getFullYear() === currentDate.getFullYear();
            const isSelected = day && selectedDay === day;

            return (
              <div 
                key={idx} 
                onClick={() => day && setSelectedDay(day)}
                className={`min-h-[65px] md:min-h-[110px] p-1 md:p-2 flex flex-col justify-between hover:bg-slate-50/40 dark:hover:bg-zinc-900/10 transition-all relative cursor-pointer select-none ${
                  idx < 7 ? 'border-t-0' : ''
                } ${
                  isSelected ? 'bg-blue-500/10 dark:bg-blue-500/5 ring-1 ring-blue-500/30' : ''
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  {day ? (
                    <span 
                      className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${
                        isToday 
                          ? 'bg-blue-600 text-white' 
                          : 'text-slate-700 dark:text-zinc-300'
                      }`}
                    >
                      {day}
                    </span>
                  ) : (
                    <span />
                  )}
                  {dayTasks.length > 0 && (
                    <span className="hidden md:inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                      {dayTasks.length} task{dayTasks.length > 1 ? 's' : ''}
                    </span>
                  )}
                </div>

                {/* Mobile Priority Dots Row */}
                <div className="flex md:hidden items-center justify-center gap-1 mt-1 flex-wrap">
                  {dayTasks.slice(0, 4).map((task) => (
                    <span 
                      key={task._id}
                      className={`w-1.5 h-1.5 rounded-full ${
                        task.priority?.toLowerCase() === 'high' ? 'bg-rose-500' :
                        task.priority?.toLowerCase() === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                      } ${task.completed ? 'opacity-40' : ''}`}
                    />
                  ))}
                  {dayTasks.length > 4 && (
                    <span className="text-[8px] font-bold text-slate-400 dark:text-zinc-500">+</span>
                  )}
                </div>

                {/* Desktop Tasks List (Visual Badges) */}
                <div className="hidden md:block flex-1 space-y-1 overflow-hidden mt-1 max-h-[70px]">
                  {dayTasks.slice(0, 3).map((task) => (
                    <button
                      key={task._id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTask(task);
                      }}
                      className={`w-full text-[10px] font-medium px-2 py-0.5 rounded-md truncate text-left block cursor-pointer transition-transform hover:scale-102 ${getPriorityColor(task.priority)} ${
                        task.completed ? 'opacity-55 line-through' : ''
                      }`}
                    >
                      {task.title}
                    </button>
                  ))}
                  {dayTasks.length > 3 && (
                    <div className="text-[9px] text-slate-400 font-medium pl-1">
                      + {dayTasks.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Tasks Panel (visible on all screens, but especially useful on mobile/tablet) */}
      {selectedDay && (
        <GlassCard className="p-5 text-left mt-5 animate-slide-up" hover={false}>
          <h3 className="text-xs font-bold uppercase text-slate-450 dark:text-zinc-400 tracking-wider mb-4 flex items-center gap-1.5">
            <CalendarIcon className="w-4 h-4 text-blue-500" />
            <span>Due on {monthNames[currentDate.getMonth()]} {selectedDay}, {currentDate.getFullYear()}</span>
          </h3>
          {getTasksForDay(selectedDay).length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No assignments due on this day.</p>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-zinc-800/40">
              {getTasksForDay(selectedDay).map(task => (
                <div key={task._id} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 dark:text-white truncate">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                      <span className="font-semibold text-slate-550 dark:text-zinc-400">{task.subject}</span>
                      <span>•</span>
                      <span className={`font-bold uppercase tracking-wider ${
                        task.priority?.toLowerCase() === 'high' ? 'text-rose-500' :
                        task.priority?.toLowerCase() === 'medium' ? 'text-amber-500' : 'text-blue-500'
                      }`}>{task.priority}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedTask(task)}
                    className="px-3.5 py-2.5 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-xl transition-colors flex-shrink-0"
                    style={{ minHeight: '44px', minWidth: '60px' }}
                    aria-label="View task details"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      )}

      {/* Task Details Slide-over Modal Overlay */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl relative animate-scale-in">
            
            <button 
              onClick={() => setSelectedTask(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-slate-900 dark:text-zinc-50 pr-8 mb-4">
              Assignment Details
            </h3>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1">Title</span>
                <p className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                  {selectedTask.title}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1">Subject</span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-650 dark:text-zinc-350">
                    <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                    <span>{selectedTask.subject}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1">Priority</span>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${getPriorityBadge(selectedTask.priority)}`}>
                    <Flag className="w-3 h-3 fill-current" />
                    <span>{selectedTask.priority}</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1">Due Date</span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-650 dark:text-zinc-350">
                    <Clock className="w-3.5 h-3.5 text-blue-500" />
                    <span>{selectedTask.dueDate || 'No Deadline'}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-1">Status</span>
                  <div className="flex items-center gap-1.5 text-xs">
                    {selectedTask.completed ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Completed</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4 text-amber-500" />
                        <span className="text-amber-600 dark:text-amber-400 font-semibold">Pending Action</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800/60 flex justify-end">
              <button 
                onClick={() => setSelectedTask(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-750 transition-colors shadow-sm"
              >
                Close details
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CalendarView;
