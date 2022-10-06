import React from 'react'
import '../styles/Details.css'
import { useEffect, useState, } from 'react'
import apiurl from '../api';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice'

export default function DetailCards() {

  let params = window.location.search
  let urlParams = new URLSearchParams(params)
  let productId = urlParams.get("productId")
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)


  const [detailCards, setDetailCards] = useState([])

  useEffect(() => {
    axios.get(apiurl + '/products/' + productId)
      .then(response => {
        setDetailCards(response.data.response)
      }
      )
  }, [productId])

  console.log(detailCards)
  return (
    <div className='DetailCards-Container'>
      <div className="mx-auto pt-6 w-full px-6 lg:grid  lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
          <img
            src={detailCards.photo}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
            <img
              src={detailCards.photo}
              className="h-72 w-full object-cover object-center"
            />
          </div>
          <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
            <img
              src={detailCards.photo}
              className="h-72 w-full object-cover object-center"
            />
          </div>
        </div>
        <div className="aspect-w-4 aspect-h-5 rounded-lg sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
          <img
            src={detailCards.photo}
            className="h-full w-full object-cover object-center rounded-lg"
          />
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl">{detailCards.brand}</h1>
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <p className="text-base sm:text-2xl tracking-tight py-3 text-gray-900">{detailCards.description}</p>
          </div>
        </div>
        <div className="py-2">
        <p className="text-base md:text-2xl tracking-tight py-2 text-gray-900">Model: {detailCards.model}</p>
          <p className="text-base md:text-2xl tracking-tight py-2 text-gray-900">Price: {detailCards.price}</p>
          <p className="text-base md:text-2xl tracking-tight py-2 text-gray-900">Stock: {detailCards.stock}</p>
          <div className="rating py-2">
            <input type="radio" name="rating-1" className="mask mask-star" checked />
            <input type="radio" name="rating-1" className="mask mask-star" />
            <input type="radio" name="rating-1" className="mask mask-star" />
            <input type="radio" name="rating-1" className="mask mask-star" />
            <input type="radio" name="rating-1" className="mask mask-star" />
          </div> 
          <div>
          <button
            type="submit"
            className="mt-10 btn-details flex ml-24 w-full items-center justify-center rounded-md  bg-indigo-600 py-3 px-8 text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >Add favorites </button>
          <button
            onClick={() => dispatch(addToCart(detailCards))}
            className="mt-10 btn-details flex ml-24 w-full items-center justify-center rounded-md  bg-indigo-600 py-3 px-8 text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >Add to cart</button>

          </div>
        </div>
      </div>

    </div>



  )
}
