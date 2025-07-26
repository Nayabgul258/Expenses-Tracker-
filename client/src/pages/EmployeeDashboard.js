import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar.js';
import ExpenseForm from '../component/ExpenseForm.js';
import ExpenseList from '../component/ExpenseList.js';
import API from '../api/api';

const EmployeeDashboard = () => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const res = await API.get('/expenses/me');
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <ExpenseForm onAdd={fetchExpenses} />
        <ExpenseList expenses={expenses} />
      </div>
    </div>
  );
};

export default EmployeeDashboard;





