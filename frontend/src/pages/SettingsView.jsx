import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { 
  Settings, 
  Sun, 
  Moon, 
  Bell, 
  Sliders, 
  Save, 
  Sparkles, 
  RefreshCcw 
} from 'lucide-react';

const SettingsView = () => {
  const { isDark, toggleTheme } = useTheme();
  const { showToast } = useToast();

  // Settings states loaded from localStorage
  const [defaultPriority, setDefaultPriority] = useState(localStorage.getItem('setting_default_priority') || 'Medium');
  const [notificationSound, setNotificationSound] = useState(localStorage.getItem('setting_notif_sound') === 'true');
  const [alertThreshold, setAlertThreshold] = useState(parseInt(localStorage.getItem('setting_alert_threshold') || '24'));

  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('setting_default_priority', defaultPriority);
    localStorage.setItem('setting_notif_sound', notificationSound);
    localStorage.setItem('setting_alert_threshold', alertThreshold);
    showToast('Workspace settings saved successfully', 'success');
  };

  const handleResetDefaults = () => {
    setDefaultPriority('Medium');
    setNotificationSound(false);
    setAlertThreshold(24);
    localStorage.removeItem('setting_default_priority');
    localStorage.removeItem('setting_notif_sound');
    localStorage.removeItem('setting_alert_threshold');
    showToast('Restored default workspace settings', 'info');
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <GlassCard className="p-6" hover={false}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-500 flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-50">Workspace Settings</h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Customize default priority settings and dashboard alert notifications
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Main Configurations Box */}
      <GlassCard className="p-6" hover={false}>
        <form onSubmit={handleSaveSettings} className="space-y-6 text-left">
          
          {/* Theme Setup */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Appearance Mode</h3>
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-zinc-800/40 bg-slate-50/50 dark:bg-zinc-950/20">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-zinc-100">Toggle Dark Theme</h4>
                <p className="text-[10px] text-slate-450 dark:text-zinc-450 mt-0.5">Switch workspace display setting</p>
              </div>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-zinc-800 hover:bg-slate-150 dark:hover:bg-zinc-900 text-slate-700 dark:text-zinc-300 transition-colors"
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-indigo-500" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-zinc-800/50" />

          {/* Defaults Configuration */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Defaults Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Default Priority Select */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-650 dark:text-zinc-400">Default Priority Level</label>
                <p className="text-[10px] text-slate-400 dark:text-zinc-500 mb-1">Set the initial priority value for newly added assignments</p>
                <select
                  value={defaultPriority}
                  onChange={(e) => setDefaultPriority(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 text-xs text-slate-800 dark:text-zinc-100 focus:border-blue-500 outline-none"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>
              </div>

              {/* Slider for alert threshold */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-650 dark:text-zinc-400">Deadline Warning threshold</label>
                <p className="text-[10px] text-slate-400 dark:text-zinc-500 mb-1">Alert threshold: <strong>{alertThreshold} hours</strong> before due date</p>
                <input
                  type="range"
                  min="6"
                  max="72"
                  step="6"
                  value={alertThreshold}
                  onChange={(e) => setAlertThreshold(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          </div>

          <hr className="border-slate-100 dark:border-zinc-800/50" />

          {/* Sound Alert parameters */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Sound Alerts</h3>
            <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-zinc-800/40 bg-slate-50/50 dark:bg-zinc-950/20">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-zinc-100 font-medium">Sound Effects</h4>
                <p className="text-[10px] text-slate-450 dark:text-zinc-500 mt-0.5">Play audio feedback on completing and deleting assignments</p>
              </div>
              <input
                type="checkbox"
                checked={notificationSound}
                onChange={(e) => setNotificationSound(e.target.checked)}
                className="w-4.5 h-4.5 accent-blue-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/60 flex items-center justify-between">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-zinc-450 dark:hover:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm active:scale-98 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Settings</span>
            </button>
          </div>

        </form>
      </GlassCard>

    </div>
  );
};

export default SettingsView;
