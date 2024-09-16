import React, { useState } from 'react';

const UserEditFormModal = ({ user, onClose, onEditUser }) => {
  const [name, setName] = useState(user.name);
  const [surname, setSurname] = useState(user.surname);
  const [email, setEmail] = useState(user.email);
  const [experience, setExperience] = useState(user.experience);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      name,
      surname,
      email,
      experience,
    };
    onEditUser(updatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Surname:</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Experience:</label>
            {experience.map((exp, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => {
                    const newExperience = [...experience];
                    newExperience[index].position = e.target.value;
                    setExperience(newExperience);
                  }}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  value={exp.duration}
                  onChange={(e) => {
                    const newExperience = [...experience];
                    newExperience[index].duration = e.target.value;
                    setExperience(newExperience);
                  }}
                  className="w-full px-4 py-2 border rounded-lg mt-2"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditFormModal;
