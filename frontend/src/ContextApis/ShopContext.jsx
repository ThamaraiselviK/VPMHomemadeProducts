import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);
const getDefaultCart = ()=>{
    let cart ={};
    for(let index=0;index < 300+1;index++){
       cart[index] =0;
    }
    return cart;
}
const ShopContextProvider = (props) => {
    const [all_product,setAll_Product] = useState([]);
    const [cartItems,setCartItems] = useState();
    // const [cartItems,setCartItems] = useState(getDefaultCart());
    
    const addToCart = (itemId,price) =>{
        console.log(itemId,price)
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        // setCartItems((prev) => ({
        //     ...prev,
        //     [itemId]: {
        //       count: (prev[itemId]?.count || 0) + 1, // Increment item count
        //       price: price, // Update or set the price
        //     },
        //   }));
        // console.log(cartItems);

    }
    const removeFromCart = (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () =>{
        let totalAmount = 0;
        console.log(cartItems);

        for(const item in cartItems){

            // if(cartItems[item]>0){
            //     let itemInfo = all_product.find((product)=> product.id === Number(item));
            //     totalAmount += itemInfo.new_price * cartItems[item];
            // }
            
        }
        return totalAmount;
    }
    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem +=  cartItems[item];
            }
        }
        return totalItem;
    }
    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;