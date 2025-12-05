import authModel from "../model/auth-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";



export const userRegister = async(req, res)=>{
    try{
        const {userName, email, password} = req.body;
        const userExist = await authModel.findOne({email});
        if(userExist){
            return res.json({message: " user already exists"});
        }
        const hashed =await bcrypt.hash(password,10);
        const userRes = new authModel({userName, email, password:hashed});
        await userRes.save();
        res.json("user Register Successfully");
        
    }catch(error){
        res.status(500).json(error.message);
    }
}

export const userLogin = async(req, res)=>{
    const {email, password} = req.body;
    try{
        
        const user = await authModel.findOne({email});
        if(!user){
            return res.json({message: " user not exits please register"});
        }

        const matchPassword = await bcrypt.compare(password, user.password);
        
        if(!matchPassword){
          
            return res.json({message: " invalid credentails"});
        }
         
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn:"5hr"});
        res.json({message:"Login successful", token, user});
    }
    catch(error){
        res.status(500).json(error.message);
    }
}


export const getUser = async(req, res)=>{
    try{
        res.json({message:"User fetched successfully", user: req.user});
    }catch(error){
        res.status(500).json(error.message);
    }
}

