import  jwt from "jsonwebtoken";

const generateToken = (user) =>{
    return jwt.sign({
        id:user._id,
        role:user.role
    },
    process.env.JWT_SECRET,
    {expiresIn:"10d"}

    );
};

export default generateToken;