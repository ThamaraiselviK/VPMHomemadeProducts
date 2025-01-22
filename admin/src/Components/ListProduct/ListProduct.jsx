import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
import edit_icon from '../../assets/edit_icon.png'
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Example of using FontAwesome icons

const ListProduct = () => {
    const [allproducts,setAllproducts] = useState([]);
    const navigate = useNavigate();
      let [weightData, setWeightData] = useState([]); 
      
      const [toggleState, setToggleState] = useState({}); // Tracks toggles for each row

      // Handler to toggle the row state
      const handleToggle = (rowId) => {
        setToggleState((prevState) => ({
          ...prevState,
          [rowId]: !prevState[rowId],
        }));
      };
    

    const fetchProducts = async () => {
        try {
          const response = await axios.get("http://localhost:5000/getallproducts");
          setAllproducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      const fetchWeight = async () => {
        try {
          const response = await axios.get("http://localhost:5000/getallweight");
          setWeightData(response.data);
        } catch (error) {
          console.error("Error fetching category:", error);
        }
      };
     
      useEffect(() => {
        fetchProducts();
        fetchCategory();
        fetchWeight();
      }, []);
      const [categoryData, setCategoryData] = useState([]);

      // Fetch all category
      const fetchCategory = async () => {
        try {
          const response = await axios.get("http://localhost:5000/getallcategory");
          setCategoryData(response.data);
        } catch (error) {
          console.error("Error fetching category:", error);
        }
      };
    
      const remove_product = async (product) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
          await axios.delete(`http://localhost:5000/product/${product.id}`);
          alert('product deleted successfully');
          fetchProducts(); // Refresh the product list after deletion
        } catch (error) {
          console.error('Error deleting product', error);
        }
      };
      const edit_product = async(id)=>{
        console.log(id)
        navigate(`/addproduct?id=${id}`);
  
      }
  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col-2">Product Name</th>
            <th scope="col-2">Image</th>
            <th scope="col-1">Old Price</th>
            <th scope="col-1">New Price</th>
            <th scope="col-2">Category</th>
            <th scope="col-2">Weight</th>
            <th scope="col-1">Edit</th>
            <th scope="col-1">Delete</th>
            <th scope="col-1">Description</th>
          </tr>
        </thead>
        <tbody>
        {allproducts.map((product,index) => (
          <React.Fragment key={product.id}>
            <tr>
              <td>{product.name}</td>
              <td><img src={`http://localhost:5000${product.image}`} alt="" className="listproduct-product-item" /></td>
              <td><p>₹{product.old_price}</p></td>
              <td><p>₹{product.new_price}</p></td>
              <td>{categoryData.find(item => item.id === product.category)?.name}</td>
              <td>{weightData.find(item => item.id === product.category)?.name}</td>
              <td>           
                <img onClick={() => edit_product(product.id)} src={edit_icon} alt="" className="listproduct-remove-icon" />
              </td>
              <td>
                <img onClick={() => remove_product(product)} src={cross_icon} alt="" className="listproduct-remove-icon" />
              </td>
              <td>
                <button onClick={() => handleToggle(product.id)}>{toggleState[product.id] ? <FaChevronUp /> : <FaChevronDown />}</button>
              </td>
            </tr>
            {toggleState[product.id] && (
              <tr >
                <td colSpan="10" >
                  {product.description}
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
             
  </div>

//     <div className='list-product'>
//       <h1>All Products List</h1>
//       <div className="listproduct-format-main">
//         <p>Products</p>
//         <p>Title</p>
//         <p>Old Price</p>
//         <p>New Price</p>
//         <p>Category</p>
//         <p>Action</p>
//       </div>
//       <div className="listproduct-allproducts">
//         <hr />
//         {allproducts.map((product,index)=>{
//             return<div key={index}>
//              <div  className="listproduct-format-main listproduct-format">

//                     <img src={`http://localhost:5000${product.image}`}
//  alt="" className="listproduct-product-item" />
//                     <p>{product.name}</p>
//                     <p>₹{product.old_price}</p>
//                     <p>₹{product.new_price}</p>
//                     {categoryData.find(item => item.id === product.category)?.name}
//                     <>           
//                        <img onClick={() => edit_product(product.id)} src={edit_icon} alt="" className="listproduct-remove-icon" />

//                        <img onClick={() => remove_product(product)} src={cross_icon} alt="" className="listproduct-remove-icon" />
//                     </>
//             </div>
//             <hr />
//             </div>
//         })}
//       </div>
//     </div>
  )
}

export default ListProduct
