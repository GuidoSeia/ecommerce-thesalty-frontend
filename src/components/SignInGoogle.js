import React, { useEffect, useRef } from 'react'
import * as jose from 'jose'

export const SignInGoogle = () => {
    const buttonDiv = useRef(null)
    async function handleCredentialResponse (response) {
      let userObject = jose.decodeJwt(response.credential);
      let data = {
        name: userObject.name,
        lastName: userObject.family_name,
      
        mail: userObject.email,
        password: userObject.sub,
 
        role: "user",
        from: "google",
      };
       console.log(userObject)

    }

    useEffect (()=>{
        window.onload = function () {
            /* global google*/
            google.accounts.id.initialize({
              client_id: "17949108607-dg6u3mnf3slql5tle4u5dqhr117oq6i7.apps.googleusercontent.com",
              callback: handleCredentialResponse,
              context: "signin",

            });
            google.accounts.id.renderButton(
             buttonDiv.current,
             { theme: "outline", size: "medium", text: "signin_with", locale: "en" } // customization attributes
             );
          }

    }, [])
  return (
    <div>
     <div ref={buttonDiv}></div>
     </div>
  )
}
