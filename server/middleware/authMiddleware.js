import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  let token;

  if (
  req.headers.authorization &&
  req.headers.authorization.startsWith("Bearer")
){
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token,process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
        
    } catch (err) {
        return res.status(401).Json({message : "Not authorized ,token failed"});
    }
  }

  if(!token){
    return res.status(401).json({message:"Not authorized ,no token "});
  }

};

export const restrictTo = (role) =>{
    return (req , res, next) =>{
        if(req.user.role != role){
            return res.status(403).json({
                message:"access denied"
            });
        }
        next();
    }
};