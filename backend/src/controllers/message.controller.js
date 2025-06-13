import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

const sendMessage = async (req, res, next) => {
  const { toUserId, content } = req?.body || {};
  const photoPath = req?.file?.path;
  console.log(photoPath);
  const user_id = req?.user?._id;

  if (toUserId?.trim() === "") {
    throw new ApiError("To user should be specified", 400);
  } else if (toUserId === req?.user?._id) {
    throw new ApiError("Can't send message to yourself", 400);
  } else if (!photoPath && !content?.trim()) {
    throw new ApiError("Empty message", 400);
  }

  const toUser = await User.findById(toUserId);

  if (!toUser) {
    throw new ApiError("No user found, Message can't be send", 400);
  }
  let photoPublicId = "";
  let photoUrl = "";

  if (photoPath) {
    const imageData = await cloudinary.uploader.upload(photoPath, {
      folder: "Chat App"
    });
    photoPublicId = imageData?.public_id;
    photoUrl = imageData?.secure_url;
    fs.unlink(photoPath, (err) => {
      if (err) {
        next(new ApiError("Error in Deleting photo from temp"), 500);
      }
    });
  }

  const newMessage = await Message.create({
    fromUserId: user_id,
    toUserId,
    content,
    photoPublicId,
    photoUrl
  });

  const response = new ApiResponse("message added to db", newMessage, 201);
  res.status(201).json(response);
};
const getMessages = async (req, res, next) => {
  const user_id = req?.user?._id;

  const userMessages = await Message.find({
    $or: [{ fromUserId: user_id }, { toUserId: user_id }]
  });

  const response = new ApiResponse("All users messages", userMessages, 200);
  res.status(200).json(response);
};
export { sendMessage, getMessages };
