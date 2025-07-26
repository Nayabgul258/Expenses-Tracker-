import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'employee' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      if (res.data.user.role === 'admin') navigate('/admin');
      else navigate('/employee');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
  
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-600 mb-1">Name</label>
        <input
          name="name"
          placeholder="Enter your name"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-gray-600 mb-1">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-gray-600 mb-1">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-gray-600 mb-1">Role</label>
        <select
          name="role"
          onChange={handleChange}
          defaultValue="employee"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="employee">Employee</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Register
      </button>

      {error && <p className="text-red-600 text-sm text-center mt-2">{error}</p>}
    </form>
  </div>
</div>

  );
};

export default RegisterPage;
