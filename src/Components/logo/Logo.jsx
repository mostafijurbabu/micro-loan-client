import React from "react";
import loanImg from "../../assets/loanlogo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/">
      <img src={loanImg} alt="" />
    </Link>
  );
};

export default Logo;
