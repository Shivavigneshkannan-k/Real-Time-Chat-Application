import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";
const loggedInUserProfile = async (req, res, next) => {
  try {
    const user = req?.user?.toObject();
    delete user?.password;
    const response = new ApiResponse("loggedIn user profile", user, 200);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
const getAllUsers = async (req, res, next) => {
  const users = await User.find().select("-password");
  const response = new ApiResponse("All user profile", users, 200);
  res.status(200).json(response);
};

const updateProfilePhoto = async (req, res, next) => {
  const filePath = req?.file?.path;
  const user_id = req?.user?._id;
  const user = req?.user;
  if (!filePath) {
    throw new ApiError("FilePath is undefined", 500);
  }
  const image = await cloudinary.uploader.upload(filePath, {
    folder: "Chat App"
  });
  fs.unlink(filePath, (err) => {
    if (err) {
      next(new ApiError("Error in unlinking the file", 400));
    }
  });
  console.log(user);
  if(user?.photoPublicId){
    // destory the old image using its public_id and reduce duplicates
    await cloudinary.uploader.destroy(user?.photoPublicId);
  }
  const updatedUser = await User.findByIdAndUpdate(user_id, {
    photoUrl: image?.secure_url,
    photoPublicId: image?.public_id
  },
  { new:true });// new: true -> will give the updated user profile instead of old one
  const response = new ApiResponse("profile photo is updated",updatedUser,201);
  res.status(201).json(response);
};
export { loggedInUserProfile, getAllUsers, updateProfilePhoto };
