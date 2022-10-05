import React from 'react'
import PageLayout from '../components/layout/PageLayout'
import NewProducts from "./NewProducts"
import EditProducts from "./EditProducts"
import {Link as LinkRouter} from 'react-router-dom'
import '../styles//AdminProfile.css'


export default function AdminProfile() {


  return (
    <div>
<PageLayout>
<div className="bodyContainer">

<div className="cardContainer">
  <figure><img src="/billeteras.webp" alt="Shoes" /></figure>
  <div className="subContainer">
    <h2 className="card-title">Edit Products!</h2>
    <div className="">
      <button className=""><LinkRouter className="btn btn-primary btn-home-page text-xs" to={'/products'}>Edit Now!</LinkRouter></button>
    </div>
  </div>
</div>

<div className="cardContainer">
  <figure><img src="/relojes-hombre-abaco.webp" alt="Shoes" /></figure>
  <div className="subContainer">
    <h2 className="card-title">Create a Product!</h2>
    
    <div className="">
      <button className=""><LinkRouter className="btn btn-primary btn-home-page text-xs" to={'/newproduct'}>Create Now!</LinkRouter></button>
    </div>
  </div>
</div>

</div>

{/* 
   <EditProducts/>
  
    <NewProducts/>  */}


</PageLayout>
    </div>
  )
}
