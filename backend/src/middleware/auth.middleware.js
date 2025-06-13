import validator from 'validator';
import ApiError from '../utils/ApiError.js';
import bcrypt from "bcrypt"
import User from '../models/user.model.js';

const validateSignUp = (req,res,next)=>{
    try{
        const {username,emailId,password} = req.body || {};
    
        if([username,emailId,password].some(field => !field || field.trim()==="")){
            throw new ApiError("All Fields are Required !!!",400);
        }
        else if(!validator.isEmail(emailId)){
            throw new ApiError("Invalid Email Address",400);
        }
        else if(!validator.isStrongPassword(password)){
            throw new ApiError("Weak password",400);
        }
        next();
    }
    catch(err){
        next(err);
    }
}

const validateLogin = async (req, res, next) => {
  try {
    const emailId = req?.body?.emailId?.toLowerCase();
    const password = req?.body?.password;
    
    if (!validator.isEmail(emailId)) {
      throw new ApiError("Invalid Credientials",400);
    }
    const user = await User.findOne({emailId});

    if (!user) {
      throw new ApiError("User Not Found",404);
    }
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new ApiError("Invalid Credientials",400);
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
export {validateSignUp,validateLogin}