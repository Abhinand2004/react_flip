import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
    const [userData, setUserData] = useState({ username: "", email: "" });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token"); 
                const { data } = await axios.get("http://localhost:3011/api/display", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            <h1>HomePage</h1>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
        </div>
    );
};

export default HomePage;
