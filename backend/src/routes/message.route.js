import {Router} from "express";
import { userAuth } from "../middleware/user.middleware.js";
import { getMessages,sendMessage } from "../controllers/message.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import { imageUpload } from "../utils/multer.util.js";
const router = Router();

router.route('/:userId').get(userAuth,asyncHandler(getMessages));
router.route('/:userId').post(userAuth,imageUpload,asyncHandler(sendMessage));


export default router;