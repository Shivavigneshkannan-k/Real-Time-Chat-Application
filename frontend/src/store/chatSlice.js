import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const getAllUsers = createAsyncThunk(
  "chat/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("user/all");
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Error in Get Chat users"
      );
    }
  }
);
const getChat = createAsyncThunk(
  "chat/getChat",
  async (user_id, { getState,rejectWithValue }) => {
    try {
      const state = getState();
      const activeUser = state.chat.activeUser;
      if (activeUser?._id === user_id) {
        return { activeUser: null, chat: null };
      }
      const response = await axiosInstance.get(`messages/${user_id}`);
      return { chat: response?.data?.data?.chat, activeUser: response?.data?.data?.chatUser};
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          "Error At getting the chat"
      );
    }
  }
);
const sendMessage = createAsyncThunk("chat/sendMessage",
    async({form,socket},{getState,rejectWithValue})=>{
        try{
            const state = getState();
            const activeUser = state.chat.activeUser;
            if(!activeUser){
                return rejectWithValue("no active user found");
            }
            const response = await axiosInstance.post(`messages/${activeUser?._id}`,
                form
            );
            const responseData = response?.data?.data;
            const {fromUserId,toUserId,content,photoPublicId,photoUrl} = responseData ||{}; 
            socket.emit("newMessage", {fromUserId,toUserId,content,photoPublicId,photoUrl});
            return { message: response?.data?.data};
        }catch(err){
            return rejectWithValue(
        err?.response?.data?.message ||
          err?.message ||
          "Error At getting the chat"
      );
        }
})
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    users: [],
    chat: [],
    activeUser: null,
    error: "",
    onlineUsers: [],
  },
  reducers: {
    subscribeToChat: (state, action) => {
      state.chat.push(action.payload);
    },
    subscribeToOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
      console.log("online users", action.payload);
    },

  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload.data;
      state.error = "";
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.error = action.payload;
      toast.error(action.payload);
    });
    builder.addCase(getChat.fulfilled, (state, action) => {
      state.chat = action.payload.chat;
      state.activeUser = action.payload.activeUser;
      state.error = "";
    });
    builder.addCase(getChat.rejected, (state, action) => {
      state.error = action.payload;
      toast.error(action.payload);
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.chat.push(action.payload.message);
      state.error = "";
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.error = action.payload;
      toast.error(action.payload);
    });
  }
});
export default chatSlice.reducer;
export const { subscribeToChat,subscribeToOnlineUsers } = chatSlice.actions;
export { getAllUsers,getChat,sendMessage };
