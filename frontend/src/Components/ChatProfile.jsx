import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChat } from "../store/chatSlice";
import { Circle } from "lucide-react";

const ChatProfile = ({ user }) => {
  const { username, photoUrl,_id } = user;
  const dispatch = useDispatch();
  const activeUser = useSelector(store => store.chat.activeUser);
  const online = useSelector(store => store.chat.onlineUsers);
  
  return (
    <button className={`btn ${activeUser?._id == _id?"bg-primary":"bg-base-100"} focus:shadow-Secondary focus:shadow-2xl rounded-md flex justify-between py-7`} onClick={()=>{
      dispatch(getChat(_id));
    }}>
      <div className='flex items-center justify-between gap-4 my-4'>

        <div className="relative">
          <img
            src={photoUrl || "../../public/landscape.avif"}
            alt={"chat user"}
            className='w-10 h-10 rounded-full object-cover'
          />
          {online.includes(_id) && <Circle fill="#10ff07" size={18} strokeWidth={0} className="absolute top-0 -right-2 " />}
        </div>
        <p>{username}</p>

      </div>
    </button>
  );
};

export default ChatProfile;
