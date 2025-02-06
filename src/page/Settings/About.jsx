import React from "react";
import { FaArrowLeft, FaTrashAlt } from "react-icons/fa";
import { IoArrowUndoSharp } from "react-icons/io5";
import { Input } from "antd";

const { TextArea } = Input;

const About = () => {
  // Sample data for display
  const feedbackData = [
    {
      _id: "1",
      name: "John Doe",
      description: "Feedback description 1",
      createdAt: "2025-01-01T12:00:00Z",
      replyMessage: "Replied to feedback",
    },
    {
      _id: "2",
      name: "Jane Smith",
      description: "Feedback description 2",
      createdAt: "2025-01-02T15:30:00Z",
      replyMessage: "",
    },
  ];

  return (
    <div className="mx-auto h-screen">
      <div>
        <div className="flex justify-between mb-7 mt-4">
          <h1 className="flex gap-4 text-[#2F799E]">
            <button className="-mt-[20px]">
              <FaArrowLeft />
            </button>
            <span className="text-lg font-semibold">Feedback</span>
          </h1>
          <Input
            placeholder="Search here..."
            style={{ marginBottom: "16px", maxWidth: "300px" }}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Time</th>
                <th className="py-2 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {feedbackData.map((feedback) => (
                <tr key={feedback._id} className="border-b">
                  <td className="py-2 px-4">{feedback.name}</td>
                  <td className="py-2 px-4">{feedback.description}</td>
                  <td className="py-2 px-4">
                    {new Date(feedback.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="py-2 px-4 text-right">
                    <span
                      className={`inline-block px-2 py-1 rounded border ${{
                        true: "border-[#7CC84E] text-[#7CC84E]",
                        false: "border-[#2F799E] text-[#2F799E]",
                      }[!!feedback.replyMessage]}`}
                    >
                      <span className="flex">
                        <IoArrowUndoSharp className="text-xl mt-[2px] mr-2" />
                        {feedback.replyMessage ? "Replied" : "Pending"}
                      </span>
                    </span>
                    <button className="text-[#6A6D7C] ml-4">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default About;
