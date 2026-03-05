import React from "react";
// Import Router components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Import Pages
import Login from "./pages/Login";
import Register from './pages/Register';
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
// Import Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div
        className="App"
        style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
      >
        <Routes>
          {/* Public Route: Login */}
          <Route path="/" element={<Login />} />

          {/* Protected Route: Student Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navbar />
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Route: Admin Panel (Restricted to 'admin' role) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <Navbar />
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
