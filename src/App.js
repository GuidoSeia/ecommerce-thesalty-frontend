import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import CountdownTimer from './components/countdown/CountdownTimer'
import { useDispatch, useSelector } from 'react-redux';
import { useNewCouponMutation, useGetAllCouponsQuery } from './features/couponApi';


//Pages
import WelcomePage from './pages/WelcomePage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import { loggedTrue } from './features/loggedSlice'
import InfoPage from './pages/InfoPage';
import AdminProfile from './pages/AdminProfile';
import EditProducts from './pages/EditProducts';
import NewProducts from './pages/NewProducts';
import Details from './pages/Details'
import { useState } from 'react';

export default function App() {

  const logged = useSelector((state) => state.logged.loggedState)
  let user = JSON.parse(localStorage.getItem('userLogged'))
  let userRole = user?.role
  const dispatch = useDispatch()

  if (localStorage.getItem('userLogged')) {
    dispatch(loggedTrue())
  }

  /* const role = JSON.parse(localStorage.getItem('userLogged'))?.role */

  let { data: coupon } = useGetAllCouponsQuery()
  let [ newCupon ] = useNewCouponMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    let endTimeDate = (e.target.endTime.value * 24 * 60 * 60 * 1000)
    const newCoupon = {
      couponCode: e.target.code.value,
      currentTime: new Date().getTime(),
      discount: e.target.discount.value,
      endTime: new Date().getTime() + endTimeDate,
    }
    try {
      const response = await newCupon(newCoupon)

      if (response.error) {
        toast.error(response.error.data.message);
      } else {
        toast.success(response.data.message)
      }
    }
    catch (error) {
      console.log(error);
    }

  }


  return (
    <BrowserRouter>
      <ToastContainer
        toastStyle={{
          background: "#311D3F",
          color: 'white'
        }}
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={true}
      />
      {/* <CountdownTimer targetDate={jajas} /> */}
      <CountdownTimer targetDate={coupon?.response[0]?.endTime} couponCode={coupon?.response[0]?.couponCode} />
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path='/signup' element={!logged ? <SignUp /> : null} />
        <Route path='/signin' element={!logged ? <SignIn /> : null} />
        <Route path="/admin" element={userRole === "admin" ? <AdminProfile functionCountdown={handleSubmit} /> : null} />
        <Route path="/editproduct/:id" element={userRole === "admin" ? <EditProducts /> : null} />
        <Route path="/newproduct" element={userRole === "admin" ? <NewProducts /> : null} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/Details' element={<Details />} />

        <Route path='/aboutUs' element={<InfoPage />} />
        <Route path='/cart' element={<CartPage />} />

      </Routes>
    </BrowserRouter>
  );
}