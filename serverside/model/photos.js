import mongoose from "mongoose";
const photoSchema = new mongoose.Schema({
    description: { type: String },  
    images:{type:Array},
    postdate:{type:Date},
    posttime:{type:String},
    id:{type:String}
});









export default mongoose.model.photos||mongoose.model('photos',photoSchema)