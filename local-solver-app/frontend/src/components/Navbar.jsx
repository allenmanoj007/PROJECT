import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Home, User as UserIcon, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white dark:bg-dark-card border-b border-gray-100 dark:border-dark-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center max-w-5xl">
        <Link to="/" className="text-xl flex items-center gap-2 font-bold text-primary-600 dark:text-primary-500">
          <Home className="w-6 h-6" /> Local Solver
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {user.role === 'admin' && (
                <Link to="/admin" className="px-4 py-2 text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition">
                  Admin
                </Link>
              )}
              <span className="text-sm font-medium hidden sm:block">{user.email}</span>
              <button 
                onClick={logout}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition text-gray-600 dark:text-gray-300"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="px-4 py-2 text-primary-600 dark:text-primary-400 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition">Login</Link>
              <Link to="/register" className="btn-primary">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
