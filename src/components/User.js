import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MailOutlined, EnvironmentOutlined, PhoneOutlined, LinkedinOutlined, GithubOutlined } from '@ant-design/icons';
import { Modal, Input, Form, Card, Button } from 'antd'; // Ant Design bileşenlerini import edin
import { updateUser } from '../redux/authSlice'; // Redux action'ınızı import edin
import users from '../users.json';

const UserCV = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth); // Redux store'dan kullanıcı bilgilerini al

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [newEducation, setNewEducation] = useState({ degree: '', school: '', graduationYear: '' });
  const [newExperience, setNewExperience] = useState({ position: '', company: '', duration: '' });
  const [newSkill, setNewSkill] = useState('');

  const handleLogout = () => {
    navigate('/');
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSave = () => {
    const updatedUser = {
      ...editedUser,
      education: [...editedUser.education, newEducation],
      experience: [...editedUser.experience, newExperience],
      skills: [...editedUser.skills, newSkill],
    };
    dispatch(updateUser(updatedUser)); // Kullanıcıyı güncelleyen action'ı çağırın
    setIsEditing(false);
    // Temizleme işlemleri
    setNewEducation({ degree: '', school: '', graduationYear: '' });
    setNewExperience({ position: '', company: '', duration: '' });
    setNewSkill('');
  };

  const filteredUsers = users.filter(
    (u) =>
      u.id !== user.id && // Kullanıcının kendisini hariç tutar
      u.experience && u.experience.some((exp) => exp.position === user.experience[0]?.position)
  );
  

 
  return (
    <div className="flex">
      <div className="flex-1">

        <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-lg mt-3 relative">
          <button
            onClick={handleEdit}
            className="absolute bottom-4 right-4 bg-purple-950  px-4 py-2 rounded-lg hover:bg-purple-950 text-white"
          >
            Edit Information
          </button>
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 bg-transparent text-purple-950 px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none hover:text-white"
          >
            Logout
          </button>
          <div className="flex items-center space-x-6 mb-6">
            <img
              src={user.profilePicture}
              alt={`${user.name}'s profile`}
              className="w-24 h-24 rounded-full shadow-md shadow-2xl"
            />
            <div>
              <h1 className="text-2xl font-bold pb-3">{`${user.name} ${user.surname}`}</h1>
              <div className="flex items-center text-gray-600 pb-1">
                <EnvironmentOutlined className="h-5 w-5 text-gray-600 mr-2" />
                <span>{user.address}</span>
              </div>
              <div className="flex items-center text-gray-600 pb-1">
                <MailOutlined className="h-5 w-5 text-gray-600 mr-2" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center text-gray-600 pb-1">
                <PhoneOutlined className="h-5 w-5 text-gray-600 mr-2" />
                <span>{user.phone}</span>
              </div>
              <a href={user.github} className="flex items-center pb-1 text-gray-600" target="_blank" rel="noopener noreferrer">
                <GithubOutlined className="h-5 w-5 text-gray-600 mr-2" />
                <span className='underline'>Github</span>
              </a>
              <a href={user.linked} className="flex items-center text-gray-600" target="_blank" rel="noopener noreferrer">
                <LinkedinOutlined className="h-5 w-5 text-gray-600 mr-2" />
                <span className='underline'>Linkedin</span>
              </a>
            </div>
          </div>

          {/* Modal İçeriği */}
          <Modal
            title="Edit User Information"
            visible={isEditing}
            onCancel={() => setIsEditing(false)}
            onOk={handleSave}
            style={{ top: 7 }}
            okText="Save Changes"
            cancelText="Cancel"
          >
            {/* Eğitim Eklemeleri */}
            <div>
              <h3 className="text-lg font-semibold pb-2">Add Education</h3>
              <Form layout="vertical">
                <Form.Item label="Degree">
                  <Input
                    name="degree"
                    value={newEducation.degree}
                    onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                    placeholder="Enter a new degree"
                  />
                </Form.Item>
                <Form.Item label="School">
                  <Input
                    name="school"
                    value={newEducation.school}
                    onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
                    placeholder="Enter a new school"
                  />
                </Form.Item>
                <Form.Item label="Graduation Year">
                  <Input
                    name="graduationYear"
                    value={newEducation.graduationYear}
                    onChange={(e) => setNewEducation({ ...newEducation, graduationYear: e.target.value })}
                    placeholder="Enter a graduation year"
                  />
                </Form.Item>
              </Form>
            </div>

            {/* Deneyim Eklemeleri */}
            <div>
              <h3 className="text-lg font-semibold pb-2">Add Experience</h3>
              <Form layout="vertical">
                <Form.Item label="Position">
                  <Input
                    name="position"
                    value={newExperience.position}
                    onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                    placeholder="Enter a new position"
                  />
                </Form.Item>
                <Form.Item label="Company">
                  <Input
                    name="company"
                    value={newExperience.company}
                    onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                    placeholder="Enter a new company"
                  />
                </Form.Item>
                <Form.Item label="Duration">
                  <Input
                    name="duration"
                    value={newExperience.duration}
                    onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
                    placeholder="Enter a duration"
                  />
                </Form.Item>
              </Form>
            </div>

            {/* İletişim Bilgilerini Düzenleme */}
            <div>
              <h3 className="text-lg font-semibold pb-2">Edit Communication</h3>
              <Form layout="vertical">
                <Form.Item label="Address">
                  <Input
                    name="address"
                    value={editedUser.address}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Email">
                  <Input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item label="Phone">
                  <Input
                    name="phone"
                    value={editedUser.phone}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Form>
            </div>
          </Modal>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-xl font-semibold mb-2">Education</h2>
            <ul className="list-disc ml-5">
              {user.education && user.education.map((edu, index) => (
                <li key={index}>
                  <div className="flex flex-col pb-4">
                    <strong className="text-lg font-bold">{edu.degree}</strong>
                    <span className="text-base">{edu.school}, {edu.graduationYear}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-xl font-semibold mb-2">Experience</h2>
            <ul className="list-disc ml-5">
              {user.experience && user.experience.map((exp, index) => (
                <li key={index}>
                  <div className="flex flex-col pb-4">
                    <strong className="text-lg font-bold">{exp.position}</strong>
                    <span className="text-base">{exp.company} - {exp.duration}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <ul className="list-disc ml-5">
              {user.skills && user.skills.map((skill, index) => (
                <li key={index}>
                  <span className="text-base">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="w-1/4 p-4 bg-gray-100">
        <h2 className="text-xl font-semibold mb-4">Other Users with Similar Position</h2>
        {filteredUsers.map((u) => (
          <Card key={u.id} className="mb-4">
            <div className="flex items-center justify-between">
              <Card.Meta
                avatar={<img src={u.profilePicture} alt={`${u.name}'s profile`} className="w-12 h-12 rounded-full" />}
                title={`${u.name} ${u.surname}`}
                description={`${u.experience[0]?.position || 'Position not available'}`}
              />
              <Button
                className="bg-purple-950 text-white"
              >
                Add
              </Button>
            </div>
          </Card>
        ))}

      </div>
    </div>
  );
};

export default UserCV;
