import React from 'react'
import PageLayout from '../components/layout/PageLayout'
import { Link as LinkRouter } from 'react-router-dom'
import '../styles//AdminProfile.css'



export default function AdminProfile({ functionCountdown }) {

  let fnCountdown = functionCountdown
  // ref={formRef}
  return (
    <div>
      <PageLayout>
        <div className="bodyContainer flex flex-wrap justify-center items-center">

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

          <div className="cardContainer">
            <form onSubmit={fnCountdown} className="h-full flex flex-col items-center justify-center">
              <h2>new discount coupon</h2>
              <label className="label">
                <span className="label-text text-black text-base">Coupon code</span>
              </label>
              <input type="text" name="code" className="input input-bordered h-10" />

              <label className="label">
                <span className="label-text text-black text-base">discount amount</span>
              </label>
              <input type="text" name="discount" className="input input-bordered h-10" />
              <label className="label">
                <span className="label-text text-white text-base text-center">select the number of days the coupon will be available</span>
              </label>
              <input type="number" name="endTime" className="input input-bordered h-10" />
              <div className="form-control mt-6">
              </div>
              <button className="btn btn-primary btn-home-page text-xs">Create!</button>
            </form>
          </div>
        </div>

        {/* 
   <EditProducts/>
  
    <NewProducts/>  */}


      </PageLayout>
    </div>
  )
}
