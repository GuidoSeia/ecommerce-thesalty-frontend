import React from 'react'
import '../styles/Details.css'
import { useEffect, useState, } from 'react'
import apiurl from '../api';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import Review from '../components/Review';

export default function DetailCards() {

  let params = window.location.search

  let urlParams = new URLSearchParams(params)

  let productId = urlParams.get("productId")

  const logged = useSelector((state) => state.logged.loggedState)
  
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart.cart.cart)

  const [detailCards, setDetailCards] = useState([])

  useEffect(() => {
    axios.get(apiurl + '/products/' + productId)
      .then(response => {
        setDetailCards(response.data.response)
      }
      )
  }, [productId])

  return (
    <div className='DetailCards-Container flex flex-col justify-center items-center'>
      <div className="mx-auto pt-6 w-full px-6 lg:grid  lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
          <img
            src={detailCards?.photo?.[0]}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
            <img
              src={detailCards?.photo?.[1]}
              className="h-72 w-full object-cover object-center"
            />
          </div>
          <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
            <img
              src={detailCards?.photo?.[2]}
              className="h-72 w-full object-cover object-center"
            />
          </div>
        </div>
        <div className="aspect-w-4 aspect-h-5 rounded-lg sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
          <img
            src={detailCards?.photo?.[3]}
            className="h-full w-full object-cover object-center rounded-lg"
          />
        </div>
      </div>
      <div className="flex justify-center items-center flex-wrap">
      <div className="mx-auto px-4 pt-10 pb-10 flex justify-center items-center flex-wrap">
        <div className="lg:col-span-2 lg:pr-8 mx-5">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">{detailCards.brand} <span className="badge badge-lg">NEW</span></h1>
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <p className="text-2xl tracking-tight py-3 text-gray-900">{detailCards.description}</p>
          </div>
        </div>

  <div className="flex justify-center px-4 flex-wrap">
        <div className="flex justify-center flex-col items-center flex-wrap">
        <p className=" text-base md:text-2xl tracking-tight py-2 text-gray-900">Model: {detailCards.model}</p>
          <p className=" text-base md:text-2xl tracking-tight py-2 text-gray-900">Price: ${detailCards.price}</p>
          <p className=" text-base md:text-2xl tracking-tight py-2 text-gray-900">Stock: {detailCards.stock}</p>
          </div>
          <div className="flex justify-center items-center flex-col mb-10 mx-20">
          { logged ? <button
            onClick={() => dispatch(addToCart(detailCards))}
            className="mt-10 btn-details rounded-md  bg-indigo-600 py-3 px-8 text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >Add to cart 🛒</button> : <button onClick={()=>toast.error('Login to add to cart')}
          className="mt-10 btn-details rounded-md  bg-indigo-600 py-3 px-8 text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >Add to cart 🛒</button>}
          <button className="btn btn-details mt-10" onClick={() => navigate(-1)}>Go back</button>
          </div>
        </div>
      </div>
      </div>
      <Review />
      </div>
      
  )
}

