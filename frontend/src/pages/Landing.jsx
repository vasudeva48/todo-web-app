import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Users, 
  BookOpen, 
  Calendar, 
  BarChart3, 
  Bell, 
  ShieldCheck, 
  ChevronDown, 
  Mail, 
  MapPin, 
  Phone,
  MessageSquare,
  Play,
  Menu,
  X
} from 'lucide-react';

const Landing = ({ onNavigate }) => {
  const [faqOpen, setFaqOpen] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleFaq = (index) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Assignment Tracking',
      description: 'Easily track all your courses, assignments, and due dates in a unified premium table or list interface.'
    },
    {
      icon: Sparkles,
      title: 'Smart Dashboard',
      description: 'Get an instant high-level overview of total tasks, pending list, and upcoming deadline counts at a glance.'
    },
    {
      icon: Calendar,
      title: 'Interactive Calendar',
      description: 'Visualize your assignment timeline month-by-month. Spot high-pressure weeks and plan ahead.'
    },
    {
      icon: BarChart3,
      title: 'Deep Analytics',
      description: 'Track your completion metrics over time. Analyze subjects and priorities with beautiful SVG-based charts.'
    },
    {
      icon: Bell,
      title: 'Intelligent Notifications',
      description: 'Get simulated warnings for assignments due soon. Never suffer from late submission penalties again.'
    },
    {
      icon: ShieldCheck,
      title: 'Secure Authentication',
      description: 'Your information is safely shielded with JSON Web Token (JWT) credentials and secure database isolation.'
    }
  ];

  const stats = [
    { value: '120k+', label: 'Active Students' },
    { value: '2.5M+', label: 'Assignments Tracked' },
    { value: '98%', label: 'On-time Submissions' },
    { value: '450+', label: 'Universities' }
  ];

  const testimonials = [
    {
      name: 'Sarah Jenkins',
      role: 'Computer Science Major, Stanford',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
      text: 'AssignTrack completely reformed my semester workflow. I used to manage work with messy notes, but now everything is organized by course and priority.'
    },
    {
      name: 'Michael Chen',
      role: 'Pre-Med Student, Harvard',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
      text: 'The visual calendar and analytics pages show me exactly where my hours go. I have increased my study efficiency by nearly forty percent!'
    },
    {
      name: 'Elena Rodriguez',
      role: 'Engineering Undergrad, MIT',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120',
      text: 'I love the Apple-inspired layout and dark mode feature. It feels extremely premium, fluid, and simple to navigate late at night.'
    }
  ];

  const faqs = [
    {
      q: 'How does AssignTrack organize my assignments?',
      a: 'AssignTrack lets you create assignments with metadata like Course/Subject, Priority Level (Low, Medium, High), and Due Date. You can sort, filter, and view them on a grid, a database list, or a fully interactive monthly calendar.'
    },
    {
      q: 'Is my data secure?',
      a: 'Absolutely. We store passwords using cryptographically secure hashing (bcryptjs) and isolate your private dashboard using JSON Web Tokens (JWT). Your data is fully isolated from other workspace members.'
    },
    {
      q: 'Can I track metrics like average completion rates?',
      a: 'Yes! The Analytics tab provides real-time statistics of completed vs pending workloads, including custom SVG-based visual distributions grouped by course subject and priority levels.'
    },
    {
      q: 'Does it work on mobile devices?',
      a: 'Yes, AssignTrack features a fully responsive, collapsible sidebar layout optimized for desktop, tablet, and mobile browsers.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-[#09090b] dark:text-zinc-50 font-sans transition-colors duration-300">
      
      {/* 1. Header Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-[#09090b]/70 backdrop-blur-md border-b border-slate-200/40 dark:border-zinc-800/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-600 to-blue-500 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg text-slate-800 dark:text-white tracking-tight">AssignTrack</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-zinc-300">
            <a href="#home" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</a>
            <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</a>
            <a href="#faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
          </div>

          {/* Desktop CTA Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={() => onNavigate('login')}
              className="px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              style={{ minHeight: '44px' }}
            >
              Log In
            </button>
            <button 
              onClick={() => onNavigate('signup')}
              className="px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-98 flex items-center justify-center"
              style={{ minHeight: '44px' }}
            >
              Sign Up
            </button>
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors"
              style={{ minWidth: '44px', minHeight: '44px' }}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200/50 dark:border-zinc-800/50 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-lg animate-fade-in">
            <div className="flex flex-col px-6 py-4 space-y-4 text-left font-medium text-sm text-slate-600 dark:text-zinc-300">
              <a 
                href="#home" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-slate-100 dark:border-zinc-800/40 hover:text-blue-600 transition-colors"
              >
                Home
              </a>
              <a 
                href="#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-slate-100 dark:border-zinc-800/40 hover:text-blue-600 transition-colors"
              >
                Features
              </a>
              <a 
                href="#testimonials" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-slate-100 dark:border-zinc-800/40 hover:text-blue-600 transition-colors"
              >
                About
              </a>
              <a 
                href="#faq" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-slate-100 dark:border-zinc-800/40 hover:text-blue-600 transition-colors"
              >
                FAQ
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-slate-100 dark:border-zinc-800/40 hover:text-blue-600 transition-colors"
              >
                Contact
              </a>
              
              <div className="flex flex-col gap-2.5 pt-2">
                <button 
                  onClick={() => { setMobileMenuOpen(false); onNavigate('login'); }}
                  className="w-full py-3 text-center text-sm font-semibold rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-200 bg-white/40 dark:bg-zinc-900/40 hover:bg-slate-50 dark:hover:bg-zinc-800"
                  style={{ minHeight: '44px' }}
                >
                  Log In
                </button>
                <button 
                  onClick={() => { setMobileMenuOpen(false); onNavigate('signup'); }}
                  className="w-full py-3 text-center text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md"
                  style={{ minHeight: '44px' }}
                >
                  Sign Up Free
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* 2. Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6 relative overflow-hidden bg-mesh">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next Generation Student Organizer</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
              Manage Assignments Smarter, <br />
              <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                Never Miss a Deadline.
              </span>
            </h1>
            <p className="text-base text-slate-500 dark:text-zinc-400 leading-relaxed max-w-xl">
              AssignTrack provides university students with a sleek, unified glassmorphic workspace to register assignments, view schedules dynamically, monitor stats, and streamline coursework timelines.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => onNavigate('signup')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 active:scale-98 transition-all"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a 
                href="#preview"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 shadow-sm transition-all"
              >
                <Play className="w-4 h-4 fill-current text-slate-500" />
                <span>Watch Preview</span>
              </a>
            </div>
          </div>

          {/* Large Interactive Preview Image */}
          <div className="lg:col-span-6 relative">
            <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/5 blur-3xl rounded-full"></div>
            <div className="relative border border-slate-200/60 dark:border-zinc-850 bg-white/70 dark:bg-zinc-900/60 p-4 rounded-2xl shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/40 dark:border-zinc-800/40 mb-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase">Dashboard Preview</div>
              </div>
              {/* Dummy SaaS Dashboard Illustration */}
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-blue-50/50 dark:bg-zinc-950/40 border border-blue-100/40 dark:border-zinc-800/40 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Pending</span>
                    <div className="text-xl font-extrabold text-slate-800 dark:text-white mt-1">4</div>
                  </div>
                  <div className="p-3 bg-emerald-50/50 dark:bg-zinc-950/40 border border-emerald-100/40 dark:border-zinc-800/40 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Done</span>
                    <div className="text-xl font-extrabold text-slate-800 dark:text-white mt-1">12</div>
                  </div>
                  <div className="p-3 bg-indigo-50/50 dark:bg-zinc-950/40 border border-indigo-100/40 dark:border-zinc-800/40 rounded-xl">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Completion</span>
                    <div className="text-xl font-extrabold text-slate-800 dark:text-white mt-1">75%</div>
                  </div>
                </div>
                <div className="p-4 bg-slate-50/50 dark:bg-zinc-950/40 border border-slate-100 dark:border-zinc-800/50 rounded-xl space-y-2">
                  <div className="h-2.5 w-1/3 bg-slate-200 dark:bg-zinc-800 rounded"></div>
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between items-center bg-white dark:bg-zinc-900 p-2 border border-slate-100 dark:border-zinc-800 rounded-lg text-xs">
                      <span className="font-semibold">CS 102 - Data Structures HW</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 font-bold">High</span>
                    </div>
                    <div className="flex justify-between items-center bg-white dark:bg-zinc-900 p-2 border border-slate-100 dark:border-zinc-800 rounded-lg text-xs opacity-75">
                      <span className="font-semibold">PHYS 201 - Lab Report 3</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 font-bold">Medium</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Statistics Banner */}
      <section className="py-12 border-y border-slate-200/50 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-950/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl md:text-4xl font-extrabold text-blue-600 dark:text-blue-400">{s.value}</div>
                <div className="text-xs font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Features Section */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Core Functionality</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Designed to Optimize Academic Workflows
          </h3>
          <p className="text-sm text-slate-500 dark:text-zinc-400">
            A standard checklist doesn't cut it for complex course requirements. AssignTrack provides tools built specifically for students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl border border-slate-200/60 dark:border-zinc-850 bg-white dark:bg-zinc-900/40 hover:border-blue-500/30 dark:hover:border-blue-400/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-slate-800 dark:text-zinc-100 mb-2">{f.title}</h4>
                <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">{f.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Dashboard Preview Mockup Section */}
      <section id="preview" className="py-20 bg-slate-100/50 dark:bg-zinc-950/30 border-y border-slate-200/50 dark:border-zinc-850 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">Experience High Fidelity Layouts</h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400 max-w-xl mx-auto">
              Refined dashboards inspired by Linear and Apple design systems. Take control of your daily assignments with absolute precision.
            </p>
          </div>
          <div className="relative border border-slate-250/50 dark:border-zinc-800/80 rounded-2xl overflow-hidden shadow-2xl bg-white dark:bg-zinc-950 max-w-5xl mx-auto">
            <img 
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80" 
              alt="AssignTrack SaaS Dashboard Mockup" 
              className="w-full opacity-90 dark:opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent flex items-end justify-center p-8">
              <button 
                onClick={() => onNavigate('signup')}
                className="px-6 py-3 bg-white text-slate-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-103"
              >
                Start Using Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section id="testimonials" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Testimonials</h2>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Trusted by Top Students</h3>
          <p className="text-sm text-slate-500 dark:text-zinc-400">
            Hear from undergraduate students who redesigned their schedule and grade performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl border border-slate-200/50 dark:border-zinc-850 bg-white/60 dark:bg-zinc-900/30 backdrop-blur-sm flex flex-col justify-between"
            >
              <p className="text-xs text-slate-600 dark:text-zinc-300 italic leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3.5">
                <img 
                  src={t.image} 
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500/20"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-white">{t.name}</h4>
                  <p className="text-[10px] text-slate-400 dark:text-zinc-550 font-semibold">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section id="faq" className="py-20 bg-slate-100/50 dark:bg-zinc-950/20 border-t border-slate-200/50 dark:border-zinc-800/50 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400">Everything you need to know about the platform.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpen[idx];
              return (
                <div 
                  key={idx}
                  className="border border-slate-200/60 dark:border-zinc-850 rounded-xl bg-white dark:bg-zinc-900/20 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-slate-800 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 border-t border-slate-100 dark:border-zinc-800/40 text-xs text-slate-550 dark:text-zinc-400 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. Contact Section */}
      <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6 text-left">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Get in touch with us</h3>
            <p className="text-sm text-slate-500 dark:text-zinc-400">
              Have questions about university pilot accounts, student group plans, or support? Send us a message and we'll reach out within a few hours.
            </p>
            <div className="space-y-3.5 pt-4">
              <div className="flex items-center gap-3.5 text-xs text-slate-600 dark:text-zinc-300">
                <Mail className="w-5 h-5 text-blue-500" />
                <span>support@assigntrack.edu</span>
              </div>
              <div className="flex items-center gap-3.5 text-xs text-slate-600 dark:text-zinc-300">
                <Phone className="w-5 h-5 text-blue-500" />
                <span>+1 (800) 555-WORK</span>
              </div>
              <div className="flex items-center gap-3.5 text-xs text-slate-600 dark:text-zinc-300">
                <MapPin className="w-5 h-5 text-blue-500" />
                <span>San Francisco, California</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white dark:bg-zinc-900/30 border border-slate-200/60 dark:border-zinc-850 p-8 rounded-2xl shadow-sm">
            <form onSubmit={(e) => { e.preventDefault(); alert('Message simulation sent! Thank you.'); }} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase">First Name</label>
                  <input type="text" required placeholder="John" className="w-full px-4 py-3 md:py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-transparent text-xs outline-none focus:border-blue-500" style={{ minHeight: '44px' }} />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase">Email</label>
                  <input type="email" required placeholder="john@example.com" className="w-full px-4 py-3 md:py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-transparent text-xs outline-none focus:border-blue-500" style={{ minHeight: '44px' }} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase">Message</label>
                <textarea rows="4" required placeholder="Describe your question..." className="w-full px-4 py-3 md:py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-transparent text-xs outline-none focus:border-blue-500 resize-none" style={{ minHeight: '100px' }}></textarea>
              </div>
              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-semibold bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
                style={{ minHeight: '44px' }}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 9. Professional Footer */}
      <footer className="py-12 border-t border-slate-200/50 dark:border-zinc-800/50 bg-slate-100/30 dark:bg-zinc-950/40 text-xs">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-sky-600 to-blue-500 text-white flex items-center justify-center font-bold">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold tracking-tight text-slate-700 dark:text-white">AssignTrack</span>
          </div>

          <div className="flex gap-8 text-slate-400 dark:text-zinc-500">
            <span className="hover:text-blue-500 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-blue-500 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-blue-500 transition-colors cursor-pointer">Security FAQ</span>
          </div>

          <div className="text-slate-400 dark:text-zinc-500">
            &copy; {new Date().getFullYear()} AssignTrack. All rights reserved. Capstone Project.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Landing;
