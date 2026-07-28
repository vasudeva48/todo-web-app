import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { useToast } from './context/ToastContext';
import api from './services/api';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Assignments from './pages/Assignments';
import CalendarView from './pages/CalendarView';
import AnalyticsView from './pages/AnalyticsView';
import NotificationsView from './pages/NotificationsView';
import ProfileView from './pages/ProfileView';
import SettingsView from './pages/SettingsView';

// Components
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

function App() {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  
  // Local Routing/Views
  const [activeTab, setActiveTab] = useState('dashboard');
  const [authPage, setAuthPage] = useState('landing'); // 'landing' | 'login' | 'signup' | 'forgot-password'

  // Sidebar Layout States
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [quickAddFocused, setQuickAddFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Core Data States
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Cleve Serialization Helper: parse task.text string to assignment object
  const parseAssignment = (task) => {
    let title = task.text;
    let subject = 'General';
    let priority = 'Medium';
    let dueDate = '';
    let createdDate = new Date().toISOString();

    try {
      const parsed = JSON.parse(task.text);
      if (parsed && typeof parsed === 'object') {
        title = parsed.title || task.text;
        subject = parsed.subject || 'General';
        priority = parsed.priority || 'Medium';
        dueDate = parsed.dueDate || '';
        createdDate = parsed.createdDate || new Date().toISOString();
      }
    } catch (e) {
      // Legacy normal task text
    }

    return {
      _id: task._id,
      completed: task.completed,
      title,
      subject,
      priority,
      dueDate,
      createdDate,
      userId: task.userId,
      rawText: task.text
    };
  };

  // Serialize assignment metadata back to task.text string
  const serializeAssignment = ({ title, subject, priority, dueDate, createdDate }) => {
    return JSON.stringify({
      title,
      subject,
      priority,
      dueDate,
      createdDate: createdDate || new Date().toISOString()
    });
  };

  // Synchronize Tasks from database
  const loadTasks = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    try {
      const res = await api.get('/tasks');
      const parsedAssignments = res.data.map(parseAssignment);
      setTasks(parsedAssignments);
    } catch (err) {
      console.error(err);
      showToast('Could not sync assignments with Atlas cloud server.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Run synchronization on auth status changes
  useEffect(() => {
    if (isAuthenticated) {
      loadTasks();
    } else {
      setTasks([]);
    }
  }, [isAuthenticated]);

  // Adjust sidebar default state on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Run initially
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // CRUD Operations
  const handleAddTask = async (assignmentData) => {
    try {
      const text = serializeAssignment({
        title: assignmentData.title,
        subject: assignmentData.subject || 'General',
        priority: assignmentData.priority || 'Medium',
        dueDate: assignmentData.dueDate || '',
        createdDate: new Date().toISOString()
      });
      const res = await api.post('/tasks', { text });
      setTasks((prev) => [parseAssignment(res.data), ...prev]);
      showToast('Assignment created successfully', 'success');
    } catch (err) {
      showToast('Failed to create assignment.', 'error');
    }
  };

  const handleCompleteTask = async (task) => {
    try {
      const text = task.rawText || serializeAssignment({
        title: task.title,
        subject: task.subject,
        priority: task.priority,
        dueDate: task.dueDate,
        createdDate: task.createdDate
      });
      const res = await api.put(`/tasks/${task._id}`, {
        text,
        completed: true
      });
      setTasks((prev) => prev.map((t) => (t._id === task._id ? parseAssignment(res.data) : t)));
      showToast('Assignment completed! Keep it up.', 'success');
    } catch (err) {
      showToast('Failed to complete assignment.', 'error');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      showToast('Assignment deleted successfully', 'success');
    } catch (err) {
      showToast('Failed to delete assignment.', 'error');
    }
  };

  const handleUpdateTask = async (id, updatedData, completed) => {
    try {
      const text = serializeAssignment({
        title: updatedData.title,
        subject: updatedData.subject,
        priority: updatedData.priority,
        dueDate: updatedData.dueDate,
        createdDate: updatedData.createdDate
      });
      const res = await api.put(`/tasks/${id}`, { text, completed });
      setTasks((prev) => prev.map((t) => (t._id === id ? parseAssignment(res.data) : t)));
      showToast('Assignment details updated', 'success');
    } catch (err) {
      showToast('Failed to update assignment.', 'error');
    }
  };

  const handleQuickAddClick = () => {
    setActiveTab('assignments');
    setQuickAddFocused(true);
  };

  // Auth routing view
  if (!isAuthenticated) {
    if (authPage === 'landing') {
      return <Landing onNavigate={setAuthPage} />;
    } else if (authPage === 'login') {
      return <Login onNavigate={setAuthPage} />;
    } else if (authPage === 'signup') {
      return <Signup onNavigate={setAuthPage} />;
    } else if (authPage === 'forgot-password') {
      return <ForgotPassword onNavigate={setAuthPage} />;
    }
  }

  // Logged-in full application layout
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] bg-mesh transition-colors duration-300">
      {/* Premium Collapsible Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main App Container */}
      <div 
        className={`transition-all duration-350 ${
          isSidebarOpen ? 'md:pl-64' : 'md:pl-20'
        }`}
      >
        {/* Sticky Header Bar */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onQuickAddClick={handleQuickAddClick}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Inner Page View */}
        <main className="max-w-5xl mx-auto px-6 py-8">
          {activeTab === 'dashboard' && (
            <Dashboard 
              tasks={tasks} 
              isLoading={isLoading} 
              setActiveTab={setActiveTab}
              onCompleteTask={handleCompleteTask}
              onAddTask={handleAddTask}
            />
          )}

          {activeTab === 'assignments' && (
            <Assignments 
              tasks={tasks}
              isLoading={isLoading}
              onAddTask={handleAddTask}
              onCompleteTask={handleCompleteTask}
              onDeleteTask={handleDeleteTask}
              onUpdateTask={handleUpdateTask}
              quickAddFocused={quickAddFocused}
              setQuickAddFocused={setQuickAddFocused}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarView tasks={tasks} />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView tasks={tasks} />
          )}

          {activeTab === 'notifications' && (
            <NotificationsView tasks={tasks} />
          )}

          {activeTab === 'profile' && (
            <ProfileView tasks={tasks} />
          )}

          {activeTab === 'settings' && (
            <SettingsView />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
