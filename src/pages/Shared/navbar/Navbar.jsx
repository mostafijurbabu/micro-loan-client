import React, { useEffect, useState } from "react";
import Logo from "../../../Components/logo/Logo";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/loans">All-Loans</NavLink>
      </li>
      <li>
        <NavLink to="">About Us</NavLink>
      </li>
      <li>
        <NavLink to="">Contact</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/dashboard/my-loans">My Loans</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div
      className=" navbar bg-base-100 sticky top-0 z-50
    px-2 sm:px-4 md:px-6 lg:px-10
    shadow-sm backdrop-blur"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </label>
          <ul
            tabIndex="-1"
            className=" menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow-lg z-50"
          >
            {links}
          </ul>
        </div>
        <div className="flex items-center">
          <span className="w-30 h-30">
            <Logo />
          </span>
          <h1 className="text-4xl text-blue-600 font-bold -ms-6">MICROLOAN</h1>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end gap-2">
        <button
          onClick={toggleTheme}
          className="btn btn-secondary btn-circle p-6"
          title="Theme Switch"
        >
          {theme === "light" ? "DARK" : "LIGHT"}
        </button>

        {/* Login / Logout */}
        {user ? (
          <a
            onClick={handleLogOut}
            className="btn btn-primary text-sm text-black sm:text-base md:text-lg font-bold"
          >
            Log Out
          </a>
        ) : (
          <Link
            className="btn btn-primary text-sm text-black sm:text-base md:text-lg font-bold"
            to="/login"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
