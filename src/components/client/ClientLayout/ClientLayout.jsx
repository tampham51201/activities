import React from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import RoutersClient from "../../../routers/RoutersClient";

const ClientLayout = () => {
  return (
    <div>
      <Header />
      <RoutersClient style={{ minHeight: "100vh" }} />
      <Footer />
    </div>
  );
};

export default ClientLayout;
