import React, { createContext, useReducer, useContext } from "react";

// Create Context
const CartContext = createContext();

// Initial State
const initialState = {
  cart: [], // Products in the cart
  quantities: {}, // Quantities of each product
};

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // If product already in cart, increase its quantity, else add it
      const existingProduct = state.cart.find(item => item.id === action.payload.id);
      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload }],
        };
      }

    case "INCREASE_QUANTITY":
      // Increase quantity of a product
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case "DECREASE_QUANTITY":
      // Decrease quantity of a product
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };

    case "REMOVE_FROM_CART":
      // Remove product from cart
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };

    default:
      return state;
  }
};

// Cart Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
    // Calculate total quantity and total amount
const totalQuantity = state.cart.reduce((total, item) => total + item.quantity, 0);
const totalAmount = state.cart.reduce(
  (total, item) => total + item.new_price * item.quantity,
  0
);

// Ensure totalAmount and totalQuantity are valid numbers
const validTotalQuantity = isNaN(totalQuantity) ? 0 : totalQuantity;
const validTotalAmount = isNaN(totalAmount) ? 0 : totalAmount;

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch, totalQuantity: validTotalQuantity, totalAmount: validTotalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook to Use Cart Context
export const useCart = () => useContext(CartContext);
