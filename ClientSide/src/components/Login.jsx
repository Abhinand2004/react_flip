import React, { useState } from "react";
import "./login.css";
import { data, Link, useNavigate } from "react-router-dom";
import axios, { CancelToken } from "axios";
import { Navigate } from "react-router-dom";
const Login = () => {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
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
    try {
      const res=await axios.post('http://localhost:3011/api/login',formData)
      

 
    if(res.status==201){  
      alert("you logined")
      console.log(res.data.token);
      localStorage.setItem('token',res.data.token)
      navigate("/")

        
    }
    else{
        // alert(res.data.error)
    }
    } catch (error) {
      console.log(error);
      
    }

  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email ID:</label>
          <input  type="email"  name="email"  value={formData.email}  onChange={handleChange}  required/>
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input  type="password"  name="pass"  value={formData.password}  onChange={handleChange}  required/>
        </div>
        <button type="submit" className="btn-login">Login</button>
        <div className="form-links">
          <Link to={'/verify'}className="forgot-password-link">Forgot Password?</Link>
          <Link to={'/verify'} className="signup-link">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
