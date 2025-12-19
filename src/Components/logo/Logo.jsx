import React from "react";
import loanImg from "../../assets/loanlogo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <img className="w-30 h-30" src={loanImg} alt="" />
    </Link>
  );
};

export default Logo;
