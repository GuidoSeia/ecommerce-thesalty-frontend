import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


//Pages
import WelcomePage from './pages/WelcomePage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import { useSelector, useDispatch } from 'react-redux';
import { loggedTrue } from './features/loggedSlice'

export default function App() {

  const logged = useSelector((state) => state.logged.loggedState)
    
  const dispatch = useDispatch()
  
  if (localStorage.getItem('userLogged')) {
    dispatch(loggedTrue())
  }

  /* const role = JSON.parse(localStorage.getItem('userLogged'))?.role */

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WelcomePage />}/>
        <Route path="/home" element={<HomePage/>} />
        <Route path='/signup' element={!logged ? <SignUp/> : null} />
        <Route path='/signin' element={!logged ? <SignIn/> : null} />
        <Route path='/products' element={<ProductsPage/>} />
      </Routes>
    </BrowserRouter>
  );
}