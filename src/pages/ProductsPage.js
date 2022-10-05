import React, {useState} from 'react'
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

    const [filter, setFilter] = useState()

    function upperCaseOne(search){
        return search.charAt(0).toUpperCase() + search.slice(1)
    }

    const filterData = (e) => {
        e.preventDefault()
        setFilter(upperCaseOne(e.target.value));
        console.log(filter);
    }

    let show
    if (type == null) {
        { filter ? show = allProducts?.response.filter((item => item.brand.includes(filter))).map(productCard) : show = allProducts?.response.map(productCard)}
    } else {
        { filter ? show = products?.response.filter((item => item.brand.includes(filter))).map(productCard) : show = products?.response.map(productCard)}
    }

    return (

        <PageLayout>
            <div className="form-control">
            <label className="input-group input-group-md flex justify-end align-items-center py-4 pr-5 bg-white">
                <span>TS</span>
                <input type="text" placeholder="Type here" onChange={filterData} className="input input-bordered input-md" />
            </label>
            </div>
            <div className="flex justify-center items-center flex-wrap gap-12 p-5 bg-products-v2">
                {show?.length > 0 ? show : <div><h1 className="text-black text-lg">No se encontraron resultados.</h1></div>}
            </div>
        </PageLayout>
    )

}
