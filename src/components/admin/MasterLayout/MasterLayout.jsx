import React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

import RoutersAdmin from "../../../routers/RoutersAdmin";

import "./masterlayout.scss";

const MasterLayout = () => {
  return (
    <div>
      <div className="master-layout">
        <Sidebar />
        <Navbar />
        <div className="master-layout__content">
          <RoutersAdmin />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;
