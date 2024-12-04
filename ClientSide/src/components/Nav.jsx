import React, { useEffect, useState } from "react";
import "./nav.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=menu" />
const Nav = () => {
  const navigate = useNavigate();
const [userdata,setUserdata]=useState({username:""})
useEffect(()=>{
  const getuser=async()=>{
  try {
    const {data}=await axios.get("http://localhost:3011/api/display",{
      headers:{Authorization: `Bearer ${localStorage.getItem("token")}`},
    });
    setUserdata(data)
  } catch (error) {
    console.log(error);
    
  }
  }
  getuser()
},[])
  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (value === "logout") {
      navigate("/login");
    } else if (value === "profile") {
      navigate("/profile");
    }
  };

  return (
    <div className="navbar">
      <div className="logodiv"> <h1>logo</h1> </div>
      <div className="rightside">   <h3>{userdata.username}</h3>
      <div style={{height:"50px",width:"50px",backgroundColor:"white",borderRadius:"50%"}}></div>
        <select   name="userActions"   id="userActions"  onChange={handleSelectChange}   >
          <option value="">☰</option>
          <option value="logout">Logout</option>
          <option value="profile">Profile</option>
        </select>
      </div>
    </div>
  );
};

export default Nav;
