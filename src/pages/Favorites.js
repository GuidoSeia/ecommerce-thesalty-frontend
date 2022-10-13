import React from 'react'
import PageLayout from "../components/layout/PageLayout"
import { useSelector, useState } from 'react-redux'
import { useGetAllProductsQuery, useProductsFavouritesMutation } from '../features/productsApi'

export default function MyFavorites() {

  let { data: allProducts, refetch } = useGetAllProductsQuery()
  console.log(allProducts)

  const user = useSelector((state) => state.logged.user);
  console.log(user)

  let filterFav = allProducts?.response?.filter((item) => item?.likes?.includes(user?.id))
  console.log(filterFav)

  const [likeOrDislike] = useProductsFavouritesMutation()

  async function like(event) {
    await likeOrDislike(event.target.id)
      .then((item)=>{
        refetch()
        console.log(item);
      })
  }

  const favCard = card => (
    <div className="flex flex-col">
      <div key={card?._id} className="card cardProduct shadow-xl font-['Open_Sans']">
        <div className="container-img bg-white flex justify-center items-center">
          <img className='img-card object-cover' src={card.photo?.[0]} alt="img" />
        </div>
        <div className="card-body text-center bg-white text-black flex flex-col justify-center py-0">
          <h2 className="text-center title-card-products">{card.brand} </h2>
          <div className="card-actions flex justify-center items-center">
            <p className="">Price: ${card.price}</p>
          </div>
        </div>
        <button className="btn btn-ghost" id={card._id} onClick={like}>Remove</button>
      </div>
    </div>
  )

  return (
    <PageLayout>
      <div className="flex justify-start items-center flex-col" style={{minHeight: '75vh'}}>
        <h2 className="flex justify-center items-center text-4xl my-10">Favorites!</h2>
        <div className="flex justify-center items-center gap-12 mt-5 flex-wrap m-10">
          {filterFav.map(favCard)}
        </div>
      {filterFav.length == 0 ? <div>
        <h1 className="text-white text-2xl md:text-4xl">No favorites found...</h1>
      </div> : null }
      </div>
    </PageLayout>
  )
}
