import React, { useState } from "react";

export const ContactUs = () => {
  const [phoneNumbers, setPhoneNumbers] = useState([
    "+9999999999",
    "+9999999997",
  ]);
  const [emails, setEmails] = useState([
    "xxxxxx@gmail.com",
    "xxxxxx@gmail.com",
  ]);

  const handleAddPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, ""]);
  };

  const handleAddEmail = () => {
    setEmails([...emails, ""]);
  };

  const handleRemovePhoneNumber = (index) => {
    const updatedPhoneNumbers = phoneNumbers.filter((_, i) => i !== index);
    setPhoneNumbers(updatedPhoneNumbers);
  };

  const handleRemoveEmail = (index) => {
    const updatedEmails = emails.filter((_, i) => i !== index);
    setEmails(updatedEmails);
  };

  return (
    <div className="  mt-10 grid grid-cols-2 gap-6">
      {/* Call To Us Section */}
      <div className="bg-white p-6 py-11 rounded-lg shadow-md w-full">
        <div className="flex items-center space-x-2">
          <div className="text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10l4.293-4.293a1 1 0 011.414 1.414L16.414 11H13V8a1 1 0 012 0v4h5a1 1 0 010 2h-6a1 1 0 01-1-1V7a1 1 0 112 0v3z"
              />
            </svg>
          </div>
          <span className="font-semibold text-lg">Call To Us</span>
        </div>

        {phoneNumbers.map((phone, index) => (
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
            <button
              onClick={() => handleRemovePhoneNumber(index)}
              className="text-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}

        <button
          onClick={handleAddPhoneNumber}
          className="text-blue-600 mt-4 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="text-sm">+ Add Phone Number</span>
        </button>
      </div>

      {/* Write To Us Section */}
      <div className="bg-white p-6 py-11 rounded-lg shadow-md w-full">
        <div className="flex items-center space-x-2">
          <div className="text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 12V4a1 1 0 00-1-1H5a1 1 0 00-1 1v16a1 1 0 001 1h10a1 1 0 001-1V12l4 4-4 4V12z"
              />
            </svg>
          </div>
          <span className="font-semibold text-lg">Write To Us</span>
        </div>

        {emails.map((email, index) => (
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
            <button
              onClick={() => handleRemoveEmail(index)}
              className="text-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}

        <button
          onClick={handleAddEmail}
          className="text-blue-600 mt-4 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="text-sm">+ Add Email</span>
        </button>
      </div>
    </div>
  );
};
