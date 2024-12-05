import React, { useEffect, useState } from "react";
import "./profile.css";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
const Profile = () => {
    const navigate=useNavigate()
    const [user,setUser]=useState({
        username:"",
        id:"",
        email:""
    })
    
    const getuserdata=async()=>{
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login")
        } else {
            try {
                const res = await axios.get("http://localhost:3011/api/display", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.status == 200) {   setUser(res.data)  } 
                else {    navigate("/login")    }
            } catch (error) {
                alert("your token is expired")
                localStorage.removeItem("token")
                navigate("/login")
            }
        }
        console.log(token);
        
    }
    useEffect(()=>{
        getuserdata()
    },[])
    const gotobio=()=>{
        navigate(`/createbio/${user.id}`)
    }   
    
    return (
        <div className="profile-container">
            <div className="profile-card">
                {/* Left Side */}
                <div className="profile-left">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                        className="profile-image"
                    />
                    <div className="profile-info">
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Date of Birth:</strong> 1990-01-01</p>
                        <p><strong>Bio:</strong> A passionate developer with expertise in MERN stack.</p>
                        <p><strong>Note:</strong> Work hard, dream big!</p>
                    </div>
                    <div className="profile-buttons">
                        <button className="btn btn-create" onClick={gotobio}>Create Bio</button>
                        <button className="btn btn-delete">Delete</button>
                    </div>
                </div>
                {/* Right Side */}
                <div className="profile-right"></div>
            </div>
        </div>
    );
};

export default Profile;
