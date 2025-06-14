import {Router} from "express";
import { getAllUsers, loggedInUserProfile,updateProfilePhoto } from "../controllers/user.controller.js";
import { userAuth } from "../middleware/user.middleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import { imageUpload } from "../utils/multer.util.js";
const router = Router();

router.route('/me').get(asyncHandler(userAuth),asyncHandler(loggedInUserProfile));
router.route('/all').get(asyncHandler(userAuth),asyncHandler(getAllUsers));
router.route('/profile/update/photo').patch(asyncHandler(userAuth),imageUpload,asyncHandler(updateProfilePhoto))


export default router;