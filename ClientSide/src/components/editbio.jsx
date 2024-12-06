import React, { useState, useEffect } from "react";
import "./editbio.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditBio = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        username: "",
        id: "",
        email: "",
        note: "",
        dob: "",
        bio: "",
        photo: ""
    });

    const [formData, setFormData] = useState({
        photo: "",
        dob: "",
        bio: "",
        note: ""
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const asd = await axios.get(`http://localhost:3011/api/display`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (asd.status === 200) {
                    setUser(asd.data);
                } else {
                    alert("Error while fetching user data");
                }
            } catch (error) {
                alert("Error while fetching user data:", error);
            }
        };

        fetchUser();
    }, [id]);

    const handleImageChange = async (e) => {
        const photo = await convertBase64(e.target.files[0]);
        setFormData((prev) => ({ ...prev, photo }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:3011/api/update/${id}`, formData);
            if (res.status === 200) {
                alert("Success");
            } else {
                alert("Error");
            }
        } catch (error) {
            alert("Error while updating:", error);
        }
    };

    console.log(user);

    return (
        <div className="createbio-container">
            <h1>Create Bio</h1>
            <form onSubmit={handleSubmit} className="createbio-form">
                {/* Image Display Area */}
                <div className="image-area">
                    <img src={user.photo || "https://via.placeholder.com/150"} alt="Preview" className="image-preview" />
                </div>
                {/* Image Selector */}
                <div className="form-group">
                    <label htmlFor="image">Select Image:</label>
                    <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
                </div>
                {/* Date of Birth */}
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth:</label>
                    <input type="date" id="dob" name="dob" value={user.dob} onChange={handleInputChange} />
                </div>
                {/* Bio */}
                <div className="form-group">
                    <label htmlFor="bio">Bio:</label>
                    <textarea id="bio" name="bio" rows="4" value={user.bio} onChange={handleInputChange}></textarea>
                </div>
                {/* Note */}
                <div className="form-group">
                    <label htmlFor="note">Note:</label>
                    <textarea id="note" name="note" rows="2" value={user.note} onChange={handleInputChange}></textarea>
                </div>

                <button type="submit" className="btn-submit">Edit Bio</button>
            </form>
        </div>
    );
};

export default EditBio;
