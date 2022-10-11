import React, { useState, useEffect } from 'react'
import '../styles/ProductsPage.css'
import { useGetAllProductsQuery, useGetFilteredProductsQuery } from '../features/productsApi'
import { Link as LinkRouter } from 'react-router-dom'
import PageLayout from "../components/layout/PageLayout"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice'
import { toast } from 'react-toastify';
import { useProductsFavoritesMutation } from '../features/productsApi'

export default function ProductsPage() {

    let params = window.location.search
    let urlParams = new URLSearchParams(params)
    let type = urlParams.get("type")
    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart.cart)

    const logged = useSelector((state) => state.logged.loggedState);

    let { data: allProducts } = useGetAllProductsQuery(type)
    let { data: products } = useGetFilteredProductsQuery(type)

    let user = JSON.parse(localStorage.getItem('userLogged'))
    let userRole = user?.role

    const [likeOrDislike] = useProductsFavoritesMutation()

    async function like(event) {
        console.log(event);
        await likeOrDislike(event.target.id)
        console.log(allProducts?.response)
  }

    const productCard = card => (
        <div key={card._id} className="card card-products w-72 bg-base-100 shadow-xl">
            <figure className='h-2/5'><img className='w-full h-full object-cover' src={card.photo?.[0]} alt="Shoes" /></figure>
            <div className="card-body h-3/5 text-center bg-white text-black flex flex-col justify-start p-5">
                <h2 className="text-center title-card-products">{card.brand} </h2>
                <p>{card.description.length > 100 ? `${card.description.slice(0, 100)}...` : card.description} </p>
                <div className="card-actions items-center">
                    <p>$: {card.price}</p>
                    <p>Stock: {card.stock}</p>
                </div>
            </div>
            <div className="flex justify-around bg-white p-3">
                { logged ? <button className="btn m-2" onClick={() => dispatch(addToCart(card))}>Add to cart</button> : <button className="btn m-2" onClick={()=>toast.error('Login to add to cart')}>Add to cart</button> }
                <LinkRouter className="btn m-2" to={`/Details?productId=${card._id}`}>Know more</LinkRouter>
            </div>
            <div className="flex justify-center items-center bg-white">
            {userRole === "admin" ? (<LinkRouter className="btn m-2" to={"/editproduct/" + card._id}>Edit</LinkRouter>) : null}
            </div>
            <div>
                <button className="btn m-2" id={card?._id} onClick={like}>Add to favorites</button>
            </div>
        </div>
    )

    const [filter, setFilter] = useState()

    function upperCaseOne(search) {
        return search.charAt(0).toUpperCase() + search.slice(1)
    }

    const filterData = (e) => {
        e.preventDefault()
        setFilter(upperCaseOne(e.target.value));
        console.log(filter);
    }

    let show
    if (type == null) {
        { filter ? show = allProducts?.response?.filter((item => item.brand.includes(filter))).map(productCard) : show = allProducts?.response?.map(productCard) }
    } else {
        { filter ? show = products?.response?.filter((item => item.brand.includes(filter))).map(productCard) : show = products?.response?.map(productCard) }
    }

    return (

        <PageLayout>
            <div className="form-control">
                <label className="input-group input-group-md flex justify-center align-items-center py-4 bg-white">
                    <span>TS</span>
                    <input type="text" placeholder="Search products..." onChange={filterData} className="input input-bordered input-md" />
                </label>
            </div>
            <div className="flex justify-center items-center min-h-screen flex-wrap gap-12 p-5 bg-products-v2">
                {show?.length > 0 ? show : <div><h1 className="text-black text-lg">No se encontraron resultados.</h1></div>}
            </div>
        </PageLayout>
    )

}
