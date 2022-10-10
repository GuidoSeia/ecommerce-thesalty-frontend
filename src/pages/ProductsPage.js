import React, { useState, useEffect } from 'react'
import '../styles/ProductsPage.css'
import { useGetAllProductsQuery, useGetFilteredProductsQuery } from '../features/productsApi'
import { Link as LinkRouter } from 'react-router-dom'
import PageLayout from "../components/layout/PageLayout"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice'
import { toast } from 'react-toastify';
import CheckboxesProducts from '../components/CheckboxesProducts'

export default function ProductsPage() {

    let params = window.location.search
    let urlParams = new URLSearchParams(params)
    let type = urlParams.get("type")
    let newLatest = urlParams.get("newLatest")

    const dispatch = useDispatch()

    let cart = useSelector((state) => state.cart.cart.cart)
    console.log(cart);

    const logged = useSelector((state) => state.logged.loggedState);

    let { data: allProducts, refetch } = useGetAllProductsQuery()
    let { data: products } = useGetFilteredProductsQuery(type)

    const user = useSelector((state) => state.logged.user);

    const [newLast, setNewLast] = useState()
    const handlegender = (e) => {
        setNewLast(e.target.value)
    }

    useEffect(() => {
        if (!newLatest) {
            setNewLast("all")
        } else if (newLatest == "new") {
            setNewLast("new")
        } else {
            setNewLast("latest")
        }
    }, [])

    const productCard = card => (

        <div key={card._id} className="card cardProduct m-5 shadow-xl">
            <div className="container-img">
                <img className='img-card' src={card.photo?.[0]} alt="Shoes" />
            </div>
            <div className="card-body text-center bg-white text-black flex flex-col justify-start p-5">
                <h2 className="text-center title-card-products">{card.brand} </h2>
                <div className="flex justify-center items-center bg-[#360027] h-full w-full text-white rounded-lg">
                    <p className="p-3">{card.description.length > 100 ? `${card.description.slice(0, 60)}...` : card.description} </p>
                </div>
                <div className="card-actions flex justify-center items-center">
                    <p>$: {card.price}</p>
                    <p>Stock: {card.stock}</p>

                </div>
            </div>
            <div className="flex justify-around bg-white p-2">
                {logged ? <button className="btn btn-products-card " onClick={() => dispatch(addToCart(card))}>Add to cart</button> : <button className="btn btn-products-card" onClick={() => toast.error('Login to add to cart')}>Add to cart</button>}
                <LinkRouter className="btn btn-products-card " to={`/Details?productId=${card._id}`}>Know more</LinkRouter>
            </div>
            <div className="flex justify-center items-center bg-white p-1">
                {user?.role === "admin" ? (<LinkRouter className="btn" to={"/editproduct/" + card._id}>Edit</LinkRouter>) : null}
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
    }

    let show
    if (type == null) {
        switch (newLast) {
            case "all":
                { filter ? show = allProducts?.response?.filter((item => item.brand.includes(filter))).map(productCard) : show = allProducts?.response?.map(productCard) }
                break;
            case "new":
                {
                    filter ? show = allProducts?.response?.filter((item => item.brand.includes(filter))).map(productCard) : show = allProducts?.response?.map(productCard).reverse().slice(0, 8)
                }
                break;
            case "latest":
                {
                    filter ? show = allProducts?.response?.filter((product) =>
                        product.stock <= 10
                    ).filter((item => item.brand.includes(filter))).map(productCard) : show = allProducts?.response?.filter((product) =>
                        product.stock <= 10
                    ).map(productCard)
                }
                break;
        }
    } else {
        { filter ? show = products?.response?.filter((item => item.brand.includes(filter))).map(productCard) : show = products?.response?.map(productCard) }

    }

    return (

        <PageLayout>

            <div className='flex flex-col md:flex-row'>
                <div className='set-sticky z-40 md:h-full md:w-1/6 '>
                    <CheckboxesProducts handlegender={handlegender} checked={newLast}></CheckboxesProducts>
                </div>
                <div className="flex flex-col bg-gray-900 md:w-5/6">
                    <div className="form-control border-b border-black">
                        <label className="input-group input-group-md flex justify-center align-items-center py-2 md:py-4 bg-white">
                            <span>TS</span>
                            <input type="text" placeholder="Search products..." onChange={filterData} className="input input-bordered input-md" />
                        </label>
                    </div>
                    <div className="flex justify-center items-center min-h-screen flex-wrap gap-12 p-5 bg-products-v2">
                        {show?.length > 0 ?
                            <>
                                <h2 className='w-full text-xl font-bold text-black text-center'>{newLast} products</h2>
                                {show}
                            </>
                            :
                            <div>
                                <h1 className="text-black text-lg">No se encontraron resultados.</h1>
                            </div>}
                    </div>
                </div>

            </div>
        </PageLayout>
    )
    // 
}
