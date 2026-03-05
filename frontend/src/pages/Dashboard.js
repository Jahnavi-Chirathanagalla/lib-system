import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaBook } from "react-icons/fa";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    axios
      .get("https://lib-system-backend.onrender.com")
      .then((res) => setBooks(res.data));
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      (book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())) &&
      (deptFilter === "All" || book.department === deptFilter)
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: "#003580" }}>Welcome, {user?.name} 🎓</h2>
        <button
          className="btn btn-outline-danger"
          onClick={() => (window.location.href = "/")}
        >
          Logout
        </button>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or author..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            onChange={(e) => setDeptFilter(e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Data Science">Data Science</option>
            <option value="Common">Common Books</option>
             <option value="AI & ML">AI & ML</option>
              <option value="IOT">IOT</option>
              <option value="CSBS">CSBS</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="IT">IT</option>
              <option value="Chemical">Chemical</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filteredBooks.map((book) => (
          <div className="col-md-4 mb-3" key={book._id}>
            <div className="card shadow-sm h-100 border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">
                  <FaBook className="me-2" />
                  {book.title}
                </h5>
                <p className="text-muted mb-1">Author: {book.author}</p>
                <span className="badge bg-info text-dark mb-2">
                  {book.department}
                </span>
                <div className="mt-2">
                  {book.available_copies > 5 ? (
                    <span className="text-success fw-bold">
                      Available ({book.available_copies} copies)
                    </span>
                  ) : book.available_copies > 0 ? (
                    <span className="text-warning fw-bold">
                      Limited Copies ({book.available_copies})
                    </span>
                  ) : (
                    <span className="text-danger fw-bold">Not Available</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
