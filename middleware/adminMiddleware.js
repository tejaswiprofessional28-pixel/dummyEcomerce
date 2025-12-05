

export const adminMiddleware = async(req, res, next)=>{
    if(req.user.role !== "admin"){
        return res.status(403).json({message: "access denied. Admin Only"})
    }
    next();
}