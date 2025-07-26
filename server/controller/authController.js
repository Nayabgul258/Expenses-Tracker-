import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //Already exits user
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User Already Exists}" });


    //new user Registration 
    const user = new User({ name, email, password, role });
    await user.save();

    const token = generateToken(user);
    res
      .status(201)
      .json({ token, user: { id: user._id, name: user.name,role: user.role } });
  } catch (err) {
    res.status(500).json({message:"Registration failed",error:err.message});
  }
};


//Login

export const login = async(req , res) => {
   try {
    const {email,password} = req.body;
   
    const user = await User.findOne({email});
    if(!user) 
        return res.status(400).json({message:"Invalid email or Password"});

    const isMatch = await user.comparePassword(password);
    if(!isMatch)
        return res.status(400).json({message:"User dit not register yet"});


    const token = generateToken(user);
    res.status(200).json({token,user:{
        id:user._id,
        name:user.name,
        role:user.role
    }});

   } catch (err) {
    res.status(500).json({message:"Login Failed",error:err.message});
   }
};

