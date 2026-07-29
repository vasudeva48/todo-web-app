import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { User, Mail, Lock, Eye, EyeOff, Sparkles, Loader, ArrowLeft } from 'lucide-react';

const Signup = ({ onNavigate }) => {
  const { signup } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    setIsLoading(true);

    const result = await signup(name, email, password);
    setIsLoading(false);

    if (result.success) {
      showToast('Account created successfully! Please log in.', 'success');
      onNavigate('login');
    } else {
      setError(result.message);
      showToast(result.message, 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] flex flex-col items-center justify-center py-16 px-4 bg-mesh transition-colors duration-300 relative overflow-y-auto">
      
      {/* Floating Home Back Button */}
      <button 
        onClick={() => onNavigate('landing')}
        className="fixed top-6 left-6 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm hover:bg-white dark:hover:bg-zinc-900 text-xs font-semibold text-slate-500 dark:text-zinc-400 shadow-sm transition-all"
        style={{ minHeight: '44px' }}
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Home</span>
      </button>

      <div className="w-full max-w-md my-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/25 mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
            Create an account
          </h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2">
            Get started with your premium assignment-tracking workspace today
          </p>
        </div>

        {/* Signup Form Card */}
        <div className="glass-panel rounded-3xl p-8 shadow-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border border-slate-200/50 dark:border-zinc-800/50">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-800/30 text-rose-800 dark:text-rose-200 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 text-left">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 dark:text-zinc-500">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-800 dark:text-zinc-100 text-sm transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                Email address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 dark:text-zinc-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-800 dark:text-zinc-100 text-sm transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 dark:text-zinc-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••• (6+ characters)"
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-800 dark:text-zinc-100 text-sm transition-all placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 dark:text-zinc-500 hover:text-slate-655 dark:hover:text-zinc-350 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-blue-450 shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 active:scale-98 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <span>Create Account</span>
              )}
            </button>
          </form>

          {/* Login Redirection link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500 dark:text-zinc-400">
              Already have an account?{' '}
              <button
                onClick={() => onNavigate('login')}
                className="font-semibold text-blue-600 hover:text-blue-700 dark:hover:text-blue-400 underline transition-colors"
              >
                Sign in instead
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
