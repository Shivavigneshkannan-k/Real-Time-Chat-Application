import { Image } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, subscribeToChat } from "../store/chatSlice";
import { useSocketContext } from "../utils/socket";
const Chat = () => {
  const chat = useSelector((store) => store.chat.chat);
  const user = useSelector((store) => store.user.user);
  const socket = useSocketContext();
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState({
    content: "",
    image: ""
  });
  const hiddenButtonRef = useRef();
  const chatBottom = useRef(null);
  const activeUser = useSelector((store) => store.chat.activeUser);
  const onSubmit = async () => {
    const form = new FormData();
    form.append("content", newMessage.content);
    if (newMessage?.image instanceof File) {
      form.append("image", newMessage.image);
    }
    dispatch(sendMessage({ form, socket }));
  };
  useEffect(() => {
    const handler = (data) => {
      dispatch(subscribeToChat(data));
      if (chatBottom.current) {
        chatBottom.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    socket.on("recieveMessage", handler);
    return () => {
      socket.off("recieveMessage", handler);
    };
  }, [socket, dispatch,chat]);
  useEffect(() => {
    if (chatBottom.current) {
      chatBottom.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);
  return (
    <div className='flex justify-center items-center gap-4 w-full h-[calc(100vh-20vh)] relative'>
      <div className='flex items-center w-[calc(100%-1em)] m-2 gap-4 px-4 py-2 top-0 absolute bg-base-300 rounded-lg '>
        <img
          src={activeUser?.photoUrl || "../../public/landscape.avif"}
          alt={"user photo"}
          className='w-10 h-10 rounded-full object-cover  '
        />
        <p className='font-mono'>{activeUser?.username}</p>
      </div>
      <div className='w-full h-[80%] overflow-y-auto p-4'>
        {chat &&
          chat.map((message) => (
            <div
              className={`${
                message?.fromUserId === user?._id ? "chat-end" : "chat-start"
              } w-full chat  `}>
              <div className='chat-bubble'>
                {message?.photoUrl && (
                  <img
                    src={message?.photoUrl}
                    alt='loading failed'
                    className='w-50 h-50 object-cover my-2'
                  />
                )}
                {message?.content && (
                  <div className='text-end px-2'>{message?.content}</div>
                )}
              </div>
            </div>
          ))}
        <div ref={chatBottom}></div>
      </div>

      <div className='flex items-center gap-4 absolute bottom-2 justify-center w-full'>
        <Image
          size={32}
          onClick={() => {
            hiddenButtonRef.current.click();
          }}
        />
        <input
          type='text'
          placeholder='Type here'
          value={newMessage.content}
          onChange={(e) => {
            setNewMessage((prev) => ({ ...prev, content: e.target.value }));
          }}
          className='input w-3/4 focus:outline-0'
        />
        <input
          className='input hidden image-input'
          type='file'
          ref={hiddenButtonRef}
          onChange={(e) => {
            setNewMessage((prev) => ({ ...prev, image: e.target.files[0] }));
          }}
          title='image'></input>

        <button
          className='btn bg-primary'
          onClick={onSubmit}>
          send
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default Chat;
