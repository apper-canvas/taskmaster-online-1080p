import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0
  });
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Update stats whenever tasks change
  useEffect(() => {
    const completed = tasks.filter(task => task.completed).length;
    setStats({
      total: tasks.length,
      completed,
      pending: tasks.length - completed
    });
    
    // Save tasks to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleDeleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    toast.success('Task deleted successfully!');
  };

  const handleToggleComplete = (id) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    
    // Find the task to determine if it's being completed or uncompleted
    const task = tasks.find(task => task.id === id);
    if (task) {
      if (!task.completed) {
        toast.success('Task completed! Great job! 🎉');
      } else {
        toast.info('Task marked as pending.');
      }
    }
  };

  const addNewTask = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
  };

  // Filter tasks based on selected category
  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.categoryId === selectedCategory);

  // Extract unique categories from tasks
  const categories = [
    { id: 'all', name: 'All Tasks', color: '#3B82F6' },
    { id: 'work', name: 'Work', color: '#8B5CF6' },
    { id: 'personal', name: 'Personal', color: '#10B981' },
    { id: 'shopping', name: 'Shopping', color: '#F59E0B' },
    { id: 'health', name: 'Health', color: '#EF4444' }
  ];

  const CheckIcon = getIcon('check');
  const PlusIcon = getIcon('plus');
  const ChevronRightIcon = getIcon('chevron-right');
  const ClockIcon = getIcon('clock');
  const TrashIcon = getIcon('trash-2');
  const ListIcon = getIcon('list');
  const CircleIcon = getIcon('circle');
  const CheckCircleIcon = getIcon('check-circle');

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8 max-w-6xl">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              TaskMaster
            </motion.h1>
            <p className="text-surface-600 dark:text-surface-300 mt-1">
              {format(new Date(), 'EEEE, MMMM d, yyyy')}
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex gap-4 flex-wrap"
          >
            <div className="card flex gap-3 items-center">
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <div>
                <p className="text-sm text-surface-500">Completed</p>
                <p className="font-bold">{stats.completed}</p>
              </div>
            </div>
            
            <div className="card flex gap-3 items-center">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <div>
                <p className="text-sm text-surface-500">Pending</p>
                <p className="font-bold">{stats.pending}</p>
              </div>
            </div>
            
            <div className="card flex gap-3 items-center">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <div>
                <p className="text-sm text-surface-500">Total</p>
                <p className="font-bold">{stats.total}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sidebar with categories */}
        <div className="lg:col-span-3">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ListIcon className="w-5 h-5 text-primary" />
              Categories
            </h2>
            
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary/10 text-primary font-medium shadow-sm'
                      : 'hover:bg-surface-100 dark:hover:bg-surface-700'
                  }`}
                >
                  <span 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  {category.name}
                  
                  {selectedCategory === category.id && (
                    <ChevronRightIcon className="w-4 h-4 ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-9">
          <MainFeature 
            addNewTask={addNewTask} 
            categories={categories.filter(c => c.id !== 'all')} 
          />
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              {selectedCategory === 'all' ? 'All Tasks' : categories.find(c => c.id === selectedCategory)?.name}
              <span className="text-sm bg-surface-200 dark:bg-surface-700 px-2 py-1 rounded-full ml-2">
                {filteredTasks.length}
              </span>
            </h2>
            
            <AnimatePresence>
              {filteredTasks.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="card bg-surface-50 dark:bg-surface-800/50 border-dashed flex flex-col items-center justify-center py-12"
                >
                  <PlusIcon className="w-12 h-12 text-surface-300 dark:text-surface-600 mb-4" />
                  <p className="text-surface-500 dark:text-surface-400 text-center">
                    No tasks yet. Add your first task to get started!
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  layout 
                  className="space-y-3"
                >
                  {filteredTasks.map(task => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      layout
                      className={`card ${
                        task.completed ? 'bg-surface-50/80 dark:bg-surface-800/30' : ''
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <button 
                          onClick={() => handleToggleComplete(task.id)}
                          className="mt-1 checkbox-container"
                        >
                          <span className={`custom-checkbox ${task.completed ? 'bg-primary border-primary' : ''}`}>
                            {task.completed && <CheckIcon className="w-3 h-3 text-white" />}
                          </span>
                        </button>
                        
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-1">
                            <h3 className={`font-semibold ${
                              task.completed ? 'line-through text-surface-400 dark:text-surface-500' : ''
                            }`}>
                              {task.title}
                            </h3>
                            
                            <div className="flex gap-2 ml-0 sm:ml-auto">
                              <span 
                                className={`priority-badge ${
                                  task.priority === 'high' ? 'priority-high' :
                                  task.priority === 'medium' ? 'priority-medium' : 'priority-low'
                                }`}
                              >
                                {task.priority}
                              </span>
                              
                              <span 
                                className="bg-surface-100 dark:bg-surface-700 text-xs px-2 py-1 rounded-full"
                              >
                                {categories.find(c => c.id === task.categoryId)?.name || 'Uncategorized'}
                              </span>
                            </div>
                          </div>
                          
                          <p className={`text-sm ${
                            task.completed ? 'text-surface-400 dark:text-surface-500' : 'text-surface-600 dark:text-surface-300'
                          }`}>
                            {task.description}
                          </p>
                          
                          {task.dueDate && (
                            <div className="mt-3 flex items-center text-xs text-surface-500">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                            </div>
                          )}
                        </div>
                        
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-surface-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-1"
                          aria-label="Delete task"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;