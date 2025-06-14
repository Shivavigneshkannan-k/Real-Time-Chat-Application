import { Routes, Route, Navigate} from "react-router";
import HomePage from "./Pages/Home";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import ErrorPage from "./Pages/Error";
import { Toaster } from "react-hot-toast";
import ProfilePage from "./Pages/ProfilePage";
import { useSelector } from "react-redux";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
const App = () => {
  const user = useSelector(store => store.user.user);

  return (
    <>
      <div><Toaster/></div>
      <Navbar/>
      <Routes>
          <Route path="/" element={user ? <HomePage /> :<Navigate to="/login" replace />} />
          <Route path="/login" element={!user ? <LoginPage /> :<Navigate to="/" replace />} />
          <Route path="/signup" element={!user ? <SignupPage /> :<Navigate to="/" replace />} />
          <Route path="/profile" element={user ? <ProfilePage /> :<Navigate to="/login" replace />} />
          <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
      </>
  );
};

export default App;
