import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Breadcrum.css'
import right_arrow from '../Assets/right-arrow.png'
import { useCart } from "../../ContextApis/CartContext";

const Breadcrum = ({ productId }) => {
  const [product, setProduct] = useState([]);
  const [categoryName, setCategoryName] = useState([]);

  // const { addToCart,decreaseQuantity } = useCart();
  const { cart, dispatch, totalQuantity } = useCart();
  // const handleAddToCart = (product) => {
  //   dispatch({ type: "ADD_TO_CART", payload: product });
  // };
  
  const handleAddToCart = (product, quantity) => {
    console.log("Product added to cart:", product, "Quantity:", quantity);

    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, quantity },
    });
  };

  const handleIncrease = (id) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: { id } });
  };

  const handleDecrease = (id) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: { id } });
  };


  const fetchCategoryName = async (val) => {
    try {
      const response = await axios.get(`http://localhost:5000/category/${val}`);
      setCategoryName(response.data.name);
    } catch (error) {
      console.error("Error fetching breadcrumb:", error);
    }
  };

  useEffect(() => {
    const fetchBreadcrumb = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/${productId}`);
        setProduct(response.data);
        fetchCategoryName(response.data.category);
      } catch (error) {
        console.error("Error fetching breadcrumb:", error);
      }
    };
    
    const quan =()=>{
      cart.map((item) => (   
        console.log(item)
      ))
    }
    
    fetchBreadcrumb();
    quan();
  }, [productId]);

  return (
    <div>
    <div className="container">
        <ul className="breadcrumb">
                <li><Link to={`/`}>HOME</Link><img src={right_arrow} alt="" /></li>
                <li><Link to={`/${categoryName}`}>{categoryName}</Link><img src={right_arrow} alt="" /></li>
                <li><Link to={`/product/${product.id}`}>{product.name}</Link></li>
        </ul>
        
    </div>
    
    <div className="container">   
        <div className="row">
            <div className="col-md-6 text-center">
             <img src={`http://localhost:5000${product.image}`} className="product-image" alt="" />
            </div>
            <div className="col-md-6">
                <div className="product-head">{product.name}</div>
                <hr />
                <div className="price">
                    <div className="new-price">₹{product.new_price}</div>
                    <div className="old-price">₹{product.old_price}</div>
                </div>
              
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>

              <div className='cartDiv'>
                <button className="cartButton" onClick={() => handleDecrease(product.id)}>-</button>
                  <p className='cartButtonP'>{product.quantity}</p>
                <button className="cartButton" onClick={() => handleIncrease(product.id)}>+</button>
              </div>
              {product.quantity}
              

              <input type="number" min="1" defaultValue="1" id={`quantity-${product.id}`} />
            <button  onClick={() => {
                const quantity = document.getElementById(`quantity-${product.id}`).value || 1;
                handleAddToCart(product, parseInt(quantity, 10));
              }}>Add to Cart</button>
               
                <hr />
                <div className="product-weight"><strong>Weight:</strong>{product.weight}</div>
                <div className="product-available"><strong>Avalability:</strong>{product.available>0 ? "In Stock" :"Unavailable"}</div>
                <div className="product-description"><strong>Description:</strong>{product.description}</div>

            </div>
        </div>
    
    </div>
  
</div>

  );
};

export default Breadcrum;
