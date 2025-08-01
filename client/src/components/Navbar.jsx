import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = !!localStorage.getItem('accessToken');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left side */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-600">
            MegaBlog
          </Link>
          {isLoggedIn && (
            <>
              <Link to="/create" className="text-gray-600 hover:text-blue-600 font-medium">
                Create
              </Link>
              <Link to="/myposts" className="text-gray-600 hover:text-blue-600 font-medium">
                My Posts
              </Link>
            </>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-700 font-medium">👤 {user?.username || 'User'}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}