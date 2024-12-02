import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
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
    const res=await fetch('http://localhost:3011/api/login',{
        method:"POST",
        headers:{"content-Type":'application/json'},
        body:JSON.stringify(formData)
    })
      

    const data=await res.json()
    if(res.status==201){  
        // localStorage.setItem('token',data.token)
        alert("you logined")
    }
    else{
        alert(data.error)
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
