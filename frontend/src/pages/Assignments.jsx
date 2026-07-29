import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import GlassCard from '../components/GlassCard';
import EmptyState from '../components/EmptyState';
import { 
  Check, 
  Trash2, 
  Edit2, 
  Search, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  SlidersHorizontal,
  Clock, 
  BookOpen, 
  Flag,
  FileText,
  Calendar,
  X,
  PlusCircle,
  Eye
} from 'lucide-react';

const Assignments = ({ 
  tasks, 
  isLoading, 
  onAddTask, 
  onCompleteTask, 
  onDeleteTask, 
  onUpdateTask,
  quickAddFocused = false,
  setQuickAddFocused
}) => {
  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Computer Science');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  // Editing Fields
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editSubject, setEditSubject] = useState('Computer Science');
  const [editPriority, setEditPriority] = useState('Medium');
  const [editDueDate, setEditDueDate] = useState('');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'pending' | 'completed'
  const [sortBy, setSortBy] = useState('dueDate'); // 'dueDate' | 'priority' | 'title' | 'createdDate'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // React to quick add focused trigger from Navbar
  useEffect(() => {
    if (quickAddFocused) {
      setIsAddOpen(true);
      if (setQuickAddFocused) setQuickAddFocused(false);
    }
  }, [quickAddFocused]);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await onAddTask({
      title: title.trim(),
      subject,
      priority,
      dueDate
    });

    // Reset Form
    setTitle('');
    setSubject('Computer Science');
    setPriority('Medium');
    setDueDate('');
    setIsAddOpen(false);
  };

  const handleEditClick = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
    setEditSubject(task.subject);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate || '');
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    const originalTask = tasks.find(t => t._id === editId);
    await onUpdateTask(editId, {
      title: editTitle.trim(),
      subject: editSubject,
      priority: editPriority,
      dueDate: editDueDate,
      createdDate: originalTask?.createdDate
    }, originalTask?.completed || false);

    setIsEditOpen(false);
    setEditId(null);
  };

  const handleComplete = async (task) => {
    // Confetti celebration
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#0284c7', '#38bdf8', '#10b981', '#60a5fa']
    });
    await onCompleteTask(task);
  };

  // Extract unique subjects for the filter dropdown
  const uniqueSubjects = ['all', ...new Set(tasks.map(t => t.subject || 'General'))];

  // Map priorities to ordering weights
  const priorityWeights = { high: 3, medium: 2, low: 1 };

  // Filter & Search Logic
  const processedTasks = tasks
    .filter(task => {
      // Search
      const matchesSearch = task.title?.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Status
      const matchesStatus = filterStatus === 'all' || 
        (filterStatus === 'completed' && task.completed) || 
        (filterStatus === 'pending' && !task.completed);
        
      // Subject
      const matchesSubject = filterSubject === 'all' || task.subject === filterSubject;

      // Priority
      const matchesPriority = filterPriority === 'all' || task.priority?.toLowerCase() === filterPriority;

      return matchesSearch && matchesStatus && matchesSubject && matchesPriority;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'title') {
        comparison = a.title.localeCompare(b.title);
      } else if (sortBy === 'priority') {
        const wa = priorityWeights[a.priority?.toLowerCase()] || 0;
        const wb = priorityWeights[b.priority?.toLowerCase()] || 0;
        comparison = wb - wa; // High to Low
      } else if (sortBy === 'createdDate') {
        comparison = new Date(a.createdDate) - new Date(b.createdDate);
      } else { // default: dueDate
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        comparison = new Date(a.dueDate) - new Date(b.dueDate);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Pagination Logic
  const totalItems = processedTasks.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedTasks = processedTasks.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const getPriorityBadge = (p) => {
    switch (p?.toLowerCase()) {
      case 'high': return 'bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-450 border border-rose-200/30';
      case 'medium': return 'bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-450 border border-amber-200/30';
      case 'low': return 'bg-blue-50 text-blue-700 dark:bg-blue-950/20 dark:text-blue-450 border border-blue-200/30';
      default: return 'bg-slate-50 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header & Actions utility */}
      <GlassCard className="p-6" hover={false}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-500 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-zinc-50">Assignments Hub</h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Configure your coursework details, set priorities, and complete items
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5 px-4.5 py-3 md:py-2.5 text-xs font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-750 shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-98 transition-all"
            style={{ minHeight: '44px' }}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Assignment</span>
          </button>
        </div>
      </GlassCard>

      {/* 2. Advanced Search & Filtering Bar */}
      <GlassCard className="p-4 flex flex-col gap-4" hover={false}>
        
        {/* Row 1: Search & Sort */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search box */}
          <div className="relative md:col-span-6">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 dark:text-zinc-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              placeholder="Search assignments by title..."
              className="w-full pl-10 pr-4 py-3 md:py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 text-xs text-slate-850 dark:text-zinc-100 focus:border-blue-500 outline-none"
              style={{ minHeight: '44px' }}
            />
          </div>

          {/* Sort By Select */}
          <div className="relative md:col-span-3 flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-3 md:py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 text-xs text-slate-850 dark:text-zinc-100 focus:border-blue-500 outline-none"
              style={{ minHeight: '44px' }}
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="title">Sort by Title</option>
              <option value="createdDate">Sort by Created Date</option>
            </select>
          </div>

          {/* Sort Order Toggle */}
          <div className="relative md:col-span-3">
            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="w-full px-3 py-3 md:py-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors text-slate-700 dark:text-zinc-350"
              style={{ minHeight: '44px' }}
            >
              Order: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            </button>
          </div>
        </div>

        {/* Row 2: Dropdown Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Status Filter */}
          <div className="flex flex-col gap-1 items-start">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-3 md:py-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 text-xs focus:border-blue-550 outline-none"
              style={{ minHeight: '44px' }}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Course Subject Filter */}
          <div className="flex flex-col gap-1 items-start">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">Course Subject</label>
            <select
              value={filterSubject}
              onChange={(e) => { setFilterSubject(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-3 md:py-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 text-xs focus:border-blue-550 outline-none"
              style={{ minHeight: '44px' }}
            >
              <option value="all">All Subjects</option>
              {uniqueSubjects.filter(s => s !== 'all').map((sub, idx) => (
                <option key={idx} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div className="flex flex-col gap-1 items-start">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">Priority</label>
            <select
              value={filterPriority}
              onChange={(e) => { setFilterPriority(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-3 md:py-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 text-xs focus:border-blue-550 outline-none"
              style={{ minHeight: '44px' }}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

      </GlassCard>

      {/* 3. Main Assignment Grid/Table */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-8 h-8 rounded-full border-4 border-blue-500/20 border-t-blue-600 animate-spin" />
          </div>
        ) : paginatedTasks.length === 0 ? (
          <EmptyState
            title="No assignments found"
            description="Try adjusting your filters, search terms, or add a new assignment above."
            onActionClick={totalItems > 0 ? () => {
              setSearchQuery('');
              setFilterPriority('all');
              setFilterSubject('all');
              setFilterStatus('all');
            } : undefined}
            actionLabel="Reset filters"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {paginatedTasks.map((task) => (
              <GlassCard 
                key={task._id} 
                className={`p-5 flex flex-col justify-between text-left relative transition-all ${
                  task.completed ? 'opacity-70' : ''
                }`}
                hover={true}
              >
                <div className="space-y-3.5">
                  {/* Category Subject and Priority Capsule Row */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {task.subject}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getPriorityBadge(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className={`text-sm font-bold leading-snug break-words ${task.completed ? 'line-through text-slate-400 dark:text-zinc-550' : 'text-slate-800 dark:text-zinc-100'}`}>
                    {task.title}
                  </h4>

                  {/* Metadata Row: Due Date and Status */}
                  <div className="flex items-center justify-between pt-1 text-xs text-slate-500 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{task.dueDate || 'No deadline'}</span>
                    </div>
                    <span className={`text-[10px] font-bold ${task.completed ? 'text-emerald-550' : 'text-amber-550'}`}>
                      {task.completed ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-slate-100 dark:border-zinc-800/60 gap-2">
                  <button
                    onClick={() => !task.completed && handleComplete(task)}
                    disabled={task.completed}
                    className={`flex items-center justify-center rounded-xl border transition-all w-11 h-11 ${
                      task.completed
                        ? 'bg-emerald-500 border-emerald-500 text-white cursor-default'
                        : 'border-slate-200 hover:border-blue-500 dark:border-zinc-800 text-slate-400 hover:text-blue-500 bg-white/40 dark:bg-zinc-900/40'
                    }`}
                    style={{ minWidth: '44px', minHeight: '44px' }}
                    title={task.completed ? 'Completed' : 'Mark completed'}
                    aria-label="Mark completed"
                  >
                    <Check className="w-5 h-5 stroke-[2.5px]" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => { setSelectedTask(task); setIsDetailOpen(true); }}
                      className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-250 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 transition-colors"
                      style={{ minWidth: '44px', minHeight: '44px' }}
                      title="View Details"
                      aria-label="View Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>

                    {!task.completed && (
                      <button
                        onClick={() => handleEditClick(task)}
                        className="w-11 h-11 flex items-center justify-center rounded-xl border border-slate-250 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 dark:text-zinc-400 transition-colors"
                        style={{ minWidth: '44px', minHeight: '44px' }}
                        title="Edit"
                        aria-label="Edit Assignment"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => onDeleteTask(task._id)}
                      className="w-11 h-11 flex items-center justify-center rounded-xl border border-transparent hover:border-rose-100 dark:hover:border-rose-950/20 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 transition-colors"
                      style={{ minWidth: '44px', minHeight: '44px' }}
                      title="Delete"
                      aria-label="Delete Assignment"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* 4. Pagination Panel */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between py-2">
          <span className="text-xs text-slate-450 dark:text-zinc-500 font-medium">
            Showing page {currentPage} of {totalPages} ({totalItems} items)
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-slate-250 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4 text-slate-650" />
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-slate-250 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4 text-slate-650" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          MODALS & FORM DIALOGS OVERLAYS
         ======================================================== */}

      {/* Modal 1: Create Assignment Form */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl relative animate-scale-in text-left">
            <button 
              onClick={() => setIsAddOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:text-zinc-500 dark:hover:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-slate-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-blue-500" />
              <span>Create New Assignment</span>
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest pl-1">Assignment Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Lab Report 3, midterm prep..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-205 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 text-xs text-slate-850 dark:text-zinc-100 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest pl-1">Course Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-205 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 text-xs focus:border-blue-500 outline-none"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="History">History</option>
                    <option value="Literature">Literature</option>
                    <option value="General">General/Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest pl-1">Priority Level</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-205 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 text-xs focus:border-blue-500 outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest pl-1">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-205 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 text-xs text-slate-850 dark:text-zinc-100 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/60 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-755 transition-colors shadow-sm"
                >
                  Save assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Edit Assignment Form */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl relative animate-scale-in text-left">
            <button 
              onClick={() => setIsEditOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-650 dark:text-zinc-500 dark:hover:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-slate-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
              <Edit2 className="w-5 h-5 text-blue-500" />
              <span>Modify Assignment details</span>
            </h3>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest pl-1">Assignment Title</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-205 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 text-xs text-slate-850 dark:text-zinc-100 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest pl-1">Course Subject</label>
                  <select
                    value={editSubject}
                    onChange={(e) => setEditSubject(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-205 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 text-xs focus:border-blue-500 outline-none"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="History">History</option>
                    <option value="Literature">Literature</option>
                    <option value="General">General/Other</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest pl-1">Priority Level</label>
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-205 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 text-xs focus:border-blue-500 outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest pl-1">Due Date</label>
                <input
                  type="date"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-205 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/40 text-xs text-slate-850 dark:text-zinc-100 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-zinc-800/60 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-755 transition-colors shadow-sm"
                >
                  Save modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: View Assignment Details */}
      {isDetailOpen && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl relative animate-scale-in text-left">
            <button 
              onClick={() => { setSelectedTask(null); setIsDetailOpen(false); }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-450 hover:text-slate-650 dark:text-zinc-500 dark:hover:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-slate-900 dark:text-zinc-50 mb-4">
              Assignment Details
            </h3>

            <div className="space-y-4">
              <div>
                <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider block mb-1">Title</span>
                <p className="text-sm font-semibold text-slate-800 dark:text-zinc-200">
                  {selectedTask.title}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider block mb-1">Subject</span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-zinc-350">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedTask.subject}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider block mb-1">Priority</span>
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${getPriorityBadge(selectedTask.priority)}`}>
                    <Flag className="w-3 h-3 fill-current" />
                    <span>{selectedTask.priority}</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider block mb-1">Due Date</span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-zinc-350">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedTask.dueDate || 'No Deadline'}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider block mb-1">Status</span>
                  <div className="flex items-center gap-1.5 text-xs">
                    {selectedTask.completed ? (
                      <>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400">Completed</span>
                      </>
                    ) : (
                      <>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400">Pending</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800/60 flex justify-end">
              <button 
                onClick={() => { setSelectedTask(null); setIsDetailOpen(false); }}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Assignments;
