import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const AdminPanel = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    author: "",
    department: "Computer Science",
    category: "General",
    total_copies: 1,
    available_copies: 1,
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios
      .get("https://lib-system-back-end.onrender.com")
      .then((res) => setBooks(res.data));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await axios.post("https://lib-system-back-end.onrender.com", form);
    fetchBooks();
  };

  const deleteBook = async (id) => {
    if (window.confirm("Delete this book?")) {
      await axios.delete(`https://lib-system-backend.onrender.com/${id}`);
      fetchBooks();
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Admin Library Management</h2>
      <form className="card p-4 mb-5 shadow-sm bg-light" onSubmit={handleAdd}>
        <div className="row g-3">
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Title"
              required
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              placeholder="Author"
              required
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            >
              <option value="Computer Science">CSE</option>
              <option value="Data Science">Data Science</option>
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
          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Copies"
              onChange={(e) =>
                setForm({
                  ...form,
                  total_copies: e.target.value,
                  available_copies: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-success w-100">
              <FaPlus /> Add Book
            </button>
          </div>
        </div>
      </form>

      <table className="table table-hover shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Dept</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.department}</td>
              <td>{book.available_copies}</td>
              <td>
                <button className="btn btn-sm btn-outline-primary me-2">
                  <FaEdit />
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => deleteBook(book._id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
