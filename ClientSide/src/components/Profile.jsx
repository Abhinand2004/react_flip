import React, { useEffect, useState } from "react";
import "./profile.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const [profileexist, setprofileexist] = useState(false);
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);
    const [user, setUser] = useState({
        username: "",
        id: "",
        email: "",
        note: "",
        dob: "",
        bio: "",
        photo: "",
    });

    const getuserdata = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            try {
                const res = await axios.get("http://localhost:3011/api/display", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.status === 200) {
                    setUser(res.data);
                    setprofileexist(
                        res.data.bio || res.data.note || res.data.dob || res.data.photo
                    );
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

  

    const gotobio = () => {
        navigate(`/createbio/${user.id}`);
    };

    const editbio = () => {
        navigate(`/edit/${user.id}`);
    };
const deletedatas= async()=>{
try {
    const res = await axios.delete("http://localhost:3011/api/deleteuser", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
       
    });
    if (res.status===200) {
       console.log("success");
        
    }
    else{
        console.log("failed");
        
    }
} catch (error) {
    console.log("failded to fetch");
    
}
}
const addphoto=()=>{
    navigate("/addphoto")
}

const fetchPostdata= async()=>{
try {
    const res = await axios.get("http://localhost:3011/api/displayphotos", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (res.status===200) {
        console.log("success");
        // console.log(res.data);
        setPhotos(res.data.usr)
        
        
    }
} catch (error) {
    console.log("error while fetching");
    
}
}

useEffect(() => {
    getuserdata();
    fetchPostdata()
}, []);


console.log(photos);

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="profile-left">
                    <img  src={user.photo || "https://via.placeholder.com/150"}  alt="Profile" className="profile-image" />
                    <div className="profile-info">
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Date of Birth:</strong> {user.dob || "nill"}</p>
                        <p><strong>Bio:</strong> {user.bio || "nill"}</p>
                        <p><strong>Note:</strong> {user.note || "nill"}</p>
                    </div>
                    <div className="profile-buttons">
                        {profileexist ? (  <button className="btn btn-create" onClick={editbio}>  Edit Bio </button>
                        ) : (
                            <button className="btn btn-create" onClick={gotobio}>    Create Bio</button>
                        )}
                        <button className="btn btn-delete" onClick={deletedatas}>Delete</button>
                    </div>
                </div>
          
                <div className="profile-right">
                    <button onClick={addphoto}>addphoto</button>
                    <div className="imagedisplay">
                    {photos.map((i, index) => (
                            <div key={index} className="photo-container">
                                <Link to={`/details/${index}`}>
                                <img src={i.images[0]}  className="uploaded-image"  />
                                
                                </Link>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
