import multer from "multer";
import path from "path";
import ApiError from "../utils/ApiError.js";

// defining the temporary destination for multer
const storage = multer.diskStorage({
  destination: function (req, fiile, cb) {
    cb(null, path.join(process.cwd(), "public", "temp")); // process.cwd() :cwd = current working directory
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // getting the file extension (.png,.jpg,etc...)
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix+ext);
  }
});

// instanstiation
const upload = multer({ storage: storage });

// writing upload as middleware
const userProfileUpload = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      next(new ApiError("File upload failed!!", 500));
    }
    next();
  });
};
export { upload, userProfileUpload };
