import { Modal, Form, Input } from "antd";
import { useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

const FAQ = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [currentFAQ, setCurrentFAQ] = useState(null);

  const [form] = Form.useForm();

  const faq = [
    {
      id: 1,
      question: "What is an affiliate e-commerce website?",
      answer: "It is a website where affiliates earn commissions by promoting products from other companies.",
    },
    {
      id: 2,
      question: "How does affiliate marketing work?",
      answer: "Affiliates promote products using a unique link and earn a commission on sales made through that link.",
    },
    {
      id: 3,
      question: "What are the benefits of affiliate marketing?",
      answer: "Affiliate marketing provides a passive income stream, flexibility, and low startup costs.",
    },
  ];

  const handleAddFAQ = () => {
    form.validateFields().then((values) => {
      console.log("New FAQ Added:", values);
      form.resetFields();
      setOpen(false);
    });
  };

  const handleUpdateFAQ = () => {
    form.validateFields().then((values) => {
      console.log("FAQ Updated:", values);
      form.resetFields();
      setEditOpen(false);
    });
  };

  const openEditModal = (faqItem) => {
    setCurrentFAQ(faqItem);
    form.setFieldsValue(faqItem);
    setEditOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setEditOpen(false);
    setCurrentFAQ(null);
    form.resetFields();
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          onClick={() => setOpen(true)}
          className="bg-[#02111E] py-2 px-3 rounded text-white"
        >
          + Add FAQ
        </button>
      </div>

      <div className="mt-20">
        {faq.map((item) => (
          <div key={item.id} className="mt-6  flex">
            <div className="w-[98%]">
              <div className="bg-[#272121] p-1 rounded-md text-white flex justify-between">
                <div>Q: {item.question}</div>
                <button
                  onClick={() => openEditModal(item)}
                  className="text-[#555555] text-2xl pr-4"
                >
                  <RiEdit2Fill />
                </button>
              </div>
              <div className="mt-3 bg-[#BCBABA26] p-3 rounded-md shadow col-span-1">
                {item.answer}
              </div>
            </div>
            <div
              className="text-2xl mt-1 w-[2%] cursor-pointer"
              onClick={() => console.log(`FAQ Deleted: ${item.id}`)}
            >
              <RxCross2 />
            </div>
          </div>
        ))}
      </div>

      {/* Add FAQ Modal */}
      <Modal
        centered
        open={open}
        onCancel={closeModal}
        footer={null}
        width={500}
      >
        <h1 className="text-xl mb-2">+ Add FAQ</h1>
        <Form form={form} layout="vertical">
          <Form.Item
            name="question"
            label="Question"
            rules={[{ required: true, message: "Please enter a question" }]}
          >
            <Input placeholder="Enter question here..." />
          </Form.Item>
          <Form.Item
            name="answer"
            label="Answer"
            rules={[{ required: true, message: "Please enter an answer" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter answer here..." />
          </Form.Item>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleAddFAQ}
              className="bg-[#02111E] rounded py-2 px-4 text-white"
            >
              Publish
            </button>
          </div>
        </Form>
      </Modal>

      {/* Edit FAQ Modal */}
      <Modal
        centered
        open={editOpen}
        onCancel={closeModal}
        footer={null}
        width={500}
      >
        <h1 className="text-xl mb-2">Edit FAQ</h1>
        <Form form={form} layout="vertical">
          <Form.Item
            name="question"
            label="Question"
            rules={[{ required: true, message: "Please enter a question" }]}
          >
            <Input placeholder="Enter question here..." />
          </Form.Item>
          <Form.Item
            name="answer"
            label="Answer"
            rules={[{ required: true, message: "Please enter an answer" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter answer here..." />
          </Form.Item>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleUpdateFAQ}
              className="bg-[#02111E] rounded py-2 px-4 text-white"
            >
              Update
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default FAQ;
