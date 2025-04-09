import { useEffect} from 'react';
import { Link, useNavigate } from 'react-router';

const Navbar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">URL Shortener</Link>

        <div className="space-x-4">
          <>
            <Link to="/shorten" className="hover:underline">Shorten</Link>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/search" className="hover:underline">Search</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Sign Out
            </button>
            <Link to="/signin" className="hover:underline">Sign In</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
