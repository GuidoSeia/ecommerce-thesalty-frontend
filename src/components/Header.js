import React from 'react'
import '../styles//Header.css'
import {Link as LinkRouter} from 'react-router-dom'
import Login from './Login'
import ShoppingCart from './ShoppingCart'
import {  useState } from "react";


export default function Header() {
    const [open, setOpen] = useState(false);

    const openMenu = () => {
        if (open === true) {
          setOpen(false);
        } else {
          setOpen(true);
        }
      };  
    return (
        <>
            <div className="navBar navbar bg-black">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-black rounded-box w-52">
                            <li><a>Home</a></li>
                            <li><LinkRouter to="/products">Products</LinkRouter></li>
                            <li><a>¿Quienes Somos?</a></li>
                            <li><a>Locales y ¿Donde puedes encontrarnos?</a></li>
                            <li><a>Contactanos! </a></li> 
                        </ul>
                    </div>
                </div>
                <div className="navbar-center">
                <LinkRouter to={'/home'}><img src="/logo-white.png" width="150" alt="Shoes" className="rounded-xl" /></LinkRouter>            
                </div>
                <div className="navbar-end">
                    
                    <div className="dropdown dropdown-end" onClick={openMenu}>
                        <label  tabIndex={0} className="btn btn-ghost btn-circle">
                            <div className="indicator" >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">8</span>
                            </div>
                        </label>
                        {open? (<ShoppingCart/>): null}

                    </div>
                    <div className="dropdown dropdown-end">
                        <Login/>
                    </div>

                </div>
            </div>


        </>
    )
}
