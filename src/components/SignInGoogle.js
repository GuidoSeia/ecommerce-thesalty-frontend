import React, { useEffect, useRef } from 'react'
import * as jose from 'jose'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { loggedTrue } from '../features/loggedSlice'
import { useGetLoginMutation } from '../features/usersAPI'
import { toast } from 'react-toastify';


export const SignInGoogle = () => {
  const buttonDiv = useRef(null)

  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/home')
  }

  const dispatch = useDispatch()

  const [newLogin] = useGetLoginMutation()

  async function handleCredentialResponse(response) {
    let userObject = jose.decodeJwt(response.credential);

    let data = {
      email: userObject.email,
      password: userObject.sub,
      from: "google",
    };

    await newLogin(data)
      .then((success) => {
        let user = success?.data?.response?.user
        /* let token = succes?.data?.response?.token */
        if (user != undefined) {
          localStorage.setItem("userLogged", JSON.stringify(user))
          /* localStorage.setItem("token", JSON.stringify(token)) */
          dispatch(loggedTrue())
          /* showLoginMsg(user.name) */
          handleNavigate()
          toast.success(success.data.message);
        } else {
          toast.error(success.error.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
    /* global google*/
    google.accounts.id.initialize({
      client_id: "17949108607-dg6u3mnf3slql5tle4u5dqhr117oq6i7.apps.googleusercontent.com",
      callback: handleCredentialResponse,
      context: "signin",

    });
    google.accounts.id.renderButton(
      buttonDiv.current,
      { theme: "filled_black", size: "medium", text: "signin_with", locale: 'en', type: "standar" }
    );
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <div ref={buttonDiv}>

      </div>
    </div>
  )
}
