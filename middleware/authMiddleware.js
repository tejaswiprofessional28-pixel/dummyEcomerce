import jwt from "jsonwebtoken";
import authModel from "../model/auth-model.js";

export const authMiddleware = async (req, res, next) =>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({message:"no token provided"})
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await authModel.findById(decoded.id).select("-password");
        if(!user){
            return res.status(404).json({message: "user not found"});
        }
        req.user = user;
        next();
    }catch(e){
        res.status(401).json({message:"invalid or expried token"})
    }
}
