import React, { useState } from "react";

import "./register.css"
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";


const Register = () => {
  const navigate=useNavigate()
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    pwd: "",
    cpwd: "",
  });
  formData.email=localStorage.getItem("email")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,[name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(formData);
    try {
       const res=await axios.post('http://localhost:3011/api/adduser',formData)
       console.log(res);
       if (res.status==201) {
        alert(res.data.msg)
        navigate("/login")
       }
      
     } catch (error) {
      alert(res.data.error)
     }
  
   

  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} >
        <div className="form-group">
          <label>Username:</label>
          <input   type="text"   name="username"   value={formData.username}   onChange={handleChange}   required />
        </div>
        {/* <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required  />
        </div> */}
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="pwd" value={formData.password} onChange={handleChange} required  />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input type="password" name="cpwd" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn-submit">  Create Account</button>
      </form>
    </div>
  );
};

export default Register;
