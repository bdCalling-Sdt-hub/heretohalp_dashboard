import React, { useState } from 'react';
import { Table, Avatar, Modal, Input } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useGetAllPartnerQuery } from '../redux/api/blogApi';

export const BusinessPartner = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { data: allPartner } = useGetAllPartnerQuery();
  console.log(allPartner)
  const navigate = useNavigate();

  const data = allPartner?.data?.result?.map((partner, index) => ({
    key: partner._id,
    sno: `#${index + 1}`,
    businessName: partner.businessName,
    email: partner.email,
    contact: partner.contactNumber,
    location: `${partner.city}, ${partner.state}, ${partner.country}`,
    details: partner,
  })) || [];

  const columns = [
    {
      title: 'S no.',
      dataIndex: 'sno',
      key: 'sno',
      width: '10%',
    },
    {
      title: 'Business Name',
      dataIndex: 'businessName',
      key: 'businessName',
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

  const handleViewClick = (record) => {
    setSelectedRecord(record.details);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <h1 onClick={() => navigate(-1)} className="flex gap-4 cursor-pointer">
          <button className="text-[#EF4849]">
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">Manage Business Partners</span>
        </h1>
        <Input placeholder="Search here..." style={{ width: 300 }} />
      </div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        bordered
      />
      
      <Modal
        title="Business Partner Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
       {selectedRecord && (
          <div>
            <p><strong>Business Name:</strong> {selectedRecord?.businessName}</p>
            <p><strong>Email:</strong> {selectedRecord?.email}</p>
            <p><strong>Contact Number:</strong> {selectedRecord?.contactNumber}</p>
            <p><strong>Location:</strong> {selectedRecord?.city}, {selectedRecord?.state}, {selectedRecord?.country}</p>
            <p><strong>Type of Partnership:</strong> {selectedRecord?.typeOfPartnership.join(', ')}</p>
            <p><strong>Business Website:</strong> <a href={selectedRecord?.businessWebsite} target="_blank" rel="noopener noreferrer">{selectedRecord.businessWebsite}</a></p>
            <p><strong>Description:</strong> {selectedRecord?.description}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};
