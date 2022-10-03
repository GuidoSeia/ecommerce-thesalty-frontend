import React from 'react'
import {  useState } from "react";
import { Link as LinkRouter } from "react-router-dom";



const Login = () => {
    const [open, setOpen] = useState(false);

    const openMenu = () => {
        if (open === true) {
          setOpen(false);
        } else {
          setOpen(true);
        }
      };  
    
  return (
    <div  >
         <label tabIndex={0} className="btn btn-ghost btn-circle avatar" >
                        <div className="w-10 rounded-full" onClick={openMenu}  >
                            
                                <img src="https://placeimg.com/80/80/people" />
                        </div>
        </label>
        {open? (
              <>
              <div>
                <p>UserName</p>
              </div>
              <div>
                <button type="button" >
                  Log out
                </button>
              </div>
            </>

        ): (<ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black rounded-box w-52">
                        
        <li><LinkRouter to="/signin">Log in</LinkRouter></li>
        <li><LinkRouter to="/signup">SignUp</LinkRouter></li>
    </ul> )}
                         
{/* //Agregar que cuanto este loggeado tena una opcion Profile y acceda a toda la info de su perfil 
 */}    
 </div>
  )
}

export default Login