import React, { useState } from "react";
import { usePostContactMutation } from "../redux/api/manageApi";
import { message } from "antd";

export const ContactUs = () => {
  const [postContact] = usePostContactMutation();
  const [phoneNumbers, setPhoneNumbers] = useState(["+9999999999", "+9999999997"]);
  const [emails, setEmails] = useState(["xxxxxx@gmail.com", "xxxxxx@gmail.com"]);

  const handleAddPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, ""]);
  };

  const handleAddEmail = () => {
    setEmails([...emails, ""]);
  };

  const handleRemovePhoneNumber = (index) => {
    setPhoneNumbers(phoneNumbers.filter((_, i) => i !== index));
  };

  const handleRemoveEmail = (index) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const data = {
      callToUs: phoneNumbers,
      writeToUs: emails,
    };
    
    try {
      const response = await postContact(data).unwrap();
      if (response.success) {
        message.success("Contact information submitted successfully");
      } else {
        message.error("Failed to submit contact information");
      }
    } catch (error) {
      message.error("An error occurred while submitting the form");
    }
  };

  return (
    <div>
      <div className="mt-10 grid grid-cols-2 gap-6">
        <div className="bg-white p-6 py-11 rounded-lg shadow-md w-full">
          <span className="font-semibold text-lg">Call To Us</span>
          {phoneNumbers?.map((phone, index) => (
            <div key={index} className="flex items-center space-x-4 mt-4">
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-md w-full"
                value={phone}
                onChange={(e) => {
                  const updatedPhoneNumbers = [...phoneNumbers];
                  updatedPhoneNumbers[index] = e.target.value;
                  setPhoneNumbers(updatedPhoneNumbers);
                }}
              />
              <button onClick={() => handleRemovePhoneNumber(index)} className="text-red-600">X</button>
            </div>
          ))}
          <button onClick={handleAddPhoneNumber} className="text-blue-600 mt-4">+ Add Phone Number</button>
        </div>
        
        <div className="bg-white p-6 py-11 rounded-lg shadow-md w-full">
          <span className="font-semibold text-lg">Write To Us</span>
          {emails?.map((email, index) => (
            <div key={index} className="flex items-center space-x-4 mt-4">
              <input
                type="email"
                className="border border-gray-300 p-2 rounded-md w-full"
                value={email}
                onChange={(e) => {
                  const updatedEmails = [...emails];
                  updatedEmails[index] = e.target.value;
                  setEmails(updatedEmails);
                }}
              />
              <button onClick={() => handleRemoveEmail(index)} className="text-red-600">X</button>
            </div>
          ))}
          <button onClick={handleAddEmail} className="text-blue-600 mt-4">+ Add Email</button>
        </div>
      </div>
      
      <div className="flex justify-center mt-11">
        <button onClick={handleSubmit} className="bg-black text-white p-3 px-11 rounded">Submit</button>
      </div>
    </div>
  );
};
