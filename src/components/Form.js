// UserFormModal.js
import React, { useState } from 'react';

const UserFormModal = ({ onClose, onAddUser }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [experience, setExperience] = useState([{ position: '', duration: '' }]);


  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...experience];
    newExperience[index][field] = value;
    setExperience(newExperience);
  };

  const handleSubmit = () => {
    const newUser = {
      id: Date.now(), // ID için geçici çözüm
      name,
      surname,
      email,
      phone,
      address,
      profilePicture,
      experience,
    };
    onAddUser(newUser);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Add New User</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="phone"
          placeholder="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="address"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="text"
          placeholder="Profile Picture URL"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
          className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg"
        />
        <div>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                placeholder="Position"
                value={exp.position}
                onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Duration"
                value={exp.duration}
                onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)}
                className="block w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          ))}
          
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none"
          >
            Add User
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;
