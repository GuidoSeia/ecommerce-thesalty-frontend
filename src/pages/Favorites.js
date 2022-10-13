import React from 'react'
import PageLayout from "../components/layout/PageLayout"
import { useSelector, useState } from 'react-redux'
import { useGetAllProductsQuery, useProductsFavouritesMutation } from '../features/productsApi'

export default function MyFavorites() {

  let { data: allProducts } = useGetAllProductsQuery()
  console.log(allProducts)

  const user = useSelector((state) => state.logged.user);
  console.log(user)

  let filterFav = allProducts?.response?.filter((item) => item?.likes?.includes(user?.id))
  console.log(filterFav)

  const favCard = cardF => (
    <div className="flex flex-col">
      <div key={cardF._id} className="card cardProduct shadow-xl font-['Open_Sans']">
        <div className="container-img bg-white flex justify-center items-center">
          <img className='img-card object-cover' src={cardF.photo?.[0]} alt="img" />
        </div>
        <div className="card-body text-center bg-white text-black flex flex-col justify-center py-0">
          <h2 className="text-center title-card-products">{cardF.brand} </h2>
          <div className="card-actions flex justify-center items-center">
            <p className="">Price: ${cardF.price}</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <PageLayout>
      <div style={{display:'flex',color:'blue'}}>
        {filterFav?.length > 0 (filterFav?.map((filterFav) => <favorites filterFav={filterFav} user={user}/>))}
      </div>
      :
      <div>
        <h1 className="text-black text-lg">Don't have favorites yet</h1>
      </div>
    </PageLayout>
  )
}
