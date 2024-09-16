import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserModal from './Modal'; 
import UserFormModal from './Form';
import UserEditFormModal from './FormAdmin'; // Kullanıcı düzenleme modalı
import usersData from '../users.json';

const Admin = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [formModalVisible, setFormModalVisible] = useState(false);
  const [editFormModalVisible, setEditFormModalVisible] = useState(false); // Düzenleme için modal
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(usersData);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalVisible(false);
  };

  const openFormModal = () => {
    setFormModalVisible(true);
  };

  const closeFormModal = () => {
    setFormModalVisible(false);
  };

  const handleAddUser = (newUser) => {
    setUsers([newUser, ...users]);
    closeFormModal();
  };

  const openEditFormModal = (user) => {
    setSelectedUser(user);
    setEditFormModalVisible(true);
  };

  const closeEditFormModal = () => {
    setSelectedUser(null);
    setEditFormModalVisible(false);
  };

  const handleEditUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    closeEditFormModal();
  };

  const filteredUsers = users.filter(user =>
    user.experience.some(exp => exp.position.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-8 relative">
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none"
      >
        Logout
      </button>

      <div className="mb-8 flex gap-4 justify-center">
        <input
          type="text"
          placeholder="Search by position"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={openFormModal}
          className="bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:outline-none"
        >
          Add User
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-lg shadow-lg w-60 flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105"
              onClick={() => openEditFormModal(user)} // Kullanıcı düzenleme modalı açılıyor
            >
              <img
                src={user.profilePicture}
                alt={`${user.name}'s profile`}
                className="w-28 h-28 rounded-full mb-4 shadow-md"
              />
              <h3 className="text-xl font-semibold text-center mb-2">{`${user.name} ${user.surname}`}</h3>
              <p className="text-gray-600 text-center mb-2">{user.email}</p>
              <div className="text-gray-700 text-center">
                {user.experience.map((exp, index) => (
                  <div key={index} className="mb-2">
                    <p className="font-medium">{exp.position}</p>
                    <p className="text-sm">{exp.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No users available.</p>
        )}
      </div>

      {selectedUser && editFormModalVisible && (
        <UserEditFormModal
          user={selectedUser}
          onClose={closeEditFormModal}
          onEditUser={handleEditUser}
        />
      )}

      {formModalVisible && <UserFormModal onAddUser={handleAddUser} onClose={closeFormModal} />}
      {selectedUser && modalVisible && <UserModal user={selectedUser} onClose={closeModal} />}
    </div>
  );
};

export default Admin;
