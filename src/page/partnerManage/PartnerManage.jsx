import React, { useState } from "react";
import { Input, Radio } from "antd";
import { BusinessPartner } from "./BusinessPartner";
import { TechPartner } from "./TechPartner";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export const PartnerManage = () => {



  return (
    <div className="h-screen p-4">
      {/* Header */}
      

      {/* Partner Selection */}
      

      {/* Content Area */}
      <div style={{ padding: "", backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
      
          <div>
            <BusinessPartner></BusinessPartner>
          </div>
      </div>
    </div>
  );
};

export default PartnerManage;
