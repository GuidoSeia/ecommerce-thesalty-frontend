import React from 'react'
import { useRef } from "react";


const SignIn = () => {
  const form = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    const formUser = {
     
      mail: formData.get("mail"),
      
      password: formData.get("password"),
    };
    console.log(formUser)

  }
  return (
    <div>
    <form ref={form} className="form-control">
    <div className="form-control w-full max-w-xs">

  <label className="label">
    <span className="label-text">Mail</span>
  </label>
  <input type="email"  name="mail"  className="input input-bordered w-full max-w-xs" />


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

export default SignIn