import { createSlice } from "@reduxjs/toolkit";
import { login, logout, signUp } from "./userThunks";
import toast from "react-hot-toast";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    error: ""
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
      toast.error(action.payload);

    });
    builder.addCase(logout.fulfilled, (state,action) => {
      state.user = "";
      state.error = "";
      toast.success(action.payload);
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.payload;
      console.log(state.error)
      toast.error(action.payload);
    });
  }
});

export const { addUserData } = userSlice.actions;
export default userSlice.reducer;
