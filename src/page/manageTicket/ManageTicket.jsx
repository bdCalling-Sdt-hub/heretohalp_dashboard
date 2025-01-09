import React from 'react'
import { Table, Input, Avatar, Select } from "antd";
import { EyeOutlined, StopOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
export const ManageTicket = () => {


    const options = [
        {
          label: 'gold',
          value: 'gold',
        },
        {
          label: 'lime',
          value: 'lime',
        },
        {
          label: 'green',
          value: 'green',
        },
        {
          label: 'cyan',
          value: 'cyan',
        },
      ];


    const navigate = useNavigate();
    // Sample Data
    const data = [
      {
        key: "1",
        sno: "#12333",
        ticket:'324234324',
        name: 'foisal',
        priority: "10698755689787",
        email: "bockelboy@att.com",
        category:'namealksdjfsdhf',
        issueSummary: "Kent, Utah,adf",
        detailsDescription:'askjdhfkajwhryfeiuwriuwe',
        fileLink:'asdfdsfasd'
      },
      {
        key: "2",
        sno: "#12333",
        ticket:'324234324',
        name: 'foisal',
        priority: "10875428236852",
        email: "csilvers@verizon.com",
        category:'namealksdjfsdhf',
        issueSummary: "Great Falls, Maryland",
        detailsDescription:'askjdhfkajwhryfeiuwriuwe',
        fileLink:'asdfdsfasd'
      },
      {
        key: "3",
        sno: "#12333",
        ticket:'324234324',
        name: 'foisal',
        priority: "10687542368975",
        email: "qamaho@mail.com",
        category:'namealksdjfsdhf',
        issueSummary: "Lansing, Illinois",
        detailsDescription:'askjdhfkajwhryfeiuwriuwe',
        fileLink:'asdfdsfasd'
      },
    ];
  
    // Table Columns
    const columns = [
      {
        title: "S no.",
        dataIndex: "sno",
        key: "sno",
        width: "5%",
      },
      {
        title: "Ticket ID",
        dataIndex: "ticket",
        key: "ticket",
        width: "10%",
      },
      
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "10%",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: "20%",
      },
      {
        title: "Priority",
        dataIndex: "priority",
        key: "priority",
        width: "10%",
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        width: "20%",
      },
      {
        title: "Issue Summary",
        dataIndex: "issueSummary",
        key: "issueSummary",
        width: "15%",
      },
      {
        title: "Details Description",
        dataIndex: "detailsDescription",
        key: "detailsDescription",
        width: "15%",
      },
      {
        title: "File Link",
        dataIndex: "fileLink",
        key: "fileLink",
        width: "15%",
      },
      {
        title: "Status",
        key: "status",
        render: () => (
          <div style={{ display: "flex", gap: "10px" }}>
            <Select
    
    defaultValue="1"
    style={{
      width: '100%',
    }}
    options={options}
  />
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
            <span className="text-lg font-semibold">Manage ticket</span>
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
  )
}
