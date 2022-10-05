import React from 'react'
import PageLayout from '../components/layout/PageLayout'
import NewProducts from "./NewProducts"
import EditProducts from "./EditProducts"
import {Link as LinkRouter} from 'react-router-dom'

export default function AdminProfile() {


  return (
    <div>
<PageLayout>

<div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src="" alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">Edit Products!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary"><LinkRouter className="btn btn-primary btn-home-page text-xs" to={'/products'}>Edit Now!</LinkRouter></button>
    </div>
  </div>
</div>

<div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src="" alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">Create a Product!</h2>
    <p></p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary"><LinkRouter className="btn btn-primary btn-home-page text-xs" to={'/newproduct'}>Create Now!</LinkRouter></button>
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
