import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaArrowLeft } from 'react-icons/fa';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        student_id: '',
        department: 'Computer Science', // Default value
        password: ''
    });
    const [status, setStatus] = useState({ type: '', msg: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Role is hardcoded to "student" as per your requirement
            await axios.post('https://lib-system-backend.onrender.com', {
                ...formData,
                role: 'student'
            });
            setStatus({ type: 'success', msg: 'Registration Successful! You can now login.' });
        } catch (err) {
            setStatus({ type: 'danger', msg: err.response?.data?.msg || 'Registration Failed' });
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: '450px', borderRadius: '15px', border: 'none' }}>
                <div className="text-center mb-4">
                    <div className="bg-primary text-white rounded-circle d-inline-block p-3 mb-2">
                        <FaUserPlus size={30} />
                    </div>
                    <h3 className="fw-bold text-primary">Student Registration</h3>
                    <p className="text-muted small">Access RVR JC Library Resources</p>
                </div>

                {status.msg && (
                    <div className={`alert alert-${status.type} text-center`}>
                        {status.msg}
                        {status.type === 'success' && (
                            <div className="mt-2">
                                <Link to="/" className="btn btn-sm btn-primary">Go to Login</Link>
                            </div>
                        )}
                    </div>
                )}

                {!status.msg || status.type === 'danger' ? (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Full Name</label>
                            <input type="text" className="form-control" placeholder="Enter Full Name" 
                                onChange={e => setFormData({...formData, name: e.target.value})} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Email ID </label>
                            <input type="text" className="form-control" placeholder="e.g.XXXXXX@gmail.com" 
                                onChange={e => setFormData({...formData, student_id: e.target.value})} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Department</label>
                            <select className="form-select" onChange={e => setFormData({...formData, department: e.target.value})}>
                                <option value="Computer Science">Computer Science / IT</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Mechanical">Mechanical Engineering</option>
                                <option value="ECE">ECE</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Create Password</label>
                            <input type="password" className="form-control" placeholder="••••••••" 
                                onChange={e => setFormData({...formData, password: e.target.value})} required />
                        </div>

                        <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">Register Now</button>
                    </form>
                ) : null}

                <div className="text-center mt-4">
                    <p className="small mb-0">Already have an account?</p>
                    <Link to="/" className="text-decoration-none fw-bold">
                        <FaArrowLeft className="me-1" /> Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
