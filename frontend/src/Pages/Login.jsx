import { Mail, UserRound, KeyRound } from "lucide-react";
import SidePanel from "../Components/Sidepanel";
import { useDispatch } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { login } from "../store/userThunks";
import { Link} from "react-router";

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    emailId: "",
    password: ""
  });

  const handleLogin =async (e) => {
    e.preventDefault();
    const {emailId,password} = formData || {};
    console.log(formData)
    if([emailId,password].some(field => field.trim()==="")){
      return toast.error("All fields are required!!!");
    }
    dispatch(login(formData))
    
  };
  const handleChange = (e)=>{
    setFormData(prev =>({
      ...prev,[e.target.name]: e.target.value
    }))
  }
  return (
    <div className='flex  items-center justify-center gap-10 h-[calc(100vh-20vh)] w-full'>
      <div className='lg:w-1/2 lg:block hidden'>
        <SidePanel comp={"login"} />
      </div>
      <form className='lg:w-1/4 md:w-1/2 w-[90%] justify-start'>
        <h1 className='text-4xl my-5 mx-auto text-center'>Login</h1>
        <div>
          <label className='flex p-2 gap-2'>
            <Mail />
            <span>Email</span>
          </label>
          <input
            type='email'
            placeholder='xyz@email.com'
            name="emailId"
            onChange={(e)=>{handleChange(e)}}
            value={formData.emailId}
            className='input w-full mb-4'
          />
          <label className='flex p-2 gap-2'>
            <KeyRound />
            <span>Password</span>
          </label>
          <input
            type='password'
            placeholder='*******'
            name="password"
            value={formData.password}
            onChange={(e)=>{handleChange(e)}}
            className='input w-full mb-4'
          />
        </div>
        <button
          className='btn block w-full my-4'
          onClick={(e) => {
            handleLogin(e);
          }}>
          Login
        </button>
        <p className="text-center py-4">Don't have an account? <Link to="/signup" className="cursor-pointer hover:underline">Register Now</Link></p>
      </form>
    </div>
  );
};

export default Login;
