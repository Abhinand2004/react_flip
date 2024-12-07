import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./homepage.css"
const HomePage = ({ setUser }) => {
    const navigate = useNavigate();
    const [usrdata, setData] = useState([]);

    const fetchUserData = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
        } else {
            try {
                const res = await axios.get("http://localhost:3011/api/display", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.status === 200) {
                    setUser(res.data.username);
                } else {
                    navigate("/login");
                }
            } catch (error) {
                alert("Your token is expired");
                localStorage.removeItem("token");
                navigate("/login");
            }
        }
    };

    const fetchAllData = async () => {
        try {
            const res = await axios.get("http://localhost:3011/api/homepage");
            if (res.status === 200) {
                setData(res.data.usr);
            } else {
                console.log("Error fetching data");
            }
        } catch (error) {
            console.log("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchAllData();
        fetchUserData();
    }, []);
console.log(usrdata);

    return (
        <div className="full_page">
            {usrdata.length > 0 ? (
                usrdata.map((data, index) => (
                  <Link to={`/postdetails/${index}`}>
                    <div className="cards" key={index}>
                        <div className="imagespace">
                            <img src={data.images[0]} alt="" />
                        </div>
                        <div className="descrip">
                            <h3>{data.description}</h3>

                        </div>
                    </div>
                  </Link>
                ))
            ) : (
                <p>No data available</p>
            )}
        </div>
    );
};

export default HomePage;
