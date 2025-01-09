import React, { useState } from "react";
import { Input, Radio } from "antd";
import { BusinessPartner } from "./BusinessPartner";
import { TechPartner } from "./TechPartner";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export const PartnerManage = () => {
  const [selectedPartner, setSelectedPartner] = useState("business");
  const navigate = useNavigate();

  const handlePartnerChange = (e) => {
    setSelectedPartner(e.target.value);
  };

  return (
    <div className="h-screen p-4">
      {/* Header */}
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
        <Input placeholder="Search here..." style={{ width: 300 }} />
      </div>

      {/* Partner Selection */}
      <div style={{ marginBottom: "20px" }}>
        <Radio.Group
          value={selectedPartner}
          onChange={handlePartnerChange}
          buttonStyle="solid"
        >
          <Radio.Button value="business">Business Partner</Radio.Button>
          <Radio.Button value="tech">Tech Partner</Radio.Button>
        </Radio.Group>
      </div>

      {/* Content Area */}
      <div style={{ padding: "", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
        {selectedPartner === "business" && (
          <div>
            <BusinessPartner></BusinessPartner>
          </div>
        )}
        {selectedPartner === "tech" && (
          <div>
            <TechPartner></TechPartner>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerManage;
