import React, { useEffect, useRef } from 'react'
import * as jose from 'jose'
import { useGetNewUserMutation } from '../features/usersAPI'
import { toast } from 'react-toastify';
import { success } from 'daisyui/src/colors';

export const SignUpGoogle = () => {
    const buttonDiv = useRef(null)

    const [newUser] = useGetNewUserMutation()

    async function handleCredentialResponse (response) {

      let userObject = jose.decodeJwt(response.credential);

      let data = {
        name: userObject.name,
        photo: userObject.picture,
        email: userObject.email,
        password: userObject.sub,
        role: "user",
        from: "google",
      };
      await newUser(data)
        .then((success) => {
          toast.success(success?.data.message);
        })
        .catch((error) => {
          toast.error(error);
        })
    }  

    useEffect (()=>{
            /* global google*/
            google.accounts.id.initialize({
              client_id: "17949108607-dg6u3mnf3slql5tle4u5dqhr117oq6i7.apps.googleusercontent.com",
              callback: handleCredentialResponse,
              context: "signup",

            });
            google.accounts.id.renderButton(
             buttonDiv.current,
             { theme: "outline", size: "medium", text: "signup_with", locale: "en" } // customization attributes
             );
    }, [])
    
  return (
    <>
     <div ref={buttonDiv}></div>
     </>
  )
}
