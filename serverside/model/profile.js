import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({
    photo: { type: String },  
    dob: { type: String },
    bio: { type: String },
    note: { type: String },
    name: { type: String },
    email: { type: String },
    id: { type: String }
});









export default mongoose.model.user_profile||mongoose.model('user_profile',profileSchema)