import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Pages
import WelcomePage from './pages/WelcomePage';
import HomePage from './pages/HomePage';

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WelcomePage />}/>
        <Route path='/home' element={<HomePage />}/>
      </Routes>
    </BrowserRouter>
  );
}