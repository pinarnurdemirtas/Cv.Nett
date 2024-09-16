import React from 'react';
import { Modal } from 'antd';
import { EnvironmentOutlined, MailOutlined, PhoneOutlined, GithubOutlined, LinkedinOutlined } from '@ant-design/icons';

const UserModal = ({ visible, onClose, user }) => {
  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      style={{ top: 7 }} 
      bodyStyle={{ padding: '24px' }} 
    >
      <div className="flex items-center space-x-6 mb-6">
        <img
          src={user.profilePicture}
          alt={`${user.name}'s profile`}
          className="w-24 h-24 rounded-full shadow-lg shadow-2xl"
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
            <span className="underline">Github</span>
          </a>
          <a href={user.linked} className="flex items-center text-gray-600" target="_blank" rel="noopener noreferrer">
            <LinkedinOutlined className="h-5 w-5 text-gray-600 mr-2" />
            <span className="underline">Linkedin</span>
          </a>
        </div>
      </div>

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
                <span className="text-base">{exp.company}, {exp.duration}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h2 className="text-xl font-semibold mb-2">Skills</h2>
        <ul className="list-disc ml-5">
          {user.skills && user.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default UserModal;
