import React, { useEffect, useState } from 'react';
import { Line } from "react-chartjs-2";
import API from '../../api/api';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const MonthlyChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get('/charts/monthly')
      .then(res => setData(res.data))
      .catch(err => console.error('Error fetching monthly chart:', err));
  }, []);

  const chartData = {
    labels: data.map(d => `${d.month}/${d.year}`),
    datasets: [
      {
        label: 'Monthly Expenses',
        data: data.map(d => d.totalAmount),
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        fill: true,
        tension: 0.3,
      }
    ]
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 text-indigo-600">Monthly Expenses</h3>
      <Line data={chartData} />
    </div>
  );
};

export default MonthlyChart;
