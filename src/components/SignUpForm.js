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
    <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">Name, Last Name</span>
  </label>
  <input type="text"  name="name"  className="input input-bordered w-full max-w-xs" />

  <label className="label">
    <span className="label-text">Mail</span>
  </label>
  <input type="email"  name="mail"  className="input input-bordered w-full max-w-xs" />

  <label className="label">
    <span className="label-text">Photo</span>
  </label>
  <input type="mail"  name="photo"  className="input input-bordered w-full max-w-xs" />

  <label className="label">
    <span className="label-text">Password</span>
  </label>
  <input type="password"  name="pass"  className="input input-bordered w-full max-w-xs" />

</div>
    <button className="btn btn-link" onClick={handleSubmit}>SignUp</button>
    </form>
  </div>
  )
}

export default SignUp