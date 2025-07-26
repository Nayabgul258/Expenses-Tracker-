import React, { useEffect, useState } from 'react';
import API from '../api/api';

const AuditLogPage = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    API.get('/logs')
      .then(res => setLogs(res.data))
      .catch(err => console.error('Failed to fetch logs:', err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Audit Logs</h2>

      <div className="overflow-x-auto shadow border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Action</th>
              <th className="px-4 py-2">Expense Info</th>
              <th className="px-4 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{log.user?.name || 'N/A'}</td>
                <td className="px-4 py-2">{log.action}</td>
                <td className="px-4 py-2">
                  {log.expense
                    ? `₹${log.expense.amount} | ${log.expense.category}`
                    : 'N/A'}
                </td>
                <td className="px-4 py-2 text-gray-600">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  No logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLogPage;
