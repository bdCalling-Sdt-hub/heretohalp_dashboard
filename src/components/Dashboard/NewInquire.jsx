import React, { useState } from "react";
import { Table, Input, Avatar, Modal, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useAllUserDataQuery, useAllUserQuery } from "../../page/redux/api/userApi";


export const NewInquire = () => {
  // State to handle modal visibility and selected record
  
  const { data: userData, refetch } = useAllUserDataQuery();
console.log(userData)
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const data =
    userData?.data?.slice(0,3)?.map((user, index) => ({
      key: index + 1,
      sno: `#${index + 1}`,
      name: {
        avatar: "https://i.pravatar.cc/150?img=1",
        text: user.authId?.name || "Unknown",
        phone: user.phoneNumber || "N/A",
      },
      driverLicense: "N/A",
      email: user.email,
      location: "N/A",
      isBlocked: user.authId?.isBlocked || false,
      authId: user.authId?._id,
    })) || [];

  const columns = [
    {
      title: "S no.",
      dataIndex: "sno",
      key: "sno",
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Avatar src={name.avatar} alt={name.text} />
          <div>
            <div>{name.text}</div>
            <div style={{ fontSize: "12px", color: "#888" }}>{name.phone}</div>
          </div>
        </div>
      ),
      width: "25%",
    },
    {
      title: "Driver License",
      dataIndex: "driverLicense",
      key: "driverLicense",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: "15%",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <EyeOutlined
            style={{ fontSize: "16px", cursor: "pointer" }}
            onClick={() => handleViewClick(record)}
          />
         
        </div>
      ),
      width: "10%",
    },
  ];

  const handleViewClick = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="bg-white h-screen">
    <div style={{ padding: "20px" }}>
      

      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        bordered
        style={{ backgroundColor: "#fff" }}
      />
    </div>

    <Modal
      title="User Details"
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      {selectedRecord && (
        <div>
          <p>
            <strong>Name:</strong> {selectedRecord.name.text}
          </p>
          <p>
            <strong>Driver License:</strong> {selectedRecord.driverLicense}
          </p>
          <p>
            <strong>Email:</strong> {selectedRecord.email}
          </p>
        </div>
      )}
    </Modal>
  </div>
  );
};
