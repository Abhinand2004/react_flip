import React, { useState } from "react";
import "./createbio.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
const Createbio = () => {
    const Navigate=useNavigate()
    const {id}=useParams()
    const [formData, setFormData] = useState({
        photo: "",
        dob: "",
        bio: "",
        note: "",
        id:id
    });





    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({...prevData, [name]: value,  }));
    };

    const handleImageChange =async (e) => {
        const photo = await convertBase64(e.target.files[0])
       setFormData((pre)=>({...pre,photo}))
    };
    function convertBase64(file) {
        return new Promise((res,rej)=>{
          const fileReader=new FileReader()
          fileReader.readAsDataURL(file)
          fileReader.onload=()=>{
            res(fileReader.result)
          }
          fileReader.onerror=(error)=>{
            rej(error)
          }
        })
        
      }

    const handleSubmit = async(e) => {
        e.preventDefault();
        
try {
    const  res=await axios.post("http://localhost:3011/api/addprofile",formData)
    if (res.status==200) {

        alert(res.data.msg)
Navigate("/profile")
    }else{
        alert(res.data.msg)
    }

} catch (error) {
    alert ("user profile already exist")
}
    };










    return (
        <div className="createbio-container">
            <h1>Create Bio</h1>
            <form onSubmit={handleSubmit} className="createbio-form">
                {/* Image Display Area */}
                <div className="image-area">
                    <img src={formData.photo || "https://via.placeholder.com/150"}alt="Preview"className="image-preview"  />
                </div>
                {/* Image Selector */}
                <div className="form-group">
                    <label htmlFor="image">Select Image:</label>
                    <input  type="file"  id="image"   accept="image/*"   onChange={handleImageChange}   />
                </div>
                {/* Date of Birth */}
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth:</label>
                    <input  type="date"   id="dob"   name="dob"   value={formData.dob}   onChange={handleInputChange}  />
                </div>
                {/* Bio */}
                <div className="form-group">
                    <label htmlFor="bio">Bio:</label>
                    <textarea    id="bio"   name="bio"      rows="4"   value={formData.bio}   onChange={handleInputChange} ></textarea>
                </div>
                {/* Note */}
                <div className="form-group">
                    <label htmlFor="note">Note:</label>
                    <textarea     id="note"     name="note"  rows="2"  value={formData.note}  onChange={handleInputChange}   ></textarea>
                </div>
                {/* Submit Button */}
                <button type="submit" className="btn-submit">  Create Bio </button>
            </form>
        </div>
    );
};

export default Createbio;
