import React from "react";
import { Table, Button, Input } from "antd";
import { EyeOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export const Blog = () => {
  const navigate = useNavigate();
  // Sample Data
  const data = [
    {
      key: "1",
      serialNo: "01.",
      blogName: "Structured Cabling (Copper And Fiber)",
    },
  ];

  // Table Columns
  const columns = [
    {
      title: "Serial No.",
      dataIndex: "serialNo",
      key: "serialNo",
      width: "15%",
    },
    {
      title: "Blog Name",
      dataIndex: "blogName",
      key: "blogName",
      width: "70%",
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div>
          <EyeOutlined
            style={{ fontSize: "16px", marginRight: 16, cursor: "pointer" }}
          />
          <DeleteOutlined
            style={{ fontSize: "16px", color: "black", cursor: "pointer" }}
          />
        </div>
      ),
      width: "15%",
    },
  ];

  return (
    <div className="h-screen bg-white">
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
            <span className="text-lg font-semibold">Blog</span>
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Input
              placeholder="Search here..."
              style={{ width: 300, padding: "9px 5px 9px 5px" }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ backgroundColor: "#000", padding: "20px" }}
            >
              Add Blog
            </Button>
          </div>
        </div>
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
