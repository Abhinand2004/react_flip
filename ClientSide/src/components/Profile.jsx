import React, { useEffect, useState } from "react";
import "./profile.css";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Createbio from "./createbio";
const Profile = () => {
    const [profileexist,setprofileexist]=useState(false)
    const navigate=useNavigate()
    const [user,setUser]=useState({
        username:"",
        id:"",
        email:"",
        note:"",
        dob:"",
        bio:"",
        photo:""
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
                if (res.status == 200) {   setUser(res.data) ;setprofileexist(res.data.bio || res.data.note || res.data.dob ||
                    
                     res.data.photo) } 
                else {    navigate("/login")    }
            } catch (error) {
                alert("your token is expired")
                localStorage.removeItem("token")
                navigate("/login")
            }
        }
        console.log(profileexist);
        
    }
    useEffect(()=>{
        getuserdata()
    },[])
    const gotobio=()=>{
        navigate(`/createbio/${user.id}`)
    }   
    const editbio=()=>{
        navigate(`/edit/${user.id}`)
    }
    
    return (
        <div className="profile-container">
            <div className="profile-card">
                {/* Left Side */}
                <div className="profile-left">
                    <img
                        src={user.photo || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="profile-image"
                    />
                    <div className="profile-info">
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Date of Birth:</strong> {user.dob || "nill"}</p>
                        <p><strong>Bio:</strong> {user.bio || "nill"}</p>
                        <p><strong>Note:</strong> {user.note || "nill"}</p>
                    </div>
                    <div className="profile-buttons">
                        {profileexist ? <button className="btn btn-create" onClick={editbio}>  Edit bio</button>: <button className="btn btn-create" onClick={Createbio}> create_bio </button>}
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
