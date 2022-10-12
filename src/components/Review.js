import React from "react";
import "../styles/Review.css";
import { useEffect, useState, useRef } from "react";
import { useNewReviewMutation, useGetReviewsMutation } from "../features/reviewApi";
import apiurl from "../api";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { refresh } from '../features/refreshSlice'

function Review() {
  let params = window.location.search;

  const dispatch = useDispatch()
  let refreshed = useSelector((state) => state.refresh.refreshState) 
  let urlParams = new URLSearchParams(params);
  const logged = useSelector((state) => state.logged.loggedState)

  let productId = urlParams.get("productId");

  const [reviewCards, setReviewCards] = useState([]);

  const showError = (msj) => {
    toast.error(msj, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  const showMsg = () => {
    toast.success(`Review created !`, {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  };

  useEffect(() => {
    axios.get(apiurl + "/products/" + productId).then((response) => {
      setReviewCards(response.data.response);
    });
  }, [productId]);

  const user = useSelector((state) => state.logged.user);

  /* New comment */

  const [addNewReview] = useNewReviewMutation();

  const reviewTitleRef = useRef();
  const reviewRef = useRef();
  const locationRef = useRef();
  const ageRef = useRef();
  const starRef = useRef();
  const formRef = useRef();

  const newReview = async (review) => {
    await addNewReview(review)
      .then((success) => {
        dispatch(refresh())
        formRef.current.reset();
        showMsg()
      })
      .catch((error) => {
        console.log(error);
        showError()
      });
  };

  const handleReview = async (e) => {
    e.preventDefault();

    let review = {
      user: user?.id,
      product: productId,
      reviewTitle: reviewTitleRef.current.value,
      review: reviewRef.current.value,
      location: locationRef.current.value,
      age: ageRef.current.value,
      star: e.target.rating.value,
    };

    if (
      reviewTitleRef.current.value == "" ||
      reviewRef.current.value == "" ||
      locationRef.current.value == "" ||
      ageRef.current.value == ""
    ) {
      showError("Please complete all inputs");
    } else {
      console.log(review);
      newReview(review)
    }
  };

  /* get comments */

  const [ getData ] = useGetReviewsMutation()
  const [info, setInfo] = useState()


  async function allReviews() {
    await getData(productId) 
      .then((res) => {
        if (res.data?.success) {
          setInfo(res.data?.response)
        } else {
          console.log(res.error);
        }
      })
    }

    useEffect(() => {
      allReviews()
    }, [refreshed])
    

  return (
    <div className="w-screen">
      <div className="reviewContainer flex flex-wrap items-center justify-center">
        <div className="containerAllData w-10/12 mb-2  bg-white">
          <div className="containerIntro flex justify-evenly items-center flex-wrap">    
           
          </div> 

          <div className="containerReviews w-full">
           <div className="flex items-center mt-1">
            <h2 className="text-Answ text-white flex items-center justify-start w-full h-28 text-5xl ml-5 font-mono font-semibold tracking-wide">
              What do our users say?
            </h2>
            {logged? <label htmlFor="my-modal-5" className="btn-review modal-button flex items-center justify-center ">Add review</label> : null}
            
            </div>
            <input type="checkbox" id="my-modal-5" className="modal-toggle  " />
           <div className="modal">
              <div className="modal-box w-11/12 max-w-5xl">
              <label htmlFor="my-modal-5" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
              <h1 className="font-bold text-2xl text-purple-900 text-center">My review for {reviewCards.brand}</h1>
              <div className='flex flex-row'>             
                  <div className='m-4  mr-14'>
                    <img
                      src={reviewCards?.photo?.[0]}
                      className="h-48 w-48 my-4 object-cover object-center"
                    />
                    <img
                      src={reviewCards?.photo?.[1]}
                      className="h-48 w-48 my-4 object-cover object-center"
                    />
                    <img
                      src={reviewCards?.photo?.[3]}
                      className="h-48 w-48 my-4 object-cover object-center"
                    />
                  </div>
                  <div className="w-full">
                    <p className="py-4 text-xl">
                      Hi! Know the experience of our customers is too important
                      for us, share yours!
                    </p>
                    <form onSubmit={handleReview} ref={formRef}>
                      <div className="form-review my-4">
                        <label className="label">
                          <span className="label-text text-xl">
                            Review Title
                          </span>
                        </label>
                        <input
                          type="text"
                          ref={reviewTitleRef}
                          placeholder="Example: Fantastic product!"
                          className="input input-bordered input-primary w-full max-w-xs"
                        />
                      </div> 
                      <div className="form-review my-4">
                        <label className="label">
                          <span className="label-text text-xl">Review</span>
                        </label>
                        <input
                          type="text"
                          ref={reviewRef}
                          placeholder="Example: I got thi product and it's really good"
                          className="input input-bordered input-primary w-full max-w-xs"
                        />
                      </div>
                      <div className="form-review my-4">
                        <label className="label">
                          <span className="label-text text-xl">Location</span>
                        </label>
                        <input
                          type="text"
                          ref={locationRef}
                          placeholder="Example: New York, NY"
                          className="input input-bordered input-primary w-full max-w-xs"
                        />
                      </div>
                      <div>
                        <p className="text-xl my-4">How old are you?</p>
                        <input
                          type="number"
                          ref={ageRef}
                          placeholder="Example: 22"
                          className="input input-bordered input-primary w-full max-w-xs"
                        />
                      </div>
                      <div>
                        <div className="rating my-6">
                          <p className="text-xl mr-6">
                            How would you rate this product?{" "}
                          </p>
                          <input
                            type="radio"
                            value={1}
                            name="rating"
                            className="mask mask-star-2 bg-purple-400"
                            
                          />
                          <input
                            type="radio"
                            value={2}                            
                            name="rating"
                            className="mask mask-star-2 bg-purple-400"
                          />
                          <input
                            type="radio"
                            value={3}
                            name="rating"
                            className="mask mask-star-2 bg-purple-400"
                          />
                          <input
                            type="radio"
                            value={4}
                            name="rating"
                            className="mask mask-star-2 bg-purple-400"
                          />
                          <input
                            type="radio"
                            value={5}
                            name="rating"
                            className="mask mask-star-2 bg-purple-400"
                          />
                        </div> 
                      </div> 

                      <div className="modal-action">
                        <button
                          type="submit"
                          htmlFor="my-modal-5"
                          className="btn-review shadow-md"
                        >
                          Send review
                        </button>
                      </div> 
                    </form> 
                  </div>
                </div>
              </div> 
            </div>
            <div className="containerCards flex space-x-14 justify-center">

              {info?.length == 3 ?
            <div className="divAllCards">
              <div className="cardReview bg-base-100 shadow-xl ">   
                <div className="card-body flex justify-center items-center ">
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={info?.[0].user?.photo} />
                    </div>
                  </div>
                  <h2 className="card-title">{info?.[0].reviewTitle}</h2>
                  <p>
                  {info?.[0].review}
                  </p>

                  <div className="rating">                
                    {
                          info?.[0].star == 1?    
                          <div>                
                          <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />                     
                          
                        </div> 
                        :info?.[0].star == 2?
                        <div>
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                            disabled
                          />                      
                        
                        </div> 

                        :info?.[0].star == 3?
                        <div> 
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        </div>

                        :info?.[0].star == 4?  
                        <div>                                         
                          <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        </div>

                        :info?.[0].star == 5?
                        <div>
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        </div> 

                        : ""
                      
                    }
                    
                  </div>                   
                 </div>                
              </div> 
              <div className="cardReview bg-base-100 shadow-xl w-full">   
                <div className="card-body flex justify-center items-center w-full">
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={user?.photo} />
                    </div>
                  </div>
                  <h2 className="card-title">{info?.[1].reviewTitle}</h2>
                  <p>
                  {info?.[1].review}
                  </p>

                  <div className="rating">                
                    {
                          info?.[1].star == 1?    
                          <div>                
                          <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />                     
                        
                        </div> 
                        :info?.[1].star == 2?
                        <div>
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />                      
                        
                        </div> 

                        :info?.[1].star == 3?
                        <div> 
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        </div>

                        :info?.[1].star == 4?  
                        <div>                                         
                          <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled 
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled  
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        </div>

                        :info?.[1].star == 5?
                        <div>
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        </div> 

                        : ""
                      
                    }
                    
                  </div>                   
                 </div>                
              </div>           
              <div className="cardReview bg-base-100 shadow-xl w-full">   
                <div className="card-body flex justify-center items-center w-full">
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={info?.[2].user?.photo} />
                    </div>
                  </div>
                  <h2 className="card-title">{info?.[2].reviewTitle}</h2>
                  <p>
                  {info?.[2].review}
                  </p>

                  <div className="rating">                
                    {
                          info?.[2].star == 1?    
                          <div>                
                          <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />                     
                        
                        </div> 
                        :info?.[2].star == 2?
                        <div>
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />                      
                        
                        </div> 

                        :info?.[2].star == 3?
                        <div> 
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        </div>

                        :info?.[2].star == 4?  
                        <div>                                         
                          <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        </div>

                        :info?.[2].star == 5?
                        <div>
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        </div> 

                        : ""
                      
                    }
                    
                  </div>                   
                 </div>                
              </div> 
            </div>
              : info?.length == 2 ?
              <div className="divAllCards">
              <div className="cardReview bg-base-100 shadow-xl w-full">   
                <div className="card-body flex justify-center items-center w-full">
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={info?.[0].user?.photo} />
                    </div>
                  </div>
                  <h2 className="card-title">{info?.[0].reviewTitle}</h2>
                  <p>
                  {info?.[0].review}
                  </p>

                  <div className="rating">                
                    {
                          info?.[0].star == 1?    
                          <div>                
                          <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />                     
                          
                        </div> 
                        :info?.[0].star == 2?
                        <div>
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                            disabled
                          />                      
                        
                        </div> 

                        :info?.[0].star == 3?
                        <div> 
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        </div>

                        :info?.[0].star == 4?  
                        <div>                                         
                          <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        </div>

                        :info?.[0].star == 5?
                        <div>
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        </div> 

                        : ""
                      
                    }
                    
                  </div>                   
                 </div>                
              </div> 
              <div className="cardReview bg-base-100 shadow-xl w-full">   
                <div className="card-body flex justify-center items-center w-full">
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={user?.photo} />
                    </div>
                  </div>
                  <h2 className="card-title">{info?.[1].reviewTitle}</h2>
                  <p>
                  {info?.[1].review}
                  </p>

                  <div className="rating">                
                    {
                          info?.[1].star == 1?    
                          <div>                
                          <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />                     
                        
                        </div> 
                        :info?.[1].star == 2?
                        <div>
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />                      
                        
                        </div> 

                        :info?.[1].star == 3?
                        <div> 
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        </div>

                        :info?.[1].star == 4?  
                        <div>                                         
                          <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled 
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled  
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        </div>

                        :info?.[1].star == 5?
                        <div>
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        </div> 

                        : ""
                      
                    }
                    
                  </div>                   
                 </div>                
              </div>    
              </div>
              :info?.length == 1 ?
              <div className="divAllCards w-full">
              <div className="cardReview bg-base-100 shadow-xl w-full">   
                <div className="card-body flex justify-center items-center w-full">
                  <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={info?.[0].user?.photo} />
                    </div>
                  </div>
                  <h2 className="card-title">{info?.[0].reviewTitle}</h2>
                  <p>
                  {info?.[0].review}
                  </p>

                  <div className="rating">                
                    {
                          info?.[0].star == 1?    
                          <div>                
                          <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />                     
                          
                        </div> 
                        :info?.[0].star == 2?
                        <div>
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                            disabled
                          />                      
                        
                        </div> 

                        :info?.[0].star == 3?
                        <div> 
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        </div>

                        :info?.[0].star == 4?  
                        <div>                                         
                          <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        </div>

                        :info?.[0].star == 5?
                        <div>
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"
                          disabled
                          />
                          
                        
                        </div> 

                        : ""
                      
                    }
                    
                  </div>                   
                 </div>                
              </div> 
              
              </div>
              
              :<h2 className="text-black text-center text-3xl flex justify-center items-center mt-28">The product has not reviews </h2> 
            } 

          </div> 

               <div className="collapse ">
                  <input type="checkbox" className="input-collapse" />
                  <div className="collapse-title text-xl font-medium flex justify-center align-center mb-2 mt-10 w-46 text-center">
                    <p className="text-center ml-4">Click to see all reviews</p>
                  </div>
                  
                  <div className="collapse-content w-8/12 flex justify-self-center justify-center items-center flex-wrap">
                    {info?.length > 0 ? (info?.map((info) => 
                      (
                    <div className="card- w-full bg-white h-26 mt-3 flex">
                      <div className="card-userReview flex flex-col">
                        <div className="avatar">
                          <div className="w-24 ml-7 mt-2 rounded-full">
                            <img src={info?.user?.photo} />
                          </div>
                        </div>
                        <div className="rating rating-xs ml-11 mt-3 mb-2">
                        {
                          info.star == 1?    
                          <div>                
                          <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"/>                     
                        
                        </div> 
                        :info.star == 2?
                        <div>
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"/>
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"/>                      
                        
                        </div> 

                        :info.star == 3?
                        <div> 
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"/>
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"/>
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"/>
                          
                        
                        </div>

                        :info.star == 4?  
                        <div>                                         
                          <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"/>
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"/>
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"/>
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"/>
                          
                        
                        </div>

                        :info.star == 5?
                        <div>
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"/>
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"/>
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"/>
                          
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"/>
                          
                        
                        
                        <input
                          type="radio"
                          name="rating-2"
                          className="mask mask-star-2 bg-orange-400"/>
                          
                        
                        </div> 

                        : ""
                      
                    }
                        </div>  
                      </div>  
                      <div className="containerUserInfo w-3/12 text-black flex flex-col justify-center text-center ml-4 mr-5">
                        <h3 className="font-bold text-center text-sm">{info?.user?.name}</h3>
                        <p className="text-sm"> {info.location}</p>
                        <p className="text-sm"> {info.age} years</p>
                      </div>
                      <div className="review-box w-96">
                        <h3 className="font-bold text-center ">{info.reviewTitle}</h3>
                        <p className="ml-3 ">
                          {info.review}
                        </p>
                      </div>
                    </div>))) :<h2 className="text-black text-center text-3xl flex justify-center items-center mt-4">The product has not reviews </h2>                                                                      
                    }
                  </div>  
                </div>  
            </div>               
        </div> 
      </div> 
   </div> 

  );
}

export default Review;
