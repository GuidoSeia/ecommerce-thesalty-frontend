import React from 'react'
import { useRef } from "react";
import { SignUpGoogle } from './SignUpGoogle';
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"
import { useGetNewUserMutation } from '../features/usersAPI';

const SignUp = () => {
  const form = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newUser] = useGetNewUserMutation();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const formUser = {
      name: formData.get("name"),
      email: formData.get("email"),
      photo: formData.get("photo"),
      password: formData.get("password"),
      from: "form",
      role: "user"
    };
    console.log(formUser)

    try {
      const response = await newUser(formUser)
      navigate("/signin");
    }
    catch (error) {
      console.error(error);
     
    }
    form.current.reset();

  }

  return (
   
    <div>
    <form ref={form} className="form-control">
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">SignUp</h1>
      <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
{/*Input */}
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name and Lastname</span>
          </label>
          <input type="text" name="name" className="input input-bordered" />
        </div>
{/*Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" name="email" className="input input-bordered" />
        </div>
{/*Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input type="text" name="photo" className="input input-bordered" />
        </div>
{/*Input */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="text" name="password" className="input input-bordered" />
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  </div>
</div>

    </form>
    <SignUpGoogle/> 
   
  </div>

     
  )
}

export default SignUp