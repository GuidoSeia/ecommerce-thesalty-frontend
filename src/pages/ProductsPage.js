import React, { useState, useEffect } from 'react'
import '../styles/ProductsPage.css'
import { useGetAllProductsQuery, useGetFilteredProductsQuery } from '../features/productsApi'
import { Link as LinkRouter } from 'react-router-dom'
import PageLayout from "../components/layout/PageLayout"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cartSlice'
import { toast } from 'react-toastify';

import { useProductsFavouritesMutation } from '../features/productsApi'
import CheckboxesProducts from '../components/CheckboxesProducts'


export default function ProductsPage() {

    let params = window.location.search
    let urlParams = new URLSearchParams(params)
    let type = urlParams.get("type")
    let newLatest = urlParams.get("newLatest")

    const dispatch = useDispatch()

    const logged = useSelector((state) => state.logged.loggedState);

    let { data: allProducts, refetch } = useGetAllProductsQuery()
    let { data: products } = useGetFilteredProductsQuery(type)

    const user = useSelector((state) => state.logged.user);

    const [newLast, setNewLast] = useState()
    const handlegender = (e) => {
        setNewLast(e.target.value)
    }

    const showLike = (like) => {
        refetch()
        if (like[0].includes('Itinerary-dislike-btn')) {
            toast.success(`Product removed from favourites`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        } else {
            toast.success(`Product added to favourites`, {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }
    };

    useEffect(() => {
        if (!newLatest) {
            setNewLast("all")
        } else if (newLatest == "new") {
            setNewLast("new")
        } else {
            setNewLast("latest")
        }
    }, [])

    const [likeOrDislike] = useProductsFavouritesMutation()

    async function like(event) {
        refetch()
        await likeOrDislike(event.target.id)
            .then((res) => {
                showLike(event.target.classList)
            })
    }

    const productCard = card => (
        <div className="flex flex-col">
        <div key={card._id} className="card cardProduct shadow-xl font-['Open_Sans']">
            <div className="container-img bg-white flex justify-center items-center">
                <img className='img-card object-cover' src={card.photo?.[0]} alt="Shoes" />
            </div>
            <div className="card-body text-center bg-white text-black flex flex-col justify-center py-0">
                <h2 className="text-center title-card-products">{card.brand} </h2>
                <div className="card-actions flex justify-center items-center">
                    <p className="">Price: ${card.price}</p>
                </div>
            </div>
            <div className="flex justify-around bg-white">
                {logged ? <button className="btn m-2 text-xs text-white pl-3 min-h-0 h-10" onClick={() => dispatch(addToCart(card))}>Add to cart</button> : <button className="btn m-2 text-xs text-white pl-3 min-h-0 h-10" onClick={() => toast.error('Login to add to cart')}>Add to cart</button>}
                <LinkRouter className="btn m-2 text-xs text-white pl-3 min-h-0 h-10" to={`/Details?productId=${card._id}`}>Details</LinkRouter>
            </div>
            <div className="bg-white flex justify-center items-center">
                {user ?
                    !card?.likes?.includes(user?.id) ?
                        <span className={'Itinerary-like-btn'} style={{ cursor: 'pointer' }} onClick={like} id={card?._id}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart pointer-events-none my-3" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                        </svg></span>
                        :
                        <span className={'Itinerary-dislike-btn'} style={{ cursor: 'pointer', border: 'none' }} onClick={like} id={card?._id}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart-fill pointer-events-none my-3" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg></span>

                    :
                    <span style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <svg style={{ margin: '5px' }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                        </svg>
                    </span>
                }

            </div>
        </div>
        {user?.role === "admin" ? (<LinkRouter className="btn m-2 text-white pl-3 min-h-0 h-10" to={"/editproduct/" + card._id}>Edit</LinkRouter>) : null}
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
                    <div className="flex justify-center items-center min-h-screen flex-wrap gap-12 p-5 bg-products-v2 font-['Open_Sans']">
                        {show?.length > 0 ?
                            <>
                                <h2 className='w-full text-xl font-bold text-black text-center my-3'>{(newLast + ' products').toUpperCase()} </h2>
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
