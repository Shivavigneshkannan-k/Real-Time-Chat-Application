import { Mail, UserRound, KeyRound } from "lucide-react";
import SidePanel from "../Components/Sidepanel";
import { useDispatch} from "react-redux";
import { signUp } from "../store/userThunks.js";
import { useState } from "react";
import {Link} from "react-router"
import toast from "react-hot-toast"

const Signup = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    emailId: "",
    password: ""
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    const {username,emailId,password} = formData || {};
    console.log(formData)
    if([username,emailId,password].some(field => field.trim()==="")){
      return toast.error("All fields are required!!!");
    }
    dispatch(signUp(formData));
  };
  const handleChange = (e)=>{
    setFormData(prev =>({
      ...prev,[e.target.name]: e.target.value
    }))
  }
  return (
    <div className='flex  items-center justify-center gap-10 h-[calc(100vh-20vh)] w-full'>
      <form className='lg:w-1/4 md:w-1/2 w-[90%]'>
        <h1 className='text-4xl my-5 mx-auto text-center'>Signup</h1>
        <div>
          <label className='flex p-2 gap-2'>
            <UserRound />
            <span>Username</span>
          </label>
          <input
            type='text'
            name="username"
            value={formData.username}
            onChange={e=>handleChange(e)}
            placeholder='David goggins'
            className='input w-full mb-4'
          />
          <label className='flex p-2 gap-2'>
            <Mail />
            <span>Email</span>
          </label>
          <input
            type='email'
            name="emailId"
            value={formData.emailId}
            onChange={e=>handleChange(e)}
            placeholder='xyz@email.com'
            className='input w-full mb-4'
          />
          <label className='flex p-2 gap-2'>
            <KeyRound />
            <span>Password</span>
          </label>
          <input
            type='password'
            name="password"
            value={formData.password}
            onChange={e=>handleChange(e)}
            placeholder='*******'
            className='input w-full mb-4'
          />
        </div>
        <button
          className='btn block w-full my-4'
          onClick={(e) => {
            handleSignUp(e);
          }}>
          Signup
        </button>
        <p className="text-center py-4">Already have an account? <Link to="/login" className="cursor-pointer hover:underline">Login Now</Link></p>
      </form>
      <div className='lg:w-1/2 lg:block hidden'>
        <SidePanel comp={"signup"} />
      </div>
    </div>
  );
};

export default Signup;
