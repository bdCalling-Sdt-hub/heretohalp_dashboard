import React, { useState } from "react";
import { Table, Button, Input, Modal,message } from "antd";
import { EyeOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useGetAllBlogQuery } from "../redux/api/blogApi";
import { imageUrl } from "../redux/api/baseApi";
import { useDeleteBlogMutation } from "../redux/api/blogApi";

export const Blog = () => {
  const [searchTerm, setSearch] = useState("");
  const [deleteBlog] = useDeleteBlogMutation()
  const { data: blogData } = useGetAllBlogQuery({searchTerm});
  
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  console.log(selectedBlog)

  const handleViewClick = (record) => {
    setSelectedBlog(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedBlog(null);
  };

  const data = blogData?.data?.result?.map((blog, index) => ({
    key: blog._id,
    serialNo: `${index + 1}.`,
    image: <img src={`${imageUrl}/${blog.blog_image}`} alt="Blog" style={{ width: 50, height: 50 }} />,
    blogName: blog.title,
    content: blog.content,
  })) || [];

  const handleDelete = (record) => {
    // Confirmation popup before deletion
    Modal.confirm({
      title: "Are you sure you want to delete this blog?",
      content: "Once deleted, this action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const response = await deleteBlog(record.key); 
          console.log(response.data.message) // Assuming deleteBlog is an async function
          if (response.data.success) {
            message.success(response.data.message);
          } else {
            message.error(error.data.message);
          }
        } catch (error) {
          console.error(error);
          message.error("An error occurred while deleting the blog.");
        }
      },
      onCancel: () => {
        console.log("Delete action canceled");
      },
    });
  };
  const columns = [
    {
      title: "Serial No.",
      dataIndex: "serialNo",
      key: "serialNo",
      width: "15%",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: "15%",
    },
    {
      title: "Blog Name",
      dataIndex: "blogName",
      key: "blogName",
      width: "50%",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <EyeOutlined
            style={{ fontSize: "16px", marginRight: 16, cursor: "pointer" }}
            onClick={() => handleViewClick(record)}
          />
          <DeleteOutlined
          onClick={() => handleDelete(record)}
            style={{ fontSize: "16px", color: "black", cursor: "pointer" }}
          />
        </div>
      ),
      width: "20%",
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
          <h1 onClick={() => navigate(-1)} className="flex gap-4 cursor-pointer">
            <button className="text-[#EF4849]">
              <FaArrowLeft />
            </button>
            <span className="text-lg font-semibold">Blog</span>
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Input
            onChange={(e) => setSearch(e.target.value)}
              placeholder="Search here..."
              style={{ width: 300, padding: "9px 5px 9px 5px" }}
            />
            <Link to={'/dashboard/blog/add-blog'}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ backgroundColor: "#000", padding: "20px" }}
              >
                Add Blog
              </Button>
            </Link>
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

      <Modal
        title="Blog Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {selectedBlog && (
          <div>
            <img
              src={selectedBlog.image.props.src}
              alt="Blog"
              style={{ width: "100%", marginBottom: "20px" }}
            />
            <h2>{selectedBlog.blogName}</h2>
            <p>{selectedBlog.content}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};
