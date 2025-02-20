import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Upload, message } from "antd";
import { useAddTestimonialsMutation } from "../redux/api/manageApi";


export const AddTestimonial = () => {
  const [addBlog] = useAddTestimonialsMutation();
  const navigate = useNavigate();

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    if (!fileList.length) {
      message.error("Please upload an image.");
      return;
    }
  
    const formData = new FormData();
    formData.append("userName", values.userName);
    formData.append("address", values.address);
    formData.append("occupation", values.occupation);
    formData.append("review", values.review);
    formData.append("profile_image", fileList[0].originFileObj);
  
    try {
      const response = await addBlog(formData).unwrap();
      // Handle success
      console.log("fulfilled", response);
      message.success(response?.message);
    } catch (error) {
      // Handle failure
      console.error("rejected", error);
      message.error(error?.data?.message);
    }
  };
  
  return (
    <div className="p-5 bg-white shadow-md rounded-lg">
      <div className="flex justify-between mb-7">
        <h1 className="flex gap-4 items-center">
          <button className="text-[#EF4849]" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
          <span className="text-lg font-semibold">Add Testimonials</span>
        </h1>
      </div>

      {/* Ant Design Form */}
      <Form layout="vertical" onFinish={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <Form.Item
          name="userName"
          label="User Name"
          rules={[{ required: true, message: "Please input the user's name!" }]}
        >
          <Input
            placeholder="Enter name"
            className="border-gray-300 rounded-md p-3"
          />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please input the Address" }]}
        >
          <Input
            placeholder="Enter Address"
            className="border-gray-300 rounded-md p-3"
          />
        </Form.Item>

        <Form.Item
          name="occupation"
          label="Occupation"
          rules={[{ required: true, message: "Please input the occupation" }]}
        >
          <Input
            placeholder="Enter occupation"
            className="border-gray-300 rounded-md p-3"
          />
        </Form.Item>

        {/* Image Upload */}
        <Form.Item
          label="Image"
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            beforeUpload={() => false}
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </Form.Item>

        {/* Description */}
        <Form.Item
          name="review"
          label="Testimonial Review"
          rules={[{ required: true, message: "Please provide a Review" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Write the Review here..."
            className="border-gray-300 rounded-md p-3"
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <div className="flex justify-center">
            <Button
              type="primary"
              htmlType="submit"
              block
              className="bg-[#02111E] text-white py-3 px-7 rounded"
            >
              Save & Publish
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
