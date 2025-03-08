import React, { useState } from "react";
import { Table, Input, Avatar, Modal, message } from "antd";
import { EyeOutlined, StopOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useAllUserQuery, useUserBlockMutation } from "../redux/api/userApi";
import { imageUrl } from "../redux/api/baseApi";

const UserManagement = () => {
  const [searchTerm, setSearch] = useState("");
  const { data: userData, refetch } = useAllUserQuery({ searchTerm });
  console.log(userData)
  const [userBlock] = useUserBlockMutation();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const data =
    userData?.data?.map((user, index) => ({
      key: index + 1,
      sno: `#${index + 1}`,
      name: {
        avatar: <img src={`${imageUrl}/${user?.profile_image}`} alt="" />,
        text: user?.authId?.name || "Unknown",
        phone: user?.phoneNumber || "N/A",
      },
      driverLicense: "N/A",
      email: user?.email,
      location: "N/A",
      isBlocked: user?.authId?.isBlocked || false,
      authId: user?.authId?._id,
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
          <Avatar src={name?.avatar} alt={name?.text} />
          <div>
            <div>{name.text}</div>
            <div style={{ fontSize: "12px", color: "#888" }}>{name?.phone}</div>
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
          <StopOutlined
            style={{
              fontSize: "16px",
              cursor: "pointer",
              color: record.isBlocked ? "red" : "black",
            }}
            onClick={() => handleBlockClick(record)}
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

  const handleBlockClick = async (record) => {
    const { authId, isBlocked } = record;
    const action = isBlocked ? "no" : "yes";
    const data = {
      authId,
      isBlocked: action,
    };

    try {
      const response = await userBlock(data).unwrap();
      if (response.success) {
        message.success(response?.message);
        refetch();
      } else {
        message.error("Failed to change user status");
      }
    } catch (error) {
      message.error("An error occurred while updating the status");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bg-white h-screen">
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h1
            onClick={() => navigate(-1)}
            className="flex gap-4 cursor-pointer"
          >
            <button className="text-[#EF4849]">
              <FaArrowLeft />
            </button>
            <span className="text-lg font-semibold">User Management</span>
          </h1>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search here..."
            style={{ width: 300, padding: "9px 5px 9px 5px" }}
          />
        </div>

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
              <strong>Name:</strong> {selectedRecord?.name.text}
            </p>
            <p>
              <strong>Driver License:</strong> {selectedRecord?.driverLicense}
            </p>
            <p>
              <strong>Email:</strong> {selectedRecord?.email}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserManagement;
