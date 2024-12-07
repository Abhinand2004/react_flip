import React, { useEffect, useState } from "react";
import "./postdetails.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Postdetails = () => {
    const { id } = useParams();
    const [details, setDetails] = useState([]);
    const [imgs, setImgs] = useState([]);

    const fetchPostdata = async () => {
        try {
            const res = await axios.get("http://localhost:3011/api/displayphotos", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            if (res.status === 200) {
                setDetails(res.data.usr[id]);
                setImgs(res.data.usr[id].images || []); 
            }
        } catch (error) {
            console.log("Error while fetching");
        }
    };

    useEffect(() => {
        fetchPostdata();
    
    }, [id]);

   
    if (!details || !imgs) {
        return <div>Loading...</div>;
    }

    return (
        <div className="details-container">
            <div className="user-name">  
            </div>
            <div className="images-section">
                {imgs && imgs.length > 0 ? (
                    imgs.map((image, index) => (
                        <div key={index} className="image-container">
                            <img src={image}  className="post-image" />
                        </div>
                    ))
                ) : (
                    <p>No images available.</p>
                )}
            </div>

          
            <div className="description">
                <p>{details.description || "No description available."}</p>
            </div>

            
            <div className="post-details">
                <span className="post-date">Posted on: {details.postdate || "Unknown"}</span>
                <span className="post-time">At: {details.posttime || "Unknown"}</span>
            </div>
        </div>
    );
};

export default Postdetails;
