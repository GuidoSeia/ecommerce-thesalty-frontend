import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


//Pages
import WelcomePage from './pages/WelcomePage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import HomePage from './pages/HomePage';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WelcomePage />}/>
        <Route path="/home" element={<HomePage/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/signin' element={<SignIn/>} />

      </Routes>
    </BrowserRouter>
  );
}