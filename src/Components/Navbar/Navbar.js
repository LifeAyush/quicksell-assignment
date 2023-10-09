import React from "react";
import "./navbar.css";
import DisplaySelector from "../DisplaySelector/DisplaySelector";

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <DisplaySelector />
    </nav>
  );
};

export default Navbar;
