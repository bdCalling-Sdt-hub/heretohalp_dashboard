import React, { useState } from 'react';
import { Table, Avatar, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

export const TechPartner = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Sample Data
  const data = [
    {
      key: '1',
      sno: '#12333',
      name: { avatar: 'https://i.pravatar.cc/150?img=1', text: 'dindiniya' },
      email: 'bockelboy@att.com',
      contact: '(201) 555-0124',
      serviceName: 'Kent, Utah',
      location: 'Kent, Utah',
    },
    {
      key: '2',
      sno: '#12333',
      name: { avatar: 'https://i.pravatar.cc/150?img=2', text: 'Halima' },
      email: 'csilvers@verizon.com',
      contact: '(219) 555-0114',
      serviceName: 'Great Falls, Maryland',
      location: 'Great Falls, Maryland',
    },
    {
      key: '3',
      sno: '#12333',
      name: { avatar: 'https://i.pravatar.cc/150?img=3', text: 'Foysal Rahman' },
      email: 'qamaho@mail.com',
      contact: '(316) 555-0116',
      serviceName: 'Lansing, Illinois',
      location: 'Lansing, Illinois',
    },
    {
      key: '4',
      sno: '#12333',
      name: { avatar: 'https://i.pravatar.cc/150?img=4', text: 'Hari Danang' },
      email: 'xterris@gmail.com',
      contact: '(907) 555-0101',
      serviceName: 'Lafayette, California',
      location: 'Lafayette, California',
    },
  ];

  // Table Columns
  const columns = [
    {
      title: 'S no.',
      dataIndex: 'sno',
      key: 'sno',
      width: '10%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => (
        <div className="flex items-center">
          <Avatar src={name.avatar} alt={name.text} />
          <span style={{ marginLeft: 8 }}>{name.text}</span>
        </div>
      ),
      width: '20%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
    },
    {
      title: 'Contact Number',
      dataIndex: 'contact',
      key: 'contact',
      width: '15%',
    },
    {
      title: 'Services Name',
      dataIndex: 'serviceName',
      key: 'serviceName',
      width: '15%',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: '15%',
    },
    {
      title: 'View',
      key: 'view',
      render: (_, record) => (
        <EyeOutlined
          style={{ fontSize: '16px', color: '#1E3F66', cursor: 'pointer' }}
          onClick={() => handleViewClick(record)}
        />
      ),
      width: '5%',
    },
  ];

  // Handle View button click
  const handleViewClick = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  // Close Modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        bordered
        style={{ marginTop: '' }}
      />

      {/* Modal to show selected record details */}
      <Modal
        title="Tech Partner Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedRecord && (
          <div>
            <p><strong>Name:</strong> {selectedRecord.name.text}</p>
            <p><strong>Email:</strong> {selectedRecord.email}</p>
            <p><strong>Contact Number:</strong> {selectedRecord.contact}</p>
            <p><strong>Service Name:</strong> {selectedRecord.serviceName}</p>
            <p><strong>Location:</strong> {selectedRecord.location}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};
