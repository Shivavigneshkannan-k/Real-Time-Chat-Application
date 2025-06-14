import React from "react";

const ChatProfile = ({ user }) => {
  const { username, photoUrl } = user;
  return (
    <div className='py-2 px-2 bg-base-100 rounded-md hover:bg-base-200'>
      <div className='flex items-center gap-4 '>
        <img
          src={photoUrl || "../../public/landscape.avif"}
          alt={"chat user"}
          className='w-10 h-10 rounded-full object-cover'
        />
        <p>{username} <span className="opacity-90">(offline)</span></p>

      </div>
    </div>
  );
};

export default ChatProfile;
