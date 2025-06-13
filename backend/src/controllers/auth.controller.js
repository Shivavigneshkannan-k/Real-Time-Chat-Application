import bcrypt from "bcrypt";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const register = async (req, res, next) => {
  const { username, emailId, password } = req.body;

  //hashing password
  const encryptedPassword = await bcrypt.hash(password,10);

  // existing user check
  const userData = await User.findOne({emailId});
  if (userData) {
    throw new ApiError("Email Id already exist!!!", 400);
  }
  //adding new user
  const newUser = await User.create({
    username,
    emailId:emailId,
    password:encryptedPassword
  })
  const user = newUser.toObject();
  delete user?.password;

  const jwtToken = await newUser.generateJWT;

  const response = new ApiResponse(
    "successfully signed up",
    user,
    201
  );
  res
    .status(201)
    .cookie("jwtToken", jwtToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "none",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8* 1000 // 8 hours
    })
    .json(response);
};

const logIn = async (req, res, next) => {
  const user = req?.user.toObject();
  delete user?.password;
  const user_id = user?._id
  const jwtToken = await jwt.sign({user_id},process.env.PRIVATE_KEY,{expiresIn:"1h"});
  console.log(jwtToken);
  const response = new ApiResponse("successfully logged in",user, 200);

  res
    .status(200)
    .cookie("jwtToken", jwtToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV == "production" ? "strict" : "none",
      secure: process.env.NODE_ENV == "production",
      maxAge: 60 * 60 * 8000
    })
    .json(response);
};

const logout = async (req, res, next) => {
  const response = new ApiResponse("successfully logged out",null, 200);
  res
    .status(200)
    .cookie("jwtToken", null, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV == "production" ? "strict" : "none",
      secure: process.env.NODE_ENV == "production",
      expires: new Date(Date.now())
    })
    .json(response);
};
export { logIn, logout, register };
