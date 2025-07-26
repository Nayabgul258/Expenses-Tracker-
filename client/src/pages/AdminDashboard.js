import react, { useEffect, useState } from "react";
import API from "../api/api";

const AdminDashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchExpenses = async () => {
    try {
      const res = await API.get(
        `/expenses${filter ? `?status=${filter}` : ""}`
      );
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/expenses/${id}/status`, { status });
      fetchExpenses();
    } catch (err) {
      console.error("Error updating status:", err.message);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [filter]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Admin Dashboard
      </h2>

      {/* Filter */}
      <div className="flex justify-end mb-4">
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="border px-4 py-2 rounded shadow-sm"
          defaultValue=""
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Expense Table */}
      <div className="overflow-x-auto shadow border rounded-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-red-100">
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Notes</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp) => (
              <tr key={exp._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{exp.user?.name || "N/A"}</td>
                <td className="px-4 py-2">₹{exp.amount}</td>
                <td className="px-4 py-2">{exp.category}</td>
                <td className="px-4 py-2">
                  {new Date(exp.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{exp.notes}</td>
                <td className="px-4 py-2 font-semibold text-blue-600">
                  {exp.status}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <>
                    <button
                      onClick={() => updateStatus(exp._id, "Approved")}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(exp._id, "Rejected")}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs"
                    >
                      Reject
                    </button>
                  </>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No expenses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
