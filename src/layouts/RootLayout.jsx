import React from "react";
import { Outlet } from "react-router";
import Footer from "../pages/Shared/footer/Footer";
import Navbar from "../pages/Shared/navbar/Navbar";

const RootLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;
