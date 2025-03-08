import React, { useState } from 'react';
import { Table, Input, Select, Modal, message, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useGetAllTicketQuery, useUpdateStatusMutation } from '../redux/api/blogApi';  // Import the correct query hook

export const ManageTicket = () => {
  const [searchTerm, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { data: ticketData, isLoading, isError, error } = useGetAllTicketQuery({searchTerm,  page: currentPage,
    limit: pageSize,});
  const [updateStatus] = useUpdateStatusMutation();
  const navigate = useNavigate();

  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [newStatus, setNewStatus] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const tickets = ticketData?.data?.result || [];

  const handleStatusChange = (ticketId, status) => {
    setSelectedTicketId(ticketId);
    setNewStatus(status);
    setModalVisible(true); // Show confirmation modal
  };

  const handleUpdateStatus = () => {
    if (selectedTicketId && newStatus) {
      // Call the update status mutation
      updateStatus({ ticketId: selectedTicketId, status: newStatus })
        .unwrap()
        .then((response) => {
          message.success(response?.message)
          console.log("Status updated:", response);
          setModalVisible(false); // Close modal after updating status
        })
        .catch((error) => {
          message.error(error?.data?.message)
          console.error("Error updating status:", error);
          setModalVisible(false); // Close modal in case of error
        });
    }
  };

  const handleCancel = () => {
    setModalVisible(false); // Close modal without updating the status
  };

  const columns = [
    {
      title: "S no.",
      dataIndex: "sno",
      key: "sno",
      width: "5%",
      render: (_, __, index) => index + 1, // This will show the serial number
    },
    {
      title: "Ticket ID",
      dataIndex: "uniqueId",
      key: "uniqueId",
      width: "10%",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
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
      dataIndex: "service",
      key: "service",
      width: "20%",
    },
    {
      title: "Issue Summary",
      dataIndex: "summary",
      key: "summary",
      width: "15%",
    },
    {
      title: "Details Description",
      dataIndex: "description",
      key: "description",
      width: "15%",
    },
    {
      title: "File Link",
      dataIndex: "document",
      key: "document",
      width: "15%",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer" className="text-blue-500">
          View Document
        </a>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      render: (status, record) => (
        <Select
          defaultValue={status}  // Set the default status from the data
          onChange={(newStatus) => handleStatusChange(record?._id, newStatus)}  // Handle status change
          style={{ width: '100%' }}
        >
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="ongoing">Ongoing</Select.Option>
          <Select.Option value="solved">Solved</Select.Option>
        </Select>
      ),
    },
  ];

  const handlePageChange = (page) => {
    console.log("Page Changed to:", page); // Debug to confirm `page` is received
    setCurrentPage(page);
  };

  console.log(ticketData?.data?.meta?.totalPage)
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
            <span className="text-lg font-semibold">Manage Ticket</span>
          </h1>
          <Input
          onChange={(e) => setSearch(e.target.value)}
            placeholder="Search here..."
            style={{ width: 300, padding: "9px 5px 9px 5px" }}
          />
        </div>

        {/* Table */}
        <Table
          dataSource={tickets}
          columns={columns}
          pagination={false}
          bordered
          style={{ backgroundColor: "#fff" }}
        />

<div className="mt-4 flex justify-end">
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={ticketData?.data?.meta?.totalPage || 0} // Updated to use meta.totalCount
                  onChange={handlePageChange}
                  showSizeChanger={false}
                />
              </div>

        {/* Confirmation Modal */}
        <Modal
          title="Are you sure?"
          visible={modalVisible}
          onOk={handleUpdateStatus}
          onCancel={handleCancel}
          okText="Yes"
          cancelText="No"
        >
          <p>Are you sure you want to change the status to "{newStatus}"?</p>
        </Modal>
      </div>
    </div>
  );
};
