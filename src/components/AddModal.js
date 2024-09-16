import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/authSlice'; // Redux slice'ınızı buraya import edin

const AddUserModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [experience, setExperience] = useState('');

  const handleSubmit = () => {
    const newUser = {
      username: email, // Kullanıcı adı için email kullanıldı, ihtiyaca göre ayarlayabilirsiniz
      password: 'defaultPassword', // Şifre için varsayılan bir değer kullanabilirsiniz
    };
    dispatch(addUser(newUser))
      .unwrap()
      .then(() => {
        // Başarılı durumda yapılacak işlemler
        onClose();
      })
      .catch((error) => {
        // Hata durumunda yapılacak işlemler
        console.error('Failed to add user:', error);
      });
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 mb-4 w-full"
        />
        <input
          type="text"
          placeholder="Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 mb-4 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 mb-4 w-full"
        />
        <input
          type="text"
          placeholder="Profile Picture URL"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 mb-4 w-full"
        />
        <textarea
          placeholder="Experience (e.g. position: duration)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 mb-4 w-full"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-purple-800 text-white px-4 py-2 rounded-lg hover:bg-purple-900 focus:outline-none"
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
