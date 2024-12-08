import React, { useEffect, useState } from "react";
import "./details.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Detailspage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState(null); // Initialize as null
    const [imgs, setImgs] = useState([]); // Default to an empty array
    const [loading, setLoading] = useState(true); // Loading state

    const fetchPostdata = async () => {
        try {
            const res = await axios.get(`http://localhost:3011/api/photodetails/${id}`);
            if (res.status === 200) {
                setDetails(res.data.photo);
                setImgs(res.data.photo.images || []);
                // console.log(res.data.photo);
                
            }
        } catch (error) {
            console.error("Error while fetching post data:", error);
        } finally {
            setLoading(false);
        }
    };

    const deletePost = async () => {
        try {
            const res = await axios.delete(`http://localhost:3011/api/photodelete/${id}`);
            if (res.status === 200) {
                alert("Post deleted successfully!");
                navigate("/"); // Redirect to the home page
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete the post.");
        }
    };

    useEffect(() => {
        fetchPostdata();

    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!details) {
        return <div>Post not found or failed to load.</div>;
    }
console.log(imgs);

    return (
        <div className="details-container">
            {/* <h1 className="post-title">{details.title || "Untitled Post"}</h1> */}

            <div className="images-section">
                {imgs.length > 0 ? (
                    imgs.map((image, index) => (
                        <div key={index} className="image-container">
                            <img src={image} alt={`Post Image ${index + 1}`} className="post-image" />
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

            <button onClick={deletePost} className="delete-button">
                Delete Post
            </button>
        </div>
    );
};

export default Detailspage;
