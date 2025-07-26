import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
import EmployeeDashboard from "./pages/EmployeeDashboard.js";
import AdminDashboard from "./pages/AdminDashboard.js";
import AuditLogPage from "./pages/AuditLogPage.js";
import CategoryChart from "../src/component/Charts/CategoryChart.js";
import MonthlyChart from "../src/component/Charts/MonthlyChart.js";

function App() {
  // const user = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(null);

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protect Routes */}
        <Route
          path="/employee"
          element={
            user?.role === "employee" ? (
              <EmployeeDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
 
        />

        <Route
          path="/admin"
          element={
            user?.role === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/logs"
          element={
            user?.role === "admin" ? <AuditLogPage /> : <Navigate to="/login" />
          }
        />

         <Route path="/category" element={<CategoryChart />} />
      <Route path="/monthly" element={<MonthlyChart />} />
      </Routes>
    </Router>
  );
}

export default App;
