import React from 'react'
import { useRef } from "react";


const SignUp = () => {
  const form = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const formUser = {
      name: formData.get("name"),
      mail: formData.get("mail"),
      photo: formData.get("photo"),
      password: formData.get("password"),
    };
    console.log(formUser)

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

      <div className="form-control">
          <label className="label">
            <span className="label-text">Name and Lastname</span>
          </label>
          <input type="text" name="name" className="input input-bordered" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="text" placeholder="mail" className="input input-bordered" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input type="text" name="photo" className="input input-bordered" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="text" placeholder="password" className="input input-bordered" />
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary" onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  </div>
</div>
    </form>
  </div>
  )
}

export default SignUp