import React, { useEffect, useState } from "react";
import "./nav.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=menu" />
const Nav = ({ user }) => {
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (value === "logout") {
      localStorage.removeItem("token")
      location.reload()
      navigate("/login");

    } else if (value === "profile") {
      navigate("/profile");
    }
  };

  return (
    <div className="navbar">
      <div className="logodiv"> <h1>logo</h1> </div>
      <div className="rightside">   <h3>{user}</h3>
        <div style={{ height: "50px", width: "50px", backgroundColor: "white", borderRadius: "50%" }}></div>
        <select name="userActions" id="userActions" onChange={handleSelectChange}   >
          <option value="">☰</option>
          <option value="logout">Logout</option>
          <option value="profile">Profile</option>
        </select>
      </div>
    </div>
  );
};

export default Nav;
