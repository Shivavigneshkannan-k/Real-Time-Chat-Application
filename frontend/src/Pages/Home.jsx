import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../store/chatSlice";
import ChatProfile from "../Components/chatProfile";
import { MessageCircle, MessageSquare } from "lucide-react";
import Chat from "./Chat";
const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.chat.users);
  const activeUser = useSelector((store) => store.chat.activeUser);
  useEffect(() => {
    if (users.length === 0) {
      dispatch(getAllUsers());
      console.log(users);
    }
  }, [dispatch, users]);
  return (
    <div className='mx-10 my-5 min-h-100vh bg-base-300 rounded-lg shadow-md flex'>
      <div className=' min-h-[calc(100vh-20vh)]  w-[20%] p-4'>
        <h2 className='text-xl p-4 flex gap-2 items-center'>
          Chat <MessageCircle />{" "}
        </h2>
        <div className=' flex flex-col gap-2 overflow-y-auto h-[80%]'>
          {users.length > 0 &&
            users.map((user) => (
              <ChatProfile
                user={user}
                key={user?._id}
              />
            ))}
        </div>
      </div>
      <div className='bg-base-200 w-full min-h-[80%] m-4 flex justify-center items-center rounded-lg'>
        {activeUser ? (
          <Chat />
        ) : (
          <div className='flex justify-center items-center gap-4'>
            <div className='text-4xl'>Select & Chat</div>
            <MessageSquare size={64} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
