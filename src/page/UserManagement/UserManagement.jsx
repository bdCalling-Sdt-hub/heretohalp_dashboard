import React from "react";
import { Table, Input, Avatar } from "antd";
import { EyeOutlined, StopOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const UserManagement = () => {
  const navigate = useNavigate();
  // Sample Data
  const data = [
    {
      key: "1",
      sno: "#12333",
      name: {
        avatar: "https://i.pravatar.cc/150?img=1",
        text: "dindiniya",
        phone: "08+ 123 456 789",
      },
      driverLicense: "10698755689787",
      email: "bockelboy@att.com",
      location: "Kent, Utah",
    },
    {
      key: "2",
      sno: "#12333",
      name: {
        avatar: "https://i.pravatar.cc/150?img=2",
        text: "dindiniya",
        phone: "08+ 123 456 789",
      },
      driverLicense: "10875428236852",
      email: "csilvers@verizon.com",
      location: "Great Falls, Maryland",
    },
    {
      key: "3",
      sno: "#12333",
      name: {
        avatar: "https://i.pravatar.cc/150?img=3",
        text: "dindiniya",
        phone: "08+ 123 456 789",
      },
      driverLicense: "10687542368975",
      email: "qamaho@mail.com",
      location: "Lansing, Illinois",
    },
  ];

  // Table Columns
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
      render: () => (
        <div style={{ display: "flex", gap: "10px" }}>
          <EyeOutlined style={{ fontSize: "16px", cursor: "pointer" }} />
          <StopOutlined style={{ fontSize: "16px", cursor: "pointer" }} />
        </div>
      ),
      width: "10%",
    },
  ];

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
            <span className="text-lg font-semibold">Terms & Condition</span>
          </h1>
          <Input
            placeholder="Search here..."
            style={{ width: 300, padding: "9px 5px 9px 5px" }}
          />
        </div>

        {/* Table */}
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          bordered
          style={{ backgroundColor: "#fff" }}
        />
      </div>
    </div>
  );
};

export default UserManagement;
