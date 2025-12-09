import React from "react";
import Logo from "../Components/logo/Logo";
import { Outlet } from "react-router";
import authImage from "../assets/loanimg5.jpg";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center">
        <div className="w-30 h-30">
          <Logo></Logo>
        </div>
        <h1 className="text-4xl text-blue-600 font-bold -ms-6">MICROLOAN</h1>
      </div>
      <div className="flex">
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
        <div className="flex-1">
          <img className="w-110 h-110 rounded-full" src={authImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
