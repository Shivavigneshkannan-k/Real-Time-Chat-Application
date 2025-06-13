import mongoose from "mongoose";
import validator from 'validator';
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

const User = mongoose.model(User,userSchema);
export default User;