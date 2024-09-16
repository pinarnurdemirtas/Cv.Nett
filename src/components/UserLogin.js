import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom'; 

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/user'); 
    }
  }, [isAuthenticated, navigate]); 

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        User Login
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-600 mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
            placeholder="Enter your Username"
          />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-950"
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-purple-950 text-white px-4 py-2 rounded-lg hover:bg-purple-800 focus:outline-none w-full"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login as User'}
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
