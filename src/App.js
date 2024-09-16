import React from 'react';
import { Routes, Route } from 'react-router-dom';
import User from './components/User';
import LoginPage from './components/LoginPage';
import Admin from './components/Admin';
import UserModal from './components/Modal';


const App = () => {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />} />

      </Routes>
    </div>
  );
};

export default App;
