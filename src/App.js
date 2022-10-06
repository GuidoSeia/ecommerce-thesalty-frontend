import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


//Pages
import WelcomePage from './pages/WelcomePage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import { useSelector, useDispatch } from 'react-redux';
import { loggedTrue } from './features/loggedSlice'
import InfoPage from './pages/InfoPage';
import AdminProfile from './pages/AdminProfile';
import EditProducts from './pages/EditProducts';
import NewProducts from './pages/NewProducts';
import Details from './pages/Details'

export default function App() {

  const logged = useSelector((state) => state.logged.loggedState)
  let user = JSON.parse(localStorage.getItem('userLogged'))
  let userRole = user?.role
  const dispatch = useDispatch()
  
  if (localStorage.getItem('userLogged')) {
    dispatch(loggedTrue())
  }

  /* const role = JSON.parse(localStorage.getItem('userLogged'))?.role */

  return (
    <BrowserRouter>
    <ToastContainer></ToastContainer>
      <Routes>
        <Route path='/' element={<WelcomePage />}/>
        <Route path="/home" element={<HomePage/>} />
        <Route path='/signup' element={!logged ? <SignUp/> : null} />
        <Route path='/signin' element={!logged ? <SignIn/> : null} />
        <Route path="/admin" element={ userRole ==="admin" ? <AdminProfile/> : null} />
        <Route path="/editproduct/:id" element={ userRole ==="admin" ? <EditProducts/> : null} />
        <Route path="/newproduct" element={ userRole ==="admin" ? <NewProducts/> : null} />
        <Route path='/products' element={<ProductsPage/>} />
        <Route path='/Details' element={<Details/>} />

        <Route path='/aboutUs' element={<InfoPage />}/>
        <Route path='/cart' element={<CartPage/>} />

      </Routes>
    </BrowserRouter>
  );
}