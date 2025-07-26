import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import API from '../../api/api';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CategoryChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get('/charts/category')
      .then(res => setData(res.data))
      .catch(err => console.error('Error fetching category chart:', err));
  }, []);

  const chartData = {
    labels: data.map(item => item.category),
    datasets: [
      {
        label: 'Total Expenses',
        data: data.map(item => item.totalAmount),
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderRadius: 6,
      }
    ]
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold mb-4 text-indigo-600">Expenses by Category</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default CategoryChart;
