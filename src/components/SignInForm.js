import React from 'react'
import { useRef } from "react";
import { useGetLoginMutation } from '../features/usersAPI';
import { useNavigate } from 'react-router-dom'
import { SignInGoogle } from './SignInGoogle';
import { useDispatch } from 'react-redux';
import { loggedTrue } from '../features/loggedSlice'
import '../styles//SignInForm.css'
import { toast } from 'react-toastify';

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
        /* let token = success?.data?.response?.token */
        if (user !== undefined) {
          toast.success(success?.data.message);
          localStorage.setItem("userLogged", JSON.stringify(user))
          /* localStorage.setItem("token", JSON.stringify(token)) */
          /* showLoginMsg(user?.name) */
          dispatch(loggedTrue())
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
    <div>
      <form ref={form} className="form-control d-flex justify-center items-center">
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
                <div className="form-control mt-6">
                  <button className="btn btn-primary" onClick={handleSubmit}>Login</button>

                </div>
                <div className="flex justify-center align-items-center mt-6">
                  <SignInGoogle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignIn