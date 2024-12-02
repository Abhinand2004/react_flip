import React, { useState } from "react";
import "./Register.css"; // Import the external CSS file
import "./register.css"
import { Navigate, useNavigate } from "react-router-dom";
const Register = () => {
    const navigate=useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    pwd: "",
    cpwd: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res=await fetch('http://localhost:3011/api/adduser',{
        method:"POST",
        headers:{"content-Type":'application/json'},
        body:JSON.stringify(formData)
    })
    
    const data=await res.json()
    if(res.status==201){
        alert(data.msg)
        navigate("/login")
    }
    else{
        alert(data.error)
    }

  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} method="post">
        <div className="form-group">
          <label>Username:</label>
          <input   type="text"   name="username"   value={formData.username}   onChange={handleChange}   required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required  />
        </div>
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
