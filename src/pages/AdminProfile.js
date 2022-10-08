import React, { useEffect, useState } from 'react'
import PageLayout from '../components/layout/PageLayout'
import { Link as LinkRouter } from 'react-router-dom'
import '../styles//AdminProfile.css'
import { useDeleteCouponMutation } from '../features/couponApi'
import { toast } from 'react-toastify'


export default function AdminProfile({ functionCountdown, currentCouponId }) {

  let fnCountdown = functionCountdown
  let [deleteCoupon] = useDeleteCouponMutation()
  const [coupon, setCoupon] = useState()

  let handlDeleteCupon = (e) => {
    e.preventDefault()
    setCoupon("")

    deleteCoupon(e.target.currentCode.value).then(
      res => {
        if (res.error) {
          toast.error(res.error.data.message)
        } else {
          toast.success(res.data.message)
        }
      }
    )
  }

  useEffect(() => {
    setCoupon(currentCouponId)
  }, [currentCouponId])
  


  // res.error

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
            <form onSubmit={fnCountdown} className="flex flex-col items-center justify-center">
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
                <span className="label-text text-black text-base text-center">select the number of days the coupon will be available</span>
              </label>
              <input type="number" name="endTime" className="input input-bordered h-10" />
              <div className="form-control mt-6">
              </div>
              <div className='flex flex-col items-center'>
                <button className="btn btn-primary btn-home-page text-xs" type='submit'>Create!</button>
              </div>
            </form>
          </div>

          <div className="cardContainer">
            <img width={150} src="https://cdn-icons-png.flaticon.com/512/2331/2331729.png" alt="Shoes" />
            <div className="subContainer">
              <form onSubmit={handlDeleteCupon} className="flex flex-col items-center justify-center">
                <h2 className="">Remove the current coupon</h2>
                <label className="label">
                  <span className="label-text text-black text-base">Coupon code</span>
                </label>
                <input type="text" name="currentCode" className="input input-bordered h-10 text-xs w-full" value={coupon} disabled />
                <div className="my-5">
                  <button className="btn btn-primary btn-home-page text-xs">Remove</button>
                </div>
              </form>
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
