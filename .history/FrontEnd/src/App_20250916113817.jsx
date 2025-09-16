import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { CartProvider } from './CartContext/CartContext'  
import Navbar from './Components/Navbar'                  
import CartPage from './pages/CartPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import BookPage from './pages/BookPage'
import Login from './Components/Login'
import SignUp from './Components/Signup'
import C

function App() {
  return (
    <CartProvider>
      <Navbar />   {/* Navbar now has access to cart context */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart'  element={<CartPage/>}/>
        <Route path='/about'  element={<AboutPage/>}/>
        <Route path='/books'  element={<BookPage/>}/>
        <Route path='/contact'  element={<ContactPage/>}/>
         <Route path='checkout' element={<Checkout/>}/>
        <Route path='/login'  element={<Login/>}/>
        <Route path='/signup'  element={<SignUp/>}/>
      </Routes>
    </CartProvider>
  )
}

export default App
