import {Router} from "express";
import { getAllUsers, loggedInUserProfile,updateProfilePhoto } from "../controllers/user.controller.js";
import { userAuth } from "../middleware/user.middleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import {userProfileUpload} from "../middleware/multer.middleware.js";
const router = Router();

router.route('/me').get(userAuth,loggedInUserProfile);
router.route('/all').get(userAuth,asyncHandler(getAllUsers));
router.route('/profile/update/photo').patch(userAuth,userProfileUpload,asyncHandler(updateProfilePhoto))


export default router;