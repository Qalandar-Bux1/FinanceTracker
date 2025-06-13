import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  DollarSign,
  PieChart,
  User,
  Menu,
} from 'lucide-react';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const { pathname } = useLocation();

  const menuItems = [
    { path: '/dashboard/transactions', label: 'Transactions', icon: <DollarSign size={20} /> },
    { path: '/dashboard/summry', label: 'Summary', icon: <Home size={20} /> },
    { path: '/dashboard/charts', label: 'Charts', icon: <PieChart size={20} /> },
    { path: '/dashboard/profile', label: 'Profile', icon: <User size={20} /> },
  ];

  return (
    <aside
      className={`bg-slate-800 text-white h-screen transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } relative shadow-md`}
    >

<div className="flex items-center justify-between px-4 py-4 border-b border-slate-700">
  {!isCollapsed && (
    <h2 className="text-xl font-bold text-white">Finance Tracker</h2>
  )}
  <button
    onClick={toggleSidebar}
    className="text-gray-300 hover:text-amber-400 p-1.5 rounded-md hover:bg-slate-700 transition"
    aria-label="Toggle sidebar"
  >
    <Menu size={20} />
  </button>
</div>


     
      <nav className="p-3">
        <ul className="space-y-2">
          {menuItems.map(({ path, label, icon }) => (
            <li key={path}>
              <Link
                to={path}
                className={`flex items-center p-3 rounded-md transition-colors ${
                  pathname === path
                    ? 'bg-slate-700 text-amber-400 font-semibold'
                    : 'hover:bg-slate-700 text-white'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? label : ''}
              >
                <span className={`${isCollapsed ? '' : 'mr-3'} text-white`}>
                  {icon}
                </span>
                {!isCollapsed && label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
