import React from 'react'
import '../styles/HomePage.css'
import { useGetFilteredProductsQuery } from '../features/productsApi'
import { Link as LinkRouter } from 'react-router-dom'
import PageLayout from "../components/layout/PageLayout"

export default function HomePage() {

    let { data: watches } = useGetFilteredProductsQuery("reloj")
    let { data: sunglasses } = useGetFilteredProductsQuery("anteojos")
    let { data: backpack } = useGetFilteredProductsQuery("mochilas")
    let { data: wallet } = useGetFilteredProductsQuery("billetera")
    let { data: handbag } = useGetFilteredProductsQuery("bolsos")
    let { data: fragrance } = useGetFilteredProductsQuery("perfume")


    console.log(watches?.response)


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
            image: "https://cdn.shopify.com/s/files/1/0532/0687/6358/products/IMG_8817.jpg?v=1632849906",
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

        <div className="card m-5 w-96 shadow-xl image-full">
            <figure><img src={card.image} alt="Shoes" /></figure>
            <div className="card-body flex justify-center gap-6 items-center">
                {card.type === "offer" ?
                    (
                        <>
                            <div className="badge badge-home text-2xl p-4">OFFER !!</div>
                            <h2 className="text-white">do you like offers?</h2>
                            <h2 className="text-white"> here we have some for you</h2>
                        </>
                    ) : card.type === "new" ?
                        (
                            <>
                                <div className="badge badge-home text-2xl p-5">New Products</div>
                                <h2 className="text-white">come see our new products</h2>
                            </>
                        ) : card.type === "latest" ?
                            (
                                <>
                                    <div className="badge badge-home text-2xl p-4">latest products</div>
                                    <h2 className="text-white">hurry up !!</h2>
                                    <h2 className="text-white">latest products</h2>
                                </>

                            ) : null}
                <LinkRouter className="btn btn-primary btn-home-page" to={'/cities'}>See more.</LinkRouter>
            </div>
        </div>
    )

    const productCard = card => (
        <div className="card border-black border m-5 w-72 h-96 shadow-xl">
            <figure className="h-1/2">
                <img className="h-full w-full object-cover" src={card.photo} alt="Shoes" />
            </figure>
            <div className="card-body h-1/2">
                <h2 className="card-title text-white">
                    {card.brand}
                </h2>
                <div className='flex flex-column flex-wrap'>
                    <p className='text-white'>
                        Model: {card.model}
                    </p>
                    <p className='text-white'>
                        $: {card.price}
                    </p>
                    <p className='text-white'>
                        Stock: {card.stock}
                    </p>
                </div>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
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
                <div className='flex'>
                    {watches?.response.slice(0, 4).map(productCard)}
                </div>
                <div>
                    <LinkRouter className="btn btn-primary btn-card-home w-full" to={'/products/?type=reloj'}>See more.</LinkRouter>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center flex-wrap gap-12 p-5 bg-products-v2">
                <h2 className="w-full p-5 text-center text-5xl text-black">Sunglasses</h2>
                <div className='flex'>
                    {sunglasses?.response.slice(0, 4).map(productCard)}
                </div>
                <div>
                    <LinkRouter className="btn btn-primary btn-card-home w-full" to={'/products/?type=anteojos'}>See more.</LinkRouter>
                </div>
            </div>
            <div className='flex justify-around bg-combined'>
                <div className="flex flex-col justify-center items-center flex-wrap gap-12 p-5 bg-products-v1">
                    <h2 className="w-full p-5 text-center text-5xl text-white">Backpack</h2>
                    <div className='flex'>
                        {backpack?.response.slice(0, 2).map(productCard)}
                    </div>
                    <div>
                        <LinkRouter className="btn btn-primary btn-card-home w-full" to={'/products/?type=mochilas'}>See more.</LinkRouter>
                    </div>
                </div>
                <div className="flex flex-col justify-center items-center flex-wrap gap-12 p-5 bg-products-v2">
                    <h2 className="w-full p-5 text-center text-5xl text-black">Handbag</h2>
                    <div className='flex'>
                        {handbag?.response.slice(0, 2).map(productCard)}
                    </div>
                    <div>
                        <LinkRouter className="btn btn-primary btn-card-home w-full" to={'/products/?type=bolsos'}>See more.</LinkRouter>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center flex-wrap gap-12 p-5 bg-products-v1">
                <h2 className="w-full p-5 text-center text-5xl text-white">Wallet</h2>
                <div className='flex'>
                    {wallet?.response.slice(0, 4).map(productCard)}
                </div>
                <div>
                    <LinkRouter className="btn btn-primary btn-card-home w-full" to={'/products/?type=billetera'}>See more.</LinkRouter>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center flex-wrap gap-12 p-5 bg-products-v2">
                <h2 className="w-full p-5 text-center text-5xl text-black">Fragrance</h2>
                <div className='flex'>
                    {fragrance?.response.slice(0, 4).map(productCard)}
                </div>
                <div>
                    <LinkRouter className="btn btn-primary btn-card-home w-full" to={'/products/?type=perfume'}>See more.</LinkRouter>
                </div>
            </div>
        </PageLayout>
    )

}
