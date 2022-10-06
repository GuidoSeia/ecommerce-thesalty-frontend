import React from 'react'
import '../styles/HomePage.css'
import { useGetFilteredProductsQuery } from '../features/productsApi'
import { Link as LinkRouter } from 'react-router-dom'
import PageLayout from "../components/layout/PageLayout"
import ChatBot from '../components/ChatBot'

export default function HomePage() {

    let { data: watches } = useGetFilteredProductsQuery("reloj")
    let { data: sunglasses } = useGetFilteredProductsQuery("anteojos")
    let { data: backpack } = useGetFilteredProductsQuery("mochilas")
    let { data: wallet } = useGetFilteredProductsQuery("billetera")
    let { data: handbag } = useGetFilteredProductsQuery("bolsos")
    let { data: fragrance } = useGetFilteredProductsQuery("perfume")

    const data = [
        {
            id: 1,
            title: "Watch",
            description: "descripcion producto",
            image: "https://www.woodenson.cl/wp-content/uploads/sites/2/2021/10/DSC_0127-600x600.jpg",
            type: "offer"
        },
        {
            id: 1,
            title: "Sunglasses",
            description: "descripcion producto",
            image: "https://cdn.shopify.com/s/files/1/0270/6663/0217/products/711426.jpg?v=1634050720",
            type: "new"
        },
        {
            id: 1,
            title: "backpack",
            description: "descripcion producto",
            image: "https://i0.wp.com/chevyproductos.cl/wp-content/uploads/mochila-rolltop-40-lt-negra.jpg?resize=400%2C400&ssl=1",
            type: "latest"
        },
    ]

    const carouselCard = (card) => (

        <div className="card shadow-xl image-full m-1 w-48 h-56 md:m-4 md:w-96 md:h-72 lg:h-96 xl:m-6" key={card._id}>
            <figure><img src={card.image} alt="Shoes" /></figure>
            <div className="card-body flex flex-col justify-evenly items-center p-3 md:justify-center md:gap-6 lg:gap-6">
                {card.type === "offer" ?
                    (
                        <>
                            <div className="badge badge-home text-xs md:text-lg lg:text-2xl lg:p-4">OFFER !!</div>
                            <h2 className="text-white text-xs md:text-base lg:text-lg">do you like offers?</h2>
                            <h2 className="text-white text-xs md:text-base lg:text-lg"> here we have some for you</h2>
                        </>
                    ) : card.type === "new" ?
                        (
                            <>
                                <div className="badge badge-home text-xs md:text-lg lg:text-2xl lg:p-5">New Products</div>
                                <h2 className="text-white text-xs md:text-base lg:text-lg">come see our new products</h2>
                            </>
                        ) : card.type === "latest" ?
                            (
                                <>
                                    <div className="badge badge-home text-xs md:text-lg lg:text-2xl lg:p-4">latest products</div>
                                    <h2 className="text-white text-xs md:text-base lg:text-lg">hurry up !!</h2>
                                    <h2 className="text-white text-xs md:text-base lg:text-lg">latest products</h2>
                                </>

                            ) : null}
                <LinkRouter className="btn btn-primary btn-home-page text-xs" to={'/home'}>See more.</LinkRouter>
            </div>
        </div>
    )

    const productCard = card => (
        <div className="card border-black border w-40 m-1.5 h-52 md:m-1.5 md:w-40 md:h-80 lg:w-56 xl:m-10 xl:w-64 shadow-xl" key={card._id}>
            <figure className="h-1/2">
                <img className="h-full w-full object-cover" src={card.photo} alt="Shoes" />
            </figure>
            <div className="card-body h-1/2 flex justify-center p-2 md:justify-start md:p-5 lg:justify-evenly items-center">
                <h2 className="card-title text-white text-sm lg:text-xl">
                    {card.brand}
                </h2>
                <div className='flex flex-col justify-center gap-2'>
                    <p className='text-white text-xs md:text-sm lg:text-base'>
                        Model: {card.model}
                    </p>
                    <div className='flex gap-6'>
                        <p className='text-white text-xs md:text-sm'>
                            $: {card.price}
                        </p>
                        <p className='text-white text-xs md:text-sm'>
                            Stock: {card.stock}
                        </p>
                    
                    </div>
                </div>
            </div>
        </div >
    )

    return (

        <PageLayout>
            <div className="flex justify-center bg-white">
                {data.map(carouselCard)}
            </div>

            <div className="flex flex-col justify-center items-center flex-wrap gap-12 p-5 bg-products-v1">
                <h2 className="w-full p-5 text-center text-5xl">Watches</h2>
                <div className='flex flex-wrap justify-center'>
                    {watches?.response.slice(0, 4).map(productCard)}
                </div>
                <div>
                    <LinkRouter className="btn btn-primary btn-card-home w-full" to={'/products/?type=reloj'}>See more.</LinkRouter>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center flex-wrap gap-12 p-5 bg-products-v2">
                <h2 className="w-full p-5 text-center text-5xl text-black">Sunglasses</h2>
                <div className='flex flex-wrap justify-center'>
                    {sunglasses?.response.slice(0, 4).map(productCard)}
                </div>
                <div>
                    <LinkRouter className="btn btn-primary btn-card-home w-full" to={'/products/?type=anteojos'}>See more.</LinkRouter>
                </div>
            </div>
            <div className='flex flex-wrap justify-around bg-combined'>
                <div className="flex flex-col justify-center items-center flex-wrap gap-12 p-5 bg-products-v1">
                    <h2 className="w-full p-5 text-center text-5xl text-white">Backpack</h2>
                    <div className='flex flex-wrap justify-center'>
                        {backpack?.response.slice(0, 2).map(productCard)}
                    </div>
                    <div>
                        <LinkRouter className="btn btn-primary btn-card-home w-full" to={'/products/?type=mochilas'}>See more.</LinkRouter>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center flex-wrap gap-12 p-5 bg-products-v2">
                    <h2 className="w-full p-5 text-center text-5xl text-black">Handbag</h2>
                    <div className='flex flex-wrap justify-center'>
                        {handbag?.response.slice(0, 2).map(productCard)}
                    </div>
                    <div>
                        <LinkRouter className="btn btn-primary btn-card-home w-full" to={'/products/?type=bolsos'}>See more.</LinkRouter>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center flex-wrap gap-12 p-5 bg-products-v1">
                <h2 className="w-full p-5 text-center text-5xl text-white">Wallet</h2>
                <div className='flex flex-wrap justify-center'>
                    {wallet?.response.slice(0, 4).map(productCard)}
                </div>
                <div>
                    <LinkRouter className="btn btn-primary btn-card-home w-full" to={'/products/?type=billetera'}>See more.</LinkRouter>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center flex-wrap gap-12 p-5 bg-products-v2">
                <h2 className="w-full p-5 text-center text-5xl text-black">Fragrance</h2>
                <div className='flex flex-wrap justify-center'>
                    {fragrance?.response.slice(0, 4).map(productCard)}
                </div>
                <div>
                    <LinkRouter className="btn btn-primary btn-card-home w-full" to={'/products/?type=perfume'}>See more.</LinkRouter>
                </div>
            </div>
            <ChatBot></ChatBot>
        </PageLayout>
    )

}
