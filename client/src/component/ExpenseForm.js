import React, { useState } from 'react';
import API from '../api/api';

const ExpenseForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    amount: '',
    category: 'Travel',
    date: '',
    notes: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/expenses', form);
      setForm({ amount: '', category: 'Travel', date: '', notes: '' });
      onAdd(); // Refresh list
    } catch (err) {
      console.error('Error creating expense:', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow p-6 rounded-lg mb-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
          className="border rounded px-4 py-2"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border rounded px-4 py-2"
        >
          <option value="Travel">Travel</option>
          <option value="Food">Food</option>
          <option value="Office Supplies">Office Supplies</option>
          <option value="Other">Other</option>
        </select>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
          className="border rounded px-4 py-2"
        />
        <input
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          className="border rounded px-4 py-2"
        />
      </div>
      <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
