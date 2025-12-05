import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    userName:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true 
    },
    role:{
        type: String,
        enum : ["admin", "user"],
        default: "user"
    }
})

const authModel = mongoose.model("userInfo", authSchema);
export default authModel;

