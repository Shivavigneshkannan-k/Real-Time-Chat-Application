import { Routes, Route, Navigate, useLocation } from "react-router";
import HomePage from "./Pages/Home";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import ErrorPage from "./Pages/Error";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./Pages/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Components/Navbar";
import { useEffect } from "react";
import { getUserData } from "./store/userThunks";
import { socket, SocketContext } from "./utils/socket.js";
import { subscribeToOnlineUsers } from "./store/chatSlice.js";
const App = () => {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const authRoutes = ["/login", "/signup"];
  const isAuthRoute = authRoutes.includes(location?.pathname);
  const onlineUsers = useSelector((store) => store.chat.onlineUsers);
  useEffect(() => {
    if (!user && !isAuthRoute) {
      dispatch(getUserData());
    }
  }, [user, dispatch, isAuthRoute]);

  useEffect(() => {
    const handleOnlineUsers = (data) => {
      console.log("online users data", data);
      dispatch(subscribeToOnlineUsers(data));
    };
    if (user && !socket.connected) {
      socket.auth = { userId: user?._id };
      socket.connect();
      console.log("socket connected", socket.id);
    }

    socket.on("activeUsers", handleOnlineUsers);

    return () => {
      if (socket.connected) {
        socket.off("activeUsers", handleOnlineUsers);
      }
    };
  }, [user, dispatch,onlineUsers]);
  console.log("socket", socket);
  return (
    <>
      <SocketContext.Provider value={socket}>
        <div>
          <Toaster />
        </div>
        <Navbar />
        <Routes>
          <Route
            path='/'
            element={
              user ? (
                <HomePage />
              ) : (
                <Navigate
                  to='/login'
                  replace
                />
              )
            }
          />
          <Route
            path='/login'
            element={
              !user ? (
                <LoginPage />
              ) : (
                <Navigate
                  to='/'
                  replace
                />
              )
            }
          />
          <Route
            path='/signup'
            element={
              !user ? (
                <SignupPage />
              ) : (
                <Navigate
                  to='/'
                  replace
                />
              )
            }
          />
          <Route
            path='/profile'
            element={
              user ? (
                <ProfilePage />
              ) : (
                <Navigate
                  to='/login'
                  replace
                />
              )
            }
          />
          <Route
            path='*'
            element={<ErrorPage />}
          />
        </Routes>
        {/* <Footer /> */}
      </SocketContext.Provider>
    </>
  );
};

export default App;
