import React from 'react'
import { useRef } from "react";
import { SignUpGoogle } from './SignUpGoogle';
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { useGetNewUserMutation } from '../features/usersAPI';
import { toast } from 'react-toastify';
import { Link as LinkRouter} from 'react-router-dom'
import '../styles/SignUp.css'



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
          toast.error(success.error.data.message);
        } else {
          toast.success(success.data.message);
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

  return (

    <div className='containerSignUp'>
      <video className='videoSignUp' src="./assets/video.mp4" autoPlay loop playsInline muted/>

        
      
      <form ref={form} className="formSignUp">

            <div className="text-center lg:text-left">
            </div>
            <div className="container1 card shadow-2xl ">
              <div className="card-body card-signup">
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
                
                <div className="btnform form-control mt-6">
                  <button className="buttonform btn" onClick={handleSubmit}>Sign up</button>
                </div>
                
                <p className='or'>or</p>

                <div className="flex justify-center align-items-center pt-5">
                  <SignUpGoogle />
                </div>

                <div className="textNew text-center lg:text-left p-4">
              <p>You have an account? Please <LinkRouter className='link-new' to="/signin">login!</LinkRouter>  </p>          
            </div>
              </div>
            </div>

      </form>

    </div>


  )
}

export default SignUp