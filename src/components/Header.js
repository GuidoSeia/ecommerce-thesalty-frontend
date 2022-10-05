
import React from 'react'
import '../styles//Header.css'
import { Link as LinkRouter, useNavigate } from 'react-router-dom'
import { useGetSignOutMutation } from '../features/usersAPI'
import ShoppingCart from './ShoppingCart'
import { useState } from "react";
import { entry } from '../features/loggedSlice'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


export default function Header() {
  const logged = useSelector((state) => state.logged.loggedState);

  const dispatch = useDispatch()
  const [signOut, resultLogOut] = useGetSignOutMutation()
  const navigate = useNavigate()

  const [openProfile, setOpenProfile] = useState(false);
  let user = JSON.parse(localStorage.getItem('userLogged'))

  const [open, setOpen] = useState(false);

  const handleNavigate = () => {
    navigate('/products')
  }


  const openMenu = () => {
    if (open === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const openProfileMenu = () => {
    setOpenProfile(!openProfile);
  };

  const handleLogOut = async () => {
    try {
      let object = {
        logged: false,
        id: user.id,
      };
      await signOut(object);
      localStorage.removeItem("userLogged");
      dispatch(entry());
      handleNavigate();
    } catch (error) {
      console.log(error);
    }

  };

  const successMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  if (resultLogOut.isSuccess) {
    resultLogOut.isSuccess = false
    successMessage(resultLogOut.data.message)
  }

  return (
    <div className="navBar navbar bg-black">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black rounded-box w-52">
            <li><LinkRouter to="/home">Home</LinkRouter></li>
            <li><LinkRouter to="/products">Products</LinkRouter></li>
            <li><LinkRouter to="/aboutUs">About Us</LinkRouter></li>
            {user?.role === "admin" ? (<li> <LinkRouter to="/admin">Administrator Profile</LinkRouter></li>) : null}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <LinkRouter to={'/home'}><img src="/logo-white.png" width="150" alt="Shoes" className="rounded-xl" /></LinkRouter>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end" onClick={openMenu}>
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator" >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <span className="badge badge-sm indicator-item">0</span>
            </div>
          </label>
          {logged ? (open ? <ShoppingCart /> : null) : null}

        </div>
        <div className="dropdown dropdown-end" onClick={openProfileMenu}>
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {logged ? <img src={user?.photo} alt="a" /> : <img src="https://res.cloudinary.com/teepublic/image/private/s--UymRXkch--/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_90,w_630/v1570281377/production/designs/6215195_0.jpg" />}
            </div>
          </label>
          {logged ? (openProfile ? (<><ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <a href="#my-modal-2">Profile</a>
            </li>
            <li>
              <a onClick={handleLogOut}>Log out</a>
            </li>
          </ul>
          </>
          ) : null
          ) : openProfile ? (
            <>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <LinkRouter to={"/signin"}>Sign in</LinkRouter>
                </li>
                <li>
                  <LinkRouter to={"/signup"}>Sign up</LinkRouter>
                </li>
              </ul>
            </>
          ) : null}
          <input type="checkbox" id="my-modal" className="modal-toggle" />
          <div className="modal" id="my-modal-2">
            <div className="modal-box">
              <div className="flex justify-center items-center">
                <div className="avatar online">
                  <div className="w-24 rounded-full">
                    <img src={user?.photo} />
                  </div>
                </div>

                <div className="flex justify-content-center align-items-center flex-col text-center my-3 mx-5">
                  <p className="text-2xl">{user?.name}</p>
                  <p className="text-2xl">{user?.email}</p>
                </div>
              </div>
              <div className="flex justify-evenly align-evenly">
                <div className="stats shadow">
                  <div className="stat">
                    <div className="stat-title">Total buys</div>
                    <div className="stat-value">23</div>
                    <div className="stat-desc">21% more than last month</div>
                  </div>
                </div>
                <div className="stats shadow">
                  <div className="stat">
                    <div className="stat-title">Total reviews</div>
                    <div className="stat-value">12</div>
                    <div className="stat-desc">5% more than last month</div>
                  </div>
                </div>
              </div>
              <div className="modal-action">
                <a href="#" className="btn">Close</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

