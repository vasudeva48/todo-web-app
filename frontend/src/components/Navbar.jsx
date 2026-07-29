import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Menu, Search, Calendar, Bell, Sun, Moon, LogOut, User, Settings } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab, onMenuToggle, onQuickAddClick, searchQuery, setSearchQuery }) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  // Dropdown states
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Format current date
  const formatDate = () => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (activeTab !== 'assignments') {
      setActiveTab('assignments');
    }
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-4 md:px-6 h-16 border-b border-slate-200/40 dark:border-zinc-800/40 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-md">
      
      {/* Left: Collapsible trigger and Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="flex md:hidden items-center justify-center p-2 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors"
          style={{ minWidth: '44px', minHeight: '44px' }}
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-2 text-xs md:text-sm font-semibold">
          <span className="text-slate-400 dark:text-zinc-500">Workspace</span>
          <span className="text-slate-350 dark:text-zinc-700 font-light">/</span>
          <span className="text-slate-800 dark:text-zinc-100 uppercase tracking-wider">
            {activeTab === 'assignments' ? 'Assignments' : activeTab}
          </span>
        </div>
      </div>

      {/* Middle: Sticky search input bar */}
      <div className="hidden sm:flex items-center relative w-64 md:w-80">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 dark:text-zinc-500">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Global search assignments..."
          className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/40 focus:border-blue-500 outline-none text-xs text-slate-800 dark:text-zinc-150 transition-all placeholder:text-slate-450"
        />
      </div>

      {/* Right: Quick shortcuts and Profile panel */}
      <div className="flex items-center gap-4">
        
        {/* Date Stamp Widget */}
        <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-550 dark:text-zinc-400 px-3 py-1.5 rounded-lg bg-slate-100/50 dark:bg-zinc-900/50">
          <Calendar className="w-3.5 h-3.5 text-blue-500" />
          <span>{formatDate()}</span>
        </div>

        {/* Theme Switcher Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 transition-colors flex items-center justify-center w-11 h-11"
          style={{ minWidth: '44px', minHeight: '44px' }}
          title="Toggle display theme"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun className="w-4.5 h-4.5 text-amber-500" /> : <Moon className="w-4.5 h-4.5 text-indigo-500" />}
        </button>

        {/* Notifications Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 transition-colors relative flex items-center justify-center w-11 h-11"
            style={{ minWidth: '44px', minHeight: '44px' }}
            title="Notifications"
            aria-label="Open notifications"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl py-3 z-50 text-left animate-scale-in">
              <div className="flex justify-between items-center px-4 pb-2 border-b border-slate-100 dark:border-zinc-800/60 mb-2">
                <span className="text-xs font-bold text-slate-800 dark:text-white">Recent Warnings</span>
                <button 
                  onClick={() => { setActiveTab('notifications'); setIsNotifOpen(false); }}
                  className="text-[10px] font-bold text-blue-500 hover:underline"
                >
                  View All
                </button>
              </div>
              <div className="space-y-2 px-3">
                <div className="p-2 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100/50 dark:border-amber-900/20 text-[11px] leading-relaxed">
                  <strong>CS 102 Assignment Due</strong>
                  <p className="text-slate-500 dark:text-zinc-400 mt-0.5">Binary Trees Homework due tomorrow morning.</p>
                </div>
                <div className="p-2 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/50 dark:border-blue-900/20 text-[11px] leading-relaxed">
                  <strong>Stats Dashboard Connected</strong>
                  <p className="text-slate-500 dark:text-zinc-400 mt-0.5">All local milestones synchronized with MongoDB.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown trigger */}
        <div className="relative">
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center justify-center p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors w-11 h-11"
            style={{ minWidth: '44px', minHeight: '44px' }}
            aria-label="User profile menu"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-zinc-800 text-blue-700 dark:text-zinc-300 font-bold text-xs flex items-center justify-center">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl py-2 z-50 text-left animate-scale-in">
              <div className="px-4 py-2 border-b border-slate-100 dark:border-zinc-800/60 mb-2">
                <p className="text-xs font-bold text-slate-800 dark:text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-slate-400 dark:text-zinc-500 truncate mt-0.5">{user?.email}</p>
              </div>

              <button
                onClick={() => { setActiveTab('profile'); setIsProfileOpen(false); }}
                className="w-full px-4 py-2 text-xs text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/50 flex items-center gap-2 font-medium"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => { setActiveTab('settings'); setIsProfileOpen(false); }}
                className="w-full px-4 py-2 text-xs text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/50 flex items-center gap-2 font-medium"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Settings</span>
              </button>

              <hr className="border-slate-100 dark:border-zinc-800/60 my-1" />

              <button
                onClick={() => { logout(); setIsProfileOpen(false); }}
                className="w-full px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-2 font-semibold"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};

export default Navbar;
