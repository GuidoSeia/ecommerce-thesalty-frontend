import React from 'react'
import { useRef } from "react";
import { useGetLoginMutation } from '../features/usersAPI';
import { useNavigate } from 'react-router-dom'
import { SignInGoogle } from './SignInGoogle';
import { useDispatch } from 'react-redux';

import { setUser } from '../features/loggedSlice'
import '../styles//SignInForm.css'

import { toast } from 'react-toastify';
import { Link as LinkRouter} from 'react-router-dom'

const SignIn = () => {

  const [newLogin] = useGetLoginMutation()

  const dispatch = useDispatch()

  const form = useRef();

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/home')
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData(form.current);

    const formUser = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    await newLogin(formUser)
      .then((success) => {
        let user = success?.data?.response?.user
        let token = success?.data?.response?.token
        if (user !== undefined) {
          toast.success(success?.data.message);
          localStorage.setItem("token", JSON.stringify(token))
          dispatch(setUser(user))
          form.current.reset()
          handleNavigate()
        } else {
          if (success.data) {
            toast.error(success?.data.message);
          } else {
            toast.error(success?.error.data.message);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="main-container">
      <video src="./assets/video2.mp4" autoPlay loop playsInline muted/>
      <div className="input-container">
        
      
      <form ref={form} className="form-control d-flex justify-center items-center">
            <div className="text-center lg:text-left p-4">
              <h1 className="text-5xl font-bold">Login now!</h1>
              
            </div>
            <div className="container2 card flex-shrink-0 shadow-2xl">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="text" name="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="password" name="password" className="input input-bordered" />

                </div>
                <div className="btnform form-control mt-6">
                  <button className="buttonform btn" onClick={handleSubmit}>Login</button>
                </div>
                  <p className='or'>or</p>
                <div className="flex justify-center align-items-center mt-6">
                  <SignInGoogle />
                </div>
                
              </div>
              
            </div>
            <div className="textNew text-center lg:text-left p-4">
              <p>Don't have a user? Please <LinkRouter className='link-new' to="/signup">create an account!</LinkRouter>  </p>          
            </div>

      </form>
      </div>
    </div>

 
  )
}

export default SignIn