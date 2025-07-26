import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import hashPassword from "../utils/hashPassword.js";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["employee", "admin"],
      default: "employee",
    },
  },
  { timestamps: true }
);

//HashPassword function 
UserSchema.pre("save",async function(next){
  if(!this.isModified("password"))
    return next();
   this.password = await hashPassword(this.password);
   next();
});

//Compare HashPassword 

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
}


const User = mongoose.model("User",UserSchema);

export default User;