import React from 'react'
import '../styles//CallToAction.css'
import {Link as LinkRouter} from 'react-router-dom'

export default function CallToAction() {
    return (

        <div className="card cardBg w-7/12 shadow-xl z-50">
            <figure className="px-10 pt-10">
                <img src="/logo-white.png" width="400" alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <div className="card-actions">
                    {/* <LinkRouter className="btn btn-welcome btn-primary" to={'/home'}>Go Home</LinkRouter> */}
                </div>
            </div>
        </div>

    )
}
