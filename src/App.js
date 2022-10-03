import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


//Pages
import WelcomePage from './pages/WelcomePage';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WelcomePage />}/>
        <Route path="/home" element={<Home/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signin' element={<SignIn/>} />

      </Routes>
    </BrowserRouter>
  );
}