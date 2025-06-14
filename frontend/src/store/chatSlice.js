import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

const getAllUsers = createAsyncThunk("get/allChatUsers",
    async(_,{rejectWithValue})=>{
        try{
            const response = await axiosInstance.get("user/all");
            return response.data;
        }
        catch(err){
            return rejectWithValue(err?.response?.data?.message || "Error in Get Chat users")
        }
    })
const chatSlice = createSlice({
    name:"chat",
    initialState:{
        users: [],
        chat:[],
        error:""
    },
    extraReducers:(builder) => {
        builder.addCase(getAllUsers.fulfilled,(state,action)=>{
            state.users = action.payload.data;
        });
        builder.addCase(getAllUsers.rejected,(state,action)=>{
            state.error = action.payload;
        })
    }
})
export default chatSlice.reducer;
export {
    getAllUsers
}