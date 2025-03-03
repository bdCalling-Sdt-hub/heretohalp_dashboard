import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useGetServicesPricingQuery, useUpdateServicesMutation } from "../redux/api/manageApi";
import { message } from "antd";

export const ServicesPricing = () => {
  const navigate = useNavigate();
  const [serviceName, setServiceName] = useState("Structured_Cabling"); // Default service
  const { data: servicesPricing, isLoading, isError } = useGetServicesPricingQuery({
    serviceName,
  });
  const [updateServices] = useUpdateServicesMutation();

  const [pricingOptions, setPricingOptions] = useState([]);

  // Handle service change from dropdown
  const handleServiceChange = (e) => {
    setServiceName(e.target.value);
  };

  // Update pricing options when API data changes
  useEffect(() => {
    if (servicesPricing) {
      setPricingOptions(
        servicesPricing.data?.packages.map((item) => ({
          pricingOption: item.pricingOption,
          currentPrice: item.currentPrice,
          newPrice: item.newPrice || "", // Default to empty string if no new price
          newSubtitle: item.newSubtitle || "", // Default to empty string if no new subtitle
          _id: item._id,
        })) || []
      );
    }
  }, [servicesPricing]);

  // Handle input change for pricing options
  const handleInputChange = (index, field, value) => {
    const updatedPricingOptions = [...pricingOptions];
    updatedPricingOptions[index][field] = value;
    setPricingOptions(updatedPricingOptions);
  };

  // Handle add functionality for new row
  const handleAdd = () => {
    setPricingOptions([
      ...pricingOptions,
      {
        pricingOption: "",
        currentPrice: "",
        newPrice: "",
        newSubtitle: "",
        _id: Math.random().toString(36).substr(2, 9), // Generate random ID for new row
      },
    ]);
  };

  // Handle save functionality for each row
  const handleSave = (index) => {
    console.log("Saved:", pricingOptions[index]);
    // Add API call or other logic for saving the data
    // You can update the pricing options in the backend here
  };

  // Handle delete functionality for a row
  const handleDelete = (index) => {
    const updatedPricingOptions = pricingOptions.filter((_, i) => i !== index);
    setPricingOptions(updatedPricingOptions);
    console.log("Deleted:", index);
  };

  // Handle update functionality (finalize updates for all rows)
  const handleUpdate = () => {
    console.log("Updated pricing options:", pricingOptions);
    // Make the API call to update all pricing options
    const updatedData = {
      serviceName: serviceName, // Include the service name in the update data
      packages: pricingOptions.map((item) => ({
        pricingOption: item.pricingOption,
        currentPrice: item.currentPrice,
        newPrice: item.newPrice,
        newSubtitle: item.newSubtitle,
        
      })),
    };
    console.log(updatedData)

    // Call the update mutation to save all changes
    updateServices(updatedData)
      .unwrap()
      .then((response) => {
        message.success(response?.message)
        console.log("Update response:", response);
      })
      .catch((error) => {
        message.error(error?.data?.message)
        console.error("Update error:", error);
      });
  };

  return (
    <div className="h-screen">
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
          <span className="text-lg font-semibold">Manage Ticket</span>
        </h1>
      </div>

      <div>
        {/* Service Selection Dropdown */}
        <div className="mb-6">
          <label className="font-semibold text-lg">Service Name:</label>
          <select
            className="p-2 mt-2 border border-gray-300 rounded"
            value={serviceName}
            onChange={handleServiceChange}
          >
            
            <option value="Structured_Cabling">Structured Cabling</option>
            <option value="Optimized_IT_Packages">Optimized IT Packages for Every Business Phase</option>
            <option value="Rack_And_Device">Rack And Device Installation</option>
            <option value="Break_Fix_Services">Break/Fix Services</option>
            <option value="Network_Migrations">Network Migrations And Cutovers</option>
            <option value="Site_Surveys">Site Surveys</option>
            <option value="Consultations_On_Cutting-Edge">Consultations On Cutting-Edge Technologies</option>
            <option value="Deployment_Of_New">Deployment Of New Network Devices</option>
            <option value="Services_Bundles">Services Bundles And Maintenance</option>
            <option value="Pricing_Strategy">Pricing Strategy And Transparency</option>
          </select>
        </div>

        {/* Pricing Table */}
        <form>
          <div className="">
            <table className="w-full border-collapse  rounded-lg mt-4">
              <thead>
                <tr className="bg-[#B4AFAF] text-left ">
                  <th className="p-3 border">Pricing Option (Title)</th>
                  <th className="p-3 border">Current Price (Main Description)</th>
                  <th className="p-3 border">New Price (Main Description)</th>
                  <th className="p-3 border">New Subtitle (Below Title)</th>
                  <th className="p-3 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {pricingOptions.map((item, index) => (
                  <tr key={index} className="bg-[#C4C4C4]">
                    <td className="p-3 border">
                      <input
                        type="text"
                        value={item.pricingOption}
                        onChange={(e) =>
                          handleInputChange(index, "pricingOption", e.target.value)
                        }
                        className="w-full p-2 bg-transparent focus:outline-none focus:ring-0"
                      />
                    </td>
                    <td className="p-3 border">
                      <input
                        type="text"
                        value={item.currentPrice}
                        onChange={(e) =>
                          handleInputChange(index, "currentPrice", e.target.value)
                        }
                        className="w-full p-2 bg-transparent focus:outline-none focus:ring-0"
                      />
                    </td>
                    <td className="p-3 border">
                      <input
                        type="text"
                        value={item.newPrice}
                        onChange={(e) =>
                          handleInputChange(index, "newPrice", e.target.value)
                        }
                        className="w-full p-2 bg-transparent focus:outline-none focus:ring-0"
                        placeholder="Enter New Price..."
                      />
                    </td>
                    <td className="p-3 border">
                      <input
                        type="text"
                        value={item.newSubtitle}
                        onChange={(e) =>
                          handleInputChange(index, "newSubtitle", e.target.value)
                        }
                        className="w-full p-2 bg-transparent focus:outline-none focus:ring-0"
                        placeholder="Enter New Subtitle..."
                      />
                    </td>
                    <td className="p-3 border">
                     
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 w-full text-white px-3 py-1 rounded-lg"
                      >
                        ❌ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </form>

        <div className="flex justify-center gap-4 mt-9">
          <button
            onClick={handleAdd}
            className="bg-blue-700 p-2 w-[200px] text-white"
          >
            + Add
          </button>
          <button
            onClick={handleUpdate}
            className="bg-green-800 p-2 w-[200px] text-white"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
