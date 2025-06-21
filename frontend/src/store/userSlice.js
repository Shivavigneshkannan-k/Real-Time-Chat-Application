import { createSlice } from "@reduxjs/toolkit";
import { getUserData, login, logout, signUp } from "./userThunks";
import toast from "react-hot-toast";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    error: "",
    socket: null,
  },
  reducers: {
    addUserData: (state, action) => {
      return action.payload;
    }

  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = "";
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.error = action.payload;
      toast.error(action.payload);
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.error = "";
      
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
      toast.error(action.payload || "error in login");

    });
    builder.addCase(logout.fulfilled, (state,action) => {
      state.user = "";
      state.error = "";
      toast.success(action.payload);
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.payload;
      console.log(state.error)
      toast.error(action.payload || "error in logout");
    });
    builder.addCase(getUserData.fulfilled,(state,action)=>{
      state.user = action.payload.data;
      toast.success(action.payload.message);
      state.error = "";
    })
    builder.addCase(getUserData.rejected,(state,action)=>{
      state.error = action.payload;
      toast.error(state.error || "error in get userDataa");
    })
  }
});

export const { addUserData} = userSlice.actions;
export default userSlice.reducer;
