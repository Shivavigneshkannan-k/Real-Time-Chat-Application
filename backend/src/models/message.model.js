import mongoose, {Schema } from "mongoose";
import ApiError from "../utils/ApiError.js";
const messageSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    content: {
      type: String
    },
    photoPublicId: {
      type: String,
      default:""
      
    },
    photoUrl: {
      type: String,
      default:""
    }
  },
  { timestamps: true }
);
messageSchema.pre("validate",function (next){
  const message = this;
  if(!!message.photoPublicId !== !!message.photoUrl){
    return next(new ApiError("Invalid Photo upload"),400);
  }
  next() //with this next save won't call
})
messageSchema.index({fromUserId:1,toUserId:1});

const Message = mongoose.model("Message", messageSchema);
export default Message;
