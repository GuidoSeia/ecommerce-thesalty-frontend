import React from 'react'
import '../styles/Review.css'
import { useEffect, useState, } from 'react'
import apiurl from '../api';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function Review() {

      let params = window.location.search

      let urlParams = new URLSearchParams(params)

      let productId = urlParams.get("productId")

      const [reviewCards, setReviewCards] = useState([])

      useEffect(() => {
            axios.get(apiurl + '/products/' + productId)
                  .then(response => {
                        setReviewCards(response.data.response)
                        console.log(reviewCards);
                  }
                  )
      }, [productId])


      return (
<div>
            <div className='titleContainer text-white flex items-center justify-center h-28 '>
                  <h2 className=' text-5xl font-mono font-semibold tracking-wide'>Customer Reviews</h2>
            </div>        
            <div className='reviewContainer flex items-center justify-center '>
                  <div className='containerAllData  mb-2 w-11/12 mt-2  bg-white'>
                        <div className='containerIntro mb-10 mt-5 flex w-full'>
                              <div className='containerProduct w-4/12'>
                                    <h2 className='text-black text-4xl font-bold mb-2  ml-5 mt-2'>Rolex padre</h2>
                                    <div className="rating rating-lg  ml-5">
                                          <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
                                          <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400"  />
                                          <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
                                          <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" checked />
                                          <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" />
                                          <h4 className='text-black text-2xl font-bold ml-4 mt-1'> 4/5</h4>
                                    </div>
                                    <img src="/relojes-hombre-abaco.webp" width="250" className='mt-5 rounded-lg  ml-5'/>
                              </div>
                              
                              <div className='w-4/12 flex flex-col mt-24 ml-24 justify-center mb-4'>
                                    <p className='min-w-max'>5★</p>
                                    <progress className="progress progress-black w-56 min-w-max" value="60" max="100">22</progress>          
                                    <p>4★</p>
                                    <progress className="progress progress-black w-56" value="38" max="100">22</progress>
                                    <p>3★</p>
                                    <progress className="progress progress-black w-56" value="30" max="100">22</progress>
                                    <p>2★</p>
                                    <progress className="progress progress-black w-56" value="8" max="100">22</progress>
                                    <p>1★</p>
                                    <progress className="progress progress-black w-56" value="12" max="100">33</progress>
                              </div>

                              <label htmlFor="my-modal-5" className="btn modal-button">Add review</label>

                                          <input type="checkbox" id="my-modal-5" className="modal-toggle" />
                                          <div className="modal">
                                                <div className="modal-box w-11/12 max-w-5xl">
                                                      <h1 className="font-bold text-2xl text-purple-900 text-center">My review for {reviewCards.brand}</h1>
                                                      <div className='flex flex-row'>
                                                            <div className='m-4  mr-14'>
                                                                  <img src={reviewCards?.photo?.[0]} className="h-48 w-48 my-4 object-cover object-center" />
                                                                  <img src={reviewCards?.photo?.[1]} className="h-48 w-48 my-4 object-cover object-center" />
                                                                  <img src={reviewCards?.photo?.[3]} className="h-48 w-48 my-4 object-cover object-center" />
                                                            </div>
                                                            <div className='w-full'>
                                                                  <p className="py-4 text-xl">Hi! Know the experience of our customers is too important for us, share yours!</p>
                                                                  <form>
                                                                        <div className="form-review my-4">
                                                                              <label className="label">
                                                                                    <span className="label-text text-xl">Review Title</span>
                                                                              </label>
                                                                              <input type="text" placeholder="Example: Fantastic product!" className="input input-bordered input-primary w-full max-w-xs" />
                                                                        </div>
                                                                        <div className="form-review my-4">
                                                                              <label className="label">
                                                                                    <span className="label-text text-xl">Review</span>
                                                                              </label>
                                                                              <input type="text" placeholder="Example: I got thi product and it's really good" className="input input-bordered input-primary w-full max-w-xs" />
                                                                        </div>
                                                                        <div className="form-review my-4">
                                                                              <label className="label">
                                                                                    <span className="label-text text-xl">location</span>
                                                                              </label>
                                                                              <input type="text" placeholder="Example: New York, NY" className="input input-bordered input-primary w-full max-w-xs" />
                                                                        </div>
                                                                        <div>
                                                                        <p className='text-xl my-4'>How old are you?</p>
                                                                              <select className="select select-primary w-full max-w-xs">
                                                                                    <option disabled selected>Select</option>
                                                                                    <option>17 or under</option>
                                                                                    <option>18 to 28</option>
                                                                                    <option>28 to 38</option>
                                                                                    <option>38 to 48</option>
                                                                                    <option>49 or over</option>
                                                                              </select>
                                                                        </div>
                                                                        <div>
                                                                              <div className="rating my-6">
                                                                                    <p className='text-xl mr-6'>How would you rate this product? </p>
                                                                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-purple-400" />
                                                                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-purple-400" />
                                                                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-purple-400" checked />
                                                                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-purple-400" />
                                                                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-purple-400" />
                                                                              </div>
                                                                        </div>
                                                                  </form>
                                                                  <div className="modal-action">
                                                                        <label htmlFor="my-modal-5" className="btn shadow-md">Send review</label>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                              
                        </div>
                        <div className='containerReviews'>
                              <h2 className='text-Answ text-white flex items-center justify-start h-28 text-4xl ml-5 font-mono font-semibold tracking-wide'>What do our users say ?</h2>
                              <div className='containerCards flex space-x-14 flex justify-center'>

                                    <div className="cardReview w-96 bg-base-100 shadow-xl w-1/4">
                                          <div className="card-body flex justify-center items-center">                                  
                                                <div className="avatar">
                                                      <div className="w-24 rounded-full">
                                                      <img src="https://placeimg.com/192/192/people" />
                                                      </div>                                         
                                                </div>
                                                      <h2 className="card-title">Card title!</h2>
                                                      <p className=''>If a dog chews shoes whose shoes does he choose?</p>
                                                      <div className="rating">
                                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"  />
                                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked/>
                                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                      </div>
                                                
                                          </div>
                                    </div>
                                    <div className="cardReview w-96 bg-base-100 shadow-xl w-1/4">
                                          <div className="card-body flex justify-center items-center">                                  
                                                <div className="avatar">
                                                      <div className="w-24 rounded-full">
                                                      <img src="https://placeimg.com/192/192/people" />
                                                      </div>
                                                </div>
                                                      <h2 className="card-title">Card title!</h2>
                                                      <p className=''>If a dog chews shoes whose shoes does he choose?</p>
                                                      <div className="rating">
                                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"  />
                                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked/>
                                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                      </div>
                                          </div>
                                    </div>
                                    <div className="cardReview w-96 bg-base-100 shadow-xl w-1/4">
                                          <div className="card-body flex justify-center items-center">                                  
                                                <div className="avatar">
                                                      <div className="w-24 rounded-full">
                                                      <img src="https://placeimg.com/192/192/people" />
                                                      </div>
                                                </div>
                                                      <h2 className="card-title">Card title!</h2>
                                                      <p className=''>If a dog chews shoes whose shoes does he choose?</p>
                                                      <div className="rating">
                                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400"  />
                                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked/>
                                                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                                                      </div>
                                          </div>      
                                    </div>  
                              </div>     
                              </div>                                                                                      
      
                              <div className="collapse ">
                                    <input type="checkbox" className='input-collapse' /> 
                                    <div className="collapse-title text-xl font-medium flex justify-center align-center mb-2 mt-10 w-46 text-center">
                                    <p className='text-center ml-4'>Click to see all reviews</p>
                                    </div>
                                    <div className="collapse-content w-8/12 flex justify-self-center justify-center items-center flex-wrap"> 
                                          <div className='card- w-full bg-white h-26 mt-3 flex'>
                                                <div className='card-userReview flex flex-col'>
                                                      <div className="avatar">
                                                            <div className="w-24 ml-7 mt-2 rounded-full">
                                                            <img src="https://placeimg.com/192/192/people" />
                                                            </div>
                                                      </div>
                                                      <div className="rating rating-xs ml-11 mt-3 mb-2">
                                                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" checked />
                                                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                                            <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                                      </div>                                               
                                                </div>
                                                <div className='containerUserInfo text-black flex flex-col justify-center ml-4 mr-5'>
                                                      <h3 className='font-bold text-center text-sm'>Guido Seia</h3>
                                                      <p className='text-sm'> Cordoba</p>
                                                      <p className='text-sm'> 21 years</p>
                                                      
                                                </div>
                                                <div className='review-box'>
                                                      <h3 className='font-bold text-center '>Amazing product !</h3>
                                                      <p className='ml-3 '>A backpack for school, to go to work, or to go on a trip. Spacious, lightweight, and durable enough to go wherever you need it. Sober on the outside, citrusy on the inside</p>
                                                </div>
                                                
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      
  )
 }

export default Review