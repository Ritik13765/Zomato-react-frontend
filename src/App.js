import React from 'react'
import Home from './Component/Header/Home'
import Signup from './Component/Authentication/Signup'
import Login from './Component/Authentication/Login'
import { Routes, Route } from 'react-router-dom'
import AddRestaurant from './Component/Authentication/AddRestaurant'
import View from './Component/Authentication/View'
import ViewFood from './Component/Authentication/ViewFood'
import AddProduct from './Component/Authentication/AddProduct'

function App() {
  return (
    <div>
      <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/addrestro' element={<AddRestaurant/>}/>
    <Route path='/view' element={<View/>}/>
    <Route path='/view/:id/addproduct' element={<AddProduct/>}/>
    <Route path='/view/:id/product' element={<ViewFood/>}/>
      </Routes>
    </div>
  )
}

export default App