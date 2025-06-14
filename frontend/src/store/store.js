import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import chatReducer from './chatSlice';

const store = configureStore({
  reducer: {
    chat:chatReducer,
    user:userReducer,
  },
})
export default store;