import React from 'react'
import { useRef } from "react";
import { SignUpGoogle } from './SignUpGoogle';
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { useGetNewUserMutation } from '../features/usersAPI';
import { toast } from 'react-toastify';


const SignUp = () => {
  const form = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newUser, resultSignUp] = useGetNewUserMutation();


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

    try {
      await newUser(formUser).then(success => {
        if (success.error) {
          errorMessage(success.error.data.message)
        } else {
          successMessage(success.data.message)
          navigate("/signin")
        }
      }).catch(err => {
        console.log(err)
      })

    }
    catch (error) {
      console.error(error);

    }
    form.current.reset();
  }

  const captcha = useRef(null)

  function onChange() {
    if (captcha.current.getValue()) {
      console.log(captcha.current.getValue())
    }
  }

  const successMessage = (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  const errorMessage = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT
    });
  };


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
                <div className="flex justify-center align-items-center mt-5">
                  <ReCAPTCHA
                    sitekey="6LfLI1UiAAAAAEG2Baygi7bZD1cAggQcuDvK3W0N"
                    onChange={onChange}
                    theme={'dark'}
                    ref={captcha}
                  />
                </div>
                <div className="flex justify-center align-items-center pt-5">
                  <SignUpGoogle />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary" onClick={handleSubmit}>Sign up</button>
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