import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    emailId: {
      type: String,
      trim: true,
      lowercase: true, // converts to lowercase before saving
      unique: true,
      required: true,
      index: true,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate: (value) => {
        if (!validator.isStrongPassword) {
          throw new Error("Weak Password");
        }
      }
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      trim: true
    },
    photoUrl: {
      type: String,
      default: ""
    },
    photoPublicId: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

userSchema.methods.validatePassword = async function (inputPassword){
    const user = this;
    const passwordHash = user.password;
    const isSamePassword = await bcrypt.compare(inputPassword,passwordHash);
    return isSamePassword;
}

userSchema.method.generateJWT = async function(){
    const user = this;
    const user_id = user._id;
    const token = await jwt.sign({user_id},process.env.PRIVATE_KEY,{
        expiresIn: "1hr"
    });
    return token;
}

const User = mongoose.model("User", userSchema);
export default User;
