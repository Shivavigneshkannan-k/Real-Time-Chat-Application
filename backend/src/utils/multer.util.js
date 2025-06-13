import { upload } from "../middleware/multer.middleware.js";
import ApiError from "./ApiError.js";

const imageUpload = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      next(new ApiError("File upload failed!!", 500));
    }
    next();
  });
};

export {imageUpload};