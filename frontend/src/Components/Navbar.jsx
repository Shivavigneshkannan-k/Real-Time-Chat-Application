import React from "react";
import { MessageCircleDashed } from "lucide-react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userThunks";

const Navbar = () => {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  return (
    <div className='navbar bg-base-100 shadow-sm px-4'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-xl'>
          Chatty <MessageCircleDashed />
        </a>
      </div>
      {user && <p className='p-2 px-4'>Hi, {user?.username || "user"} </p>}
      <div className='flex-none'>
        <div className='dropdown dropdown-end'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <img
                alt='user profile Image'
                src={user?.photoUrl || "../../public/landscape.avif"}
                className='object-cover'
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'>
            <li>
              <Link
                to='/profile'
                className='justify-between'>
                Profile
                <span className='badge'>New</span>
              </Link>
            </li>
            <li>
              <Link to='/setting'>Settings</Link>
            </li>
            {!user ? (
              <li>
                <Link
                  to='/login'
                  className='justify-between'>
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <div onClick={()=>{
                  dispatch(logout());
                }}>Logout</div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
