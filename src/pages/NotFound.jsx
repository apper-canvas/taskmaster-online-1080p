import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getIcon } from '../utils/iconUtils';

const NotFound = () => {
  const HomeIcon = getIcon('home');
  const AlertTriangleIcon = getIcon('alert-triangle');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        <div className="mb-8 flex justify-center">
          <motion.div
            initial={{ scale: 0.8, rotate: 0 }}
            animate={{ scale: 1, rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.8, times: [0, 0.2, 0.5, 0.8, 1] }}
            className="w-24 h-24 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center shadow-soft"
          >
            <AlertTriangleIcon className="w-12 h-12 text-accent" />
          </motion.div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-surface-800 dark:text-surface-100">
          Page Not Found
        </h1>
        
        <p className="text-surface-600 dark:text-surface-300 mb-8">
          Uh oh! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center gap-2 neu-button px-6 py-3 font-medium"
        >
          <HomeIcon className="w-5 h-5" />
          Go back home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;