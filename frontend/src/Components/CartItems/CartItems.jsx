import React from 'react'
import './CartItems.css'
import { useCart } from '../../ContextApis/CartContext';
import delete_icon from '../Assets/bin.png'
const CartItems = () => {
  const { cart, dispatch, totalQuantity, totalAmount } = useCart();
  // Ensure valid values for totalQuantity and totalAmount
  const validTotalQuantity = isNaN(totalQuantity) ? 0 : totalQuantity;
  const validTotalAmount = isNaN(totalAmount) ? 0 : totalAmount;

  // const { cart, dispatch,totalAmount,totalQuantity } = useCart();

  const handleIncrease = (id) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: { id } });
  };

  const handleDecrease = (id) => {
    dispatch({ type: "DECREASE_QUANTITY", payload: { id } });
  };
  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };
  
  return (
    <div className='container'>
        <div className="row">
          <div className="cartGrid">
          <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <div className='cartGrid'>
          <div className='cartDetails'>
                <div>Product Image</div>
                <div>Title</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Total</div>
                <div>Remove </div>
          </div>
          {cart.map((item) => (
            <div key={item.id} className="cartDetailsList">
              <div><img src={`http://localhost:5000${item.image}`} className="cart-image" alt="" /></div>
              <div>{item.name}</div>
              <div>₹{item.new_price}</div>
              <div className='cartDiv'>
                <button className="cartButton" onClick={() => handleDecrease(item.id)}>-</button>
                  <p className='cartButtonP'>{item.quantity}</p>
                <button className="cartButton" onClick={() => handleIncrease(item.id)}>+</button>
              </div>
              <div>₹{(item.new_price * item.quantity).toFixed(2)}</div>
              <div><button className="remove-icon" onClick={() => handleRemove(item.id)}><img src={delete_icon} alt="" /></button></div>

            </div>
          ))}
                 <h3>Total Quantity: {validTotalQuantity}</h3>
                 <h3>Total Amount: ₹{validTotalAmount.toFixed(2)}</h3>
          {/* <h2 className='total'>Subtotal ({totalQuantity} {totalQuantity === 1? "item" :"items"}):  ₹{totalAmount}</h2> */}
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
         </div>
        </div>
    </div>
  )
}

export default CartItems
