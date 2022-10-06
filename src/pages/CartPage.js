import React from 'react'
import PageLayout from '../components/layout/PageLayout'
import '../styles/CartPage.css'
import { Link as LinkRouter } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice'
import { removeCart } from '../features/cartSlice'
import { decrementQuantity } from '../features/cartSlice'

export default function CartPage() {

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart.cart)
    console.log(cart);

    const addition = (acc, currentValue) => {
        return acc+currentValue.price*currentValue.quantity
    }
  
    let total = cart.reduce(addition, 0);

    let tbody = (product) => (
        <tr key={product.id}>
            <th>
                <label>
                    <input type="checkbox" className="checkbox" />
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={product.photo[0]} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{product.title}</div>
                        <div className="text-sm opacity-50 flex gap-1">
                            <p className='unitPrice text-md'>${product.price}</p>
                        </div>
                    </div>
                </div>
            </td>
            <td>
                {product.description.slice(0, 50)}...
            </td>
            <td className='text-center quantity'>{product.quantity}
            <p></p>
            <button className="btnAdd btn w-10"  onClick={() => dispatch(addToCart(product))}>+</button>
            <button className="btnRemove btn w-10"  onClick={() => dispatch(decrementQuantity(product))}>-</button>
           </td>
        </tr>
    )

    return (
        <PageLayout>
            <div className='flex items-center cart-container p-5 text-white h-full'>
                <div className="flex flex-col w-full h-full lg:flex-row">
                    <div className="grid flex-grow h-full card cart-card bg-base-300 rounded-box place-items-center">
                        <ul className="steps p-4">
                            <li className="step step-primary mx-2 text-xs md:text-base">Choose products</li>
                            <li className="step step-primary mx-2 text-xs md:text-base">Confirm payment</li>
                            <li className="step mx-2 text-xs md:text-base">Pay</li>
                            <li className="step mx-2 text-xs md:text-base">Order end</li>
                        </ul>
                        <div className="overflow-x-auto w-full">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label>
                                        </th>
                                        <th className=''>Product</th>
                                        <th className=''>description</th>
                                        <th className='text-center'>quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map(tbody)}
                                </tbody>
                            </table>
                            {cart.length > 0 ? <div className="flex justify-center items-center bg-#360027">
                                <button className="btn bg-base-100 m-3" onClick={() => dispatch(removeCart())}>Empty cart</button>
                            </div> : null}
                        </div>
                    </div>
                    <div className="divider lg:divider-horizontal"></div>
                    <div className="flex flex-grow card cart-card rounded-box p-4 justify-center gap-5 items-center">
                        <div className='flex flex-col gap-3 justify-center items-center'>
                            <img width={100} src="/logo-white.png" alt="" />
                            <h2 className='text-white'>Order: #0000</h2>
                            <p className='text-white'>05/10/22</p>
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <div className="cart-summary-body mt-2 flex flex-col justify-center gap-5">
                                <div className='flex p-3 justify-between'>
                                    <p>Nombre del producto</p>
                                    <div>
                                        {cart.map((item) => 
                                        <>
                                            <p>{item?.brand}</p>
                                        </>
                                        )}
                                    </div>
                                    <div>
                                        {cart.map((item) => 
                                        <>
                                            <p>${item?.price*item.quantity}</p>
                                        </>
                                        )}
                                    </div>
                                </div>
                                <div className='flex p-3 justify-between'>
                                    <div>
                                        <p>Subtotal</p>
                                        <p>Discount *cupon*</p>
                                        <p className='font-bold'>Total</p>
                                    </div>
                                    <div>
                                        <p>$ 000000</p>
                                        <p>$ 000000</p>
                                        <p>${total}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <LinkRouter className="btn btn-primary btn-home-page text-xs" to={'/pay'}>Place order</LinkRouter>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
