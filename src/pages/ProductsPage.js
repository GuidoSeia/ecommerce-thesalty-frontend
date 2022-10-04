import React from 'react'
import '../styles/ProductsPage.css'
import { useGetAllProductsQuery ,useGetFilteredProductsQuery } from '../features/productsApi'
import { Link as LinkRouter } from 'react-router-dom'
import PageLayout from "../components/layout/PageLayout"
import { type } from '@testing-library/user-event/dist/type'

export default function ProductsPage() {

    let params = window.location.search
    let urlParams = new URLSearchParams(params)
    let type = urlParams.get("type")

    let { data: allProducts } = useGetAllProductsQuery(type)
    let { data: products } = useGetFilteredProductsQuery(type)

    const productCard = card => (
        <div key={card._id} className="card card-products w-72 bg-base-100 shadow-xl">
            <figure className='h-2/5'><img className='w-full h-full object-cover' src={card.photo} alt="Shoes" /></figure>
            <div className="card-body h-3/5 text-center bg-white text-black flex flex-col justify-start p-5">
                <h2 className="text-center title-card-products">{card.brand} </h2>
                <p>{card.description.length > 100 ? `${card.description.slice(0, 100)}...` : card.description} </p>
                <div className="card-actions items-center">
                    <p>$: {card.price}</p>
                    <p>Stock: {card.stock}</p>
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    )

    let show
    if (type == null) {
        show = allProducts?.response.map(productCard)
    } else {
        show = products?.response.map(productCard)
    }

    return (

        <PageLayout>
            <div className="flex justify-center items-center flex-wrap gap-12 p-5 bg-products-v2">
                {show}
            </div>
        </PageLayout>
    )

}
