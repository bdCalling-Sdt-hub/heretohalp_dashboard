import React, { useState } from "react";
import { FaArrowLeft, FaTrashAlt } from "react-icons/fa";
import { IoArrowUndoSharp } from "react-icons/io5";
import { Button, Form, Input, message, Modal } from "antd";
import { useDeleteFeedbackMutation, useGetFeedbackQuery, useUpdateFeedbackMutation } from "../redux/api/feedbackApi";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
const { TextArea } = Input;

const About = () => {
  // Sample data for display
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isSending, setIsSending] = useState(false); // Loading state for the button

  const navigate = useNavigate();

  const { data, isLoading, error } = useGetFeedbackQuery();
  console.log(data)
  const [updateFeedback] = useUpdateFeedbackMutation();
  const [deleteFeedback] = useDeleteFeedbackMutation();

  const feedbackData = data?.data?.feedback  || [];
  console.log(feedbackData)

  const openEditModal = (feedback) => {
    setSelectedFeedback(feedback);
    setReplyMessage(feedback.replyMessage || "");
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedFeedback(null);
    setReplyMessage("");
  };

  // const handleReplySubmit = async () => {
  //   const data = {
  //     id: selectedFeedback._id,  // Feedback ID
  //     reply: replyMessage,       // Reply message
  //   };
  
  //   console.log(data); // Log the data to ensure it's correct
  
  //   if (selectedFeedback) {
  //     setIsSending(true); // Set loading state to true
  
  //     try {
  //       // Send the data in the updateFeedback mutation
  //       const response = await updateFeedback({
  //         data,  // Send the data object as part of the request
  //       }).unwrap(); // unwrap to handle success or error response
  
  //       message.success(response?.message); // Show success message
  //       closeEditModal(); // Close the modal after successful reply
  //     } catch (error) {
  //       message.error(error?.data?.message || "Error updating reply"); // Show error message
  //     } finally {
  //       setIsSending(false); // Set loading state to false after request
  //     }
  //   }
  // };
  

  const handleDelete = (feedback) => {
    deleteFeedback(feedback._id)
      .unwrap()
      .then(() => {
        message.success("Feedback deleted successfully!");
      })
      .catch(() => {
        message.error("Error deleting feedback");
      });
  };

  if (isLoading) {
    return <div>loading............</div>;
  }

  if (error) {
    return <div>Error loading feedback data</div>;
  }


  return (
    <div>
     
    <div className="flex justify-between mb-7 mt-4">
      <h1 className="flex gap-4 text-[#2F799E]">
        <button className="" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <span className="text-lg font-semibold">User Management</span>
      </h1>
     
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Description</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">InquiryType </th>
            <th className="py-2 px-4 text-left">Phone Number</th>
            <th className="py-2 px-4 text-left">Time</th>
            {/* <th className="py-2 px-4 text-right">Status</th> */}
          </tr>
        </thead>
        <tbody>
          {feedbackData?.map((feedback) => (
            <tr key={feedback?._id} className="border-b">
              <td className="py-2 px-4">{feedback?.name}</td>
              <td className="py-2 px-4">{feedback?.feedback}</td>
              <td className="py-2 px-4">{feedback?.email}</td>
              <td className="py-2 px-4">{feedback?.inquiryType}</td>
              <td className="py-2 px-4">{feedback?.phoneNumber}</td>
              <td className="py-2 px-4">
                {new Date(feedback?.createdAt).toLocaleTimeString()}
              </td>
              {/* <td className="py-2 px-4 text-right">
                <span
                  onClick={() => openEditModal(feedback)}
                  className={`inline-block px-2 py-1 rounded cursor-pointer border ${
                    feedback.replyMessage
                      ? "border-[#7CC84E] text-[#7CC84E]"
                      : "border-[#2F799E] text-[#2F799E]"
                  }`}
                >
                  <span className="flex">
                    <IoArrowUndoSharp className="text-xl mt-[2px] mr-2" />
                    {feedback.replyMessage ? "Replied" : "Pending"}
                  </span>
                </span>
                <button
                  onClick={() => handleDelete(feedback)}
                  className="text-[#6A6D7C] ml-4"
                >
                  <FaTrashAlt />
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* <Modal centered open={isEditModalOpen} footer={null} onCancel={closeEditModal}>
      <p className="text-center font-semibold pb-5 text-xl">Feedback</p>
      <Form>
        <label htmlFor="">Description : </label>
        <Form.Item>
          <Input
            className="mt-2"
            placeholder="Type question here..."
            value={selectedFeedback?.feedback || ""}
            disabled
          />
        </Form.Item>
        <label className="mb-2" htmlFor="">
          Reply :
        </label>
        <Form.Item>
          <TextArea
            className="mt-2"
            rows={4}
            placeholder="Type reply here..."
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
          />
        </Form.Item>
        <div className="flex items-center justify-center mt-2">
          <Button
            type="primary"
            className="w-full"
            onClick={handleReplySubmit}
            loading={isSending}
            style={{ background: "black", borderColor: "#2F799E" }} // Ant Design loading state
          >
            Send
          </Button>
        </div>
      </Form>
    </Modal> */}
  </div>
  );
};

export default About;
