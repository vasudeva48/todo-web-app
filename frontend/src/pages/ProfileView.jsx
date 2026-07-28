import React, { useState } from 'react';
import GlassCard from '../components/GlassCard';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { 
  User, 
  Mail, 
  GraduationCap, 
  Award, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Save 
} from 'lucide-react';

const ProfileView = ({ tasks }) => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Local state for profile details
  const [major, setMajor] = useState(localStorage.getItem('student_major') || 'Computer Science');
  const [university, setUniversity] = useState(localStorage.getItem('student_uni') || 'California State University');
  const [year, setYear] = useState(localStorage.getItem('student_year') || 'Junior Year (Year 3)');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('student_major', major);
    localStorage.setItem('student_uni', university);
    localStorage.setItem('student_year', year);
    showToast('Academic profile updated successfully', 'success');
  };

  // Estimate a grade standing / standing title based on completed assignments
  const getAcademicStanding = () => {
    if (completionRate >= 90) return { rank: 'Summa Cum Laude', gpa: '3.95 - 4.00' };
    if (completionRate >= 80) return { rank: 'Dean\'s List Scholar', gpa: '3.70 - 3.90' };
    if (completionRate >= 60) return { rank: 'Honor Roll Student', gpa: '3.20 - 3.65' };
    return { rank: 'Active Student Workspace', gpa: '2.80 - 3.15' };
  };

  const standing = getAcademicStanding();

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <GlassCard className="p-6" hover={false}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-500 flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-50">Student Profile</h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Manage your academic standings and view personal productivity accomplishments
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Main Grid: Info Cards and Edit Info Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Card: Standings & Badges */}
        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="p-6 text-center flex flex-col items-center justify-center" hover={false}>
            {/* Avatar Circle */}
            <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-zinc-800 text-blue-600 dark:text-zinc-200 font-bold text-3xl flex items-center justify-center border-4 border-white dark:border-zinc-950 shadow-md">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            
            <h3 className="text-base font-bold text-slate-800 dark:text-zinc-50 mt-4">
              {user?.name || 'Workspace User'}
            </h3>
            <p className="text-xs text-slate-400 dark:text-zinc-500 mt-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              <span>{user?.email || 'student@university.edu'}</span>
            </p>

            <div className="w-full border-t border-slate-100 dark:border-zinc-800/60 my-5 pt-4 space-y-4 text-left">
              <div>
                <span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest block mb-0.5">Academic standing</span>
                <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span>{standing.rank}</span>
                </span>
              </div>
              <div>
                <span className="text-[9px] font-bold uppercase text-slate-400 tracking-widest block mb-0.5">Estimated GPA range</span>
                <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">{standing.gpa}</span>
              </div>
            </div>
          </GlassCard>

          {/* Academic Stats summary widget */}
          <GlassCard className="p-5" hover={false}>
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-4 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-blue-500" />
              <span>KPI Performance</span>
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 bg-slate-50/50 dark:bg-zinc-950/20 border border-slate-100 dark:border-zinc-850 rounded-xl text-center">
                <span className="text-[9px] font-bold uppercase text-slate-450 tracking-wider">Completed</span>
                <div className="text-xl font-extrabold text-slate-800 dark:text-white mt-1">{completed}</div>
              </div>
              <div className="p-3.5 bg-slate-50/50 dark:bg-zinc-950/20 border border-slate-100 dark:border-zinc-850 rounded-xl text-center">
                <span className="text-[9px] font-bold uppercase text-slate-450 tracking-wider">Pending</span>
                <div className="text-xl font-extrabold text-slate-800 dark:text-white mt-1">{pending}</div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Card: Profile Configuration Form */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6" hover={false}>
            <h3 className="text-sm font-bold text-slate-800 dark:text-zinc-100 mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-500" />
              <span>Academic Workspace Details</span>
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-5 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
                    Course Major Study
                  </label>
                  <input
                    type="text"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    placeholder="e.g. Computer Science"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 text-xs text-slate-850 dark:text-zinc-100 focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
                    Current Year Level
                  </label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="e.g. Junior Year (Year 3)"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 text-xs text-slate-850 dark:text-zinc-100 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest">
                  University / Institution Name
                </label>
                <input
                  type="text"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder="e.g. California State University"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 text-xs text-slate-850 dark:text-zinc-100 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/60 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm active:scale-98 transition-all"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          </GlassCard>
        </div>

      </div>

    </div>
  );
};

export default ProfileView;
