import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const HomePage = ({setUser}) => {
    // const [userData, setUserData] = useState({ username: "", email: "" });
const navigate=useNavigate()
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
               navigate("/login") 
            } else{
            try {
                const  res  = await axios.get("http://localhost:3011/api/display", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.status==200) {
                    
                    setUser(res.data.username)
                }else{
                    navigate("/login")
                }
                // setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }}
        };

        fetchUserData();
    }, []);

    return (
        <div>
            <h1>HomePage</h1>
            <p>Username:</p>
            <p>Email:</p>
        </div>
    );
};

export default HomePage;
