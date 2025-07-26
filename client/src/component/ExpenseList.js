import React from 'react';

const ExpenseList = ({ expenses }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4 text-indigo-600">My Expenses</h3>
      <ul className="space-y-2">
        {expenses.map(exp => (
          <li
            key={exp._id}
            className="border p-3 rounded flex justify-between items-center hover:bg-gray-50"
          >
            <div>
              <p><strong>₹{exp.amount}</strong> - {exp.category}</p>
              <p className="text-sm text-gray-600">{new Date(exp.date).toLocaleDateString()}</p>
              {exp.notes && <p className="text-sm text-gray-500 italic">{exp.notes}</p>}
            </div>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {exp.status}
            </span>
          </li>
        ))}
        {expenses.length === 0 && (
          <li className="text-gray-500 text-sm text-center py-4">No expenses found.</li>
        )}
      </ul>
    </div>
  );
};

export default ExpenseList;
