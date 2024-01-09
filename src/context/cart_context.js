import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer"

const CartContext = createContext();

const  CartProvider = ({children})=>{

    const getLocalCartData = () =>{
        let localCartData = localStorage.getItem("GSinghCart");
        // if(localCartData === "[]"){
        //     return [];
        // }
        // else{
        //     return JSON.parse(localCartData);
        // }
        
        const parsedData = JSON.parse(localCartData);
        if(!Array.isArray(parsedData)) return [];

        return parsedData;
    }
    const initialState={
        // cart :[],
        cart : getLocalCartData(),
        total_item:"",
        total_amount:"",
        shipping_fee:5000,
    }

    const[state, dispatch] = useReducer(reducer , initialState);

    const addToCart = (id,color,amount,product)=>{
        dispatch({type:"ADD_TO_CART",payload:{id,color,amount,product}});
    };

    // increment and decrement the product
    const setDecrease = (id)=>{
        dispatch({type:"SET_DECREMENT",payload:id});
    };
    const setIncrease = (id)=>{
        dispatch({type:"SET_INCREMENT",payload:id});
    };

    const removeItem =(id)=>{
        dispatch({type:"REMOVE_ITEM",payload:id});
    };

    // ClearCart 
    const clearCart=()=>{
        dispatch({type:"CLEAR_CART"});
    }

    // Add thee data in localStorage 
    useEffect(()=>{
        dispatch({type:"CART_TOTAL_ITEM"});
        dispatch({type:"CART_TOTAL_PRICE"});
        localStorage.setItem("GSinghCart",JSON.stringify(state.cart));
    },[state.cart])

    return <CartContext.Provider value={{...state , addToCart , removeItem ,clearCart , setDecrease,setIncrease}}>
        {children}
    </CartContext.Provider>
};

const useCartContext = ()=>{
    return useContext(CartContext);
}

export {CartProvider , useCartContext};