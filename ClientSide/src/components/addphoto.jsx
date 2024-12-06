import React, { useState } from "react";
import "./addphoto.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const Addphoto = () => {
    const navigate =useNavigate()
    const [formData, setFormData] = useState({
        images: [],
        description: "",
    });

    const handleImageChange = async (e) => {
        const files = Array.from(e.target.files); 
        const photoPromises = files.map((file) => convertToBase64(file)); 
        const photos = await Promise.all(photoPromises); 
        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...photos], 
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
       try {
    const  res=await axios.post("http://localhost:3011/api/postadd",formData,{
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
        if (res.status===200) {
            alert("data added successfully")
            
            navigate("/profile")
        }else{
            console.log(res.data.msg);
            alert("failed")
            
        }
       } catch (error) {
        // alert(error)
        alert("error fetching data")
       }
        


        

      
        console.log(formData);
    };
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        });
    };
  

    return (
        <div className="addphoto-container">
            <h1>Add Photos</h1>
            <form onSubmit={handleSubmit}>
                {/* Image Preview Section */}
                <div className="image-preview-container">
                    {formData.images.map((image, index) => (
                        <div key={index} className="image-preview">
                            <img src={image} alt={`Preview ${index + 1}`} />
                        </div>
                    ))}
                    {formData.images.length === 0 && <p>No images selected</p>}
                </div>

                {/* Multiple Image Selector */}
                <div className="form-group">
                    <label htmlFor="images">Select Images:</label>
                    <input
                        type="file"
                        id="images"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                    />
                </div>

                {/* Description Input */}
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        rows="4"
                        placeholder="Enter a description for the images"
                        value={formData.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                {/* Add Images Button */}
                <button type="submit" className="btn-add">
                    Add Images
                </button>
            </form>
        </div>
    );
};

export default Addphoto;
