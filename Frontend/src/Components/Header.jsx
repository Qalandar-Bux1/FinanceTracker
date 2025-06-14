import React from 'react';
import { useAuth } from '../context/authcontext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-emerald-800 to-emerald-700 shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl md:text-3xl font-bold text-emerald-50">💸 Finance Tracker</h1>

      {isAuthenticated && (
        <button
          onClick={handleLogout}
          className="bg-amber-500 hover:bg-amber-600 text-emerald-900 font-semibold px-4 py-2 rounded-md shadow transition duration-200 hover:shadow-lg"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;