import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import AddCategory from '../../Components/AddCategory/AddCategory'
import ListCategory from '../../Components/ListCategory/ListCategory'
import AddWeight from '../../Components/AddWeight/AddWeight'
import ListWeight from '../../Components/ListWeight/ListWeight'
const Admin = () => {
  return (
    
    <div className="container text-center">
    <div className="row">
      <div className="col-3">      <Sidebar/>      </div>
      <div className="col-9 box-shadow">
      <Routes>
            <Route path='/addproduct' element={<AddProduct/>}/>
            <Route path='/listproduct' element={<ListProduct/>}/>
            <Route path='/addcategory' element={<AddCategory/>}/>
            <Route path='/listcategory' element={<ListCategory/>}/>
            <Route path='/addweight' element={<AddWeight/>}/>
            <Route path='/listweight' element={<ListWeight/>}/>
        </Routes>
      </div>
    </div>
  </div>
  )
}

export default Admin
