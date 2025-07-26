import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 text-white px-4 py-3 flex justify-between items-center shadow-md">
      <div className="text-xl font-semibold">
         Expense Tracker
      </div>
      <div className="flex gap-4 items-center">
        {user?.role === 'admin' && (
          <>
            <button onClick={() => navigate('/admin')} className="hover:underline">Dashboard</button>
            <button onClick={() => navigate('/logs')} className="hover:underline">Audit Logs</button>
          </>
        )}
        {user?.role === 'employee' && (
          <button onClick={() => navigate('/employee')} className="hover:underline">My Expenses</button>
        )}
        <button onClick={handleLogout} className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-100">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
