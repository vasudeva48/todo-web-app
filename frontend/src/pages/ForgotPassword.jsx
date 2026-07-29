import React, { useState } from 'react';
import { Mail, KeyRound, Eye, EyeOff, Sparkles, Loader, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const ForgotPassword = ({ onNavigate }) => {
  const { showToast } = useToast();
  
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // 1: enter email, 2: enter code & new password
  
  // Reset form states
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulate sending recovery code (2 seconds delay)
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      showToast('Recovery verification code sent to email!', 'success');
    }, 1500);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!code || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setIsLoading(true);

    // Simulate database saving
    setTimeout(() => {
      setIsLoading(false);
      showToast('Password updated successfully! You can login now.', 'success');
      onNavigate('login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] flex flex-col items-center justify-center py-16 px-4 bg-mesh transition-colors duration-300 overflow-y-auto">
      <div className="w-full max-w-md my-auto">
        
        {/* Top Header Logo */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white shadow-lg shadow-blue-500/25 mb-4">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
            {step === 1 ? 'Reset Password' : 'Choose New Password'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2">
            {step === 1 
              ? "We'll send you an verification recovery code" 
              : "Enter verification code and configure new password"
            }
          </p>
        </div>

        {/* Auth Glass Card */}
        <div className="glass-panel rounded-3xl p-8 shadow-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border border-slate-200/50 dark:border-zinc-800/50">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-800/30 text-rose-800 dark:text-rose-200 text-sm font-medium">
              {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendCode} className="space-y-5">
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

              {/* Submit Email Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-medium bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 active:scale-98 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <span>Send Verification Code</span>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-5">
              {/* Code Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  required
                  maxLength={6}
                  className="w-full px-4 py-3 text-center tracking-widest rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-800 dark:text-zinc-100 font-bold text-lg transition-all placeholder:text-slate-400"
                />
              </div>

              {/* New Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                  New Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 dark:text-zinc-500">
                    <KeyRound className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-800 dark:text-zinc-100 text-sm transition-all placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 dark:text-zinc-500 hover:text-slate-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 dark:text-zinc-500">
                    <KeyRound className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-800 dark:text-zinc-100 text-sm transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Reset Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-medium bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 active:scale-98 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <span>Reset Password</span>
                )}
              </button>
            </form>
          )}

          {/* Navigate Back to Login */}
          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('login')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
