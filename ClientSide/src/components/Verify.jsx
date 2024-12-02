import React, { useState } from "react";
import "./verify.css";
import { Navigate, useNavigate } from "react-router-dom";
const Verify = () => {
  const [email, setEmail] = useState("");
const navigate=useNavigate()
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Email submitted for verification:", email);
  navigate("/register")
  };

  return (
    <div className="verify-container">
      <h1>Email Verification</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address:</label>
          <input  type="email"  name="email"  value={email}  onChange={handleChange}  required  placeholder="Enter your email" />
        </div>
        <button type="submit" className="btn-verify">  Verify </button>
      </form>
    </div>
  );
};

export default Verify;
