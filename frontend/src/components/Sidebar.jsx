import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  LayoutDashboard, 
  ClipboardList,
  Calendar,
  BarChart3,
  Bell,
  User,
  Settings,
  LogOut, 
  Sun, 
  Moon, 
  ChevronLeft, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const { logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assignments', label: 'Assignments', icon: ClipboardList },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div 
      className={`fixed top-0 left-0 h-full z-30 flex flex-col border-r border-slate-200/50 dark:border-zinc-805 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md transition-all duration-350 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Sidebar Header / Logo */}
      <div className="flex items-center justify-between px-5 h-16 border-b border-slate-200/50 dark:border-zinc-805">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-650 to-sky-500 text-white shadow-md shadow-blue-500/20 flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          {isOpen && (
            <span className="font-bold text-base tracking-tight text-slate-800 dark:text-zinc-100 whitespace-nowrap">
              AssignTrack
            </span>
          )}
        </div>
        
        {/* Toggle Collapse Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 text-slate-500 dark:text-zinc-400 transition-colors"
        >
          {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
      </div>

      {/* Workspace Profile Info */}
      <div className="p-4 border-b border-slate-200/50 dark:border-zinc-805 overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 dark:bg-zinc-800 text-blue-700 dark:text-zinc-300 font-semibold text-sm flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          {isOpen && (
            <div className="min-w-0 text-left">
              <p className="text-sm font-semibold text-slate-800 dark:text-zinc-100 truncate">
                {user?.name || 'Workspace User'}
              </p>
              <p className="text-[10px] text-slate-400 dark:text-zinc-500 truncate font-semibold uppercase tracking-wider">
                Student Workspace
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/10'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 dark:text-zinc-400 dark:hover:text-zinc-105 dark:hover:bg-zinc-900/50'
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600 dark:text-zinc-500 dark:group-hover:text-zinc-300'}`} />
              {isOpen && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer (Theme Toggle & Logout) */}
      <div className="p-3 border-t border-slate-200/50 dark:border-zinc-850 space-y-2">
        {/* Dark Mode Switcher */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-900 hover:bg-slate-50 dark:text-zinc-400 dark:hover:text-zinc-105 dark:hover:bg-zinc-900/50 transition-colors"
        >
          {isDark ? (
            <>
              <Sun className="w-5 h-5 text-amber-500 flex-shrink-0" />
              {isOpen && <span>Light Mode</span>}
            </>
          ) : (
            <>
              <Moon className="w-5 h-5 text-indigo-500 flex-shrink-0" />
              {isOpen && <span>Dark Mode</span>}
            </>
          )}
        </button>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/20 transition-colors group"
        >
          <LogOut className="w-5 h-5 flex-shrink-0 text-rose-500 group-hover:translate-x-0.5 transition-transform" />
          {isOpen && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
