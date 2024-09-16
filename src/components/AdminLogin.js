import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin } from '../redux/adminAuthSlice' 
import { useNavigate } from 'react-router-dom';


const AdminLogin = () => {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { isAuthenticated, error, loading } = useSelector((state) => state.adminAuth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdmin({ adminId, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin'); 
    }
  }, [isAuthenticated, navigate]); 


  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Admin Login
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-600 mb-1">Admin ID</label>
          <input
            type="text"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            placeholder="Enter your ID"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none w-full"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login as Admin'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
