import {createContext, useState, useEffect, useReducer} from 'react';

const addCartItem =(cartItems, productToAdd) => {
    // FIND IF CART-ITEM CONTAINS productToAdd
    const existingCartItem = cartItems.find(item => item.id === productToAdd.id);
    // IF FOUND, INCREMENT QUANTITY
    if(existingCartItem){
        return cartItems.map(cartItem => cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
            )
    }
    // RETURN NEW ARRAY WITH MODIFIED CART-ITEMS / NEW CART-ITEMS 
    return [...cartItems, {...productToAdd, quantity:1}]
}

// REMOVE ITEM FROM CART-ITEMS
const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.id === cartItemToRemove.id
    );
  
    // check if quantity is equal to 1, if it is remove that item from the cart
    if (existingCartItem.quantity === 1) {
      return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
    }
  
    // return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  };

//   CLEAR ITEM FROM CART
const clearCartItem = (cartItems,cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}

export const CartContext = createContext({
    isCartOPen: false,
    setIsCartOpen : () =>{},
    cartItems: [],
    addItemToCart : () =>{},
    removeItemFromCart : () =>{},
    clearItemToCart : () =>{},
    cartCount: 0,
    total : 0,
})
const INITIAL_STATE_VALUE = {
    isCartOPen: false,
    cartItems: [],
    cartCount: 0,
    total : 0,
}
const CART_ACTION_TYPES ={
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}
const cartReducer = (state, action) =>{
    const {type,payload} = action;
    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOPen: payload
            }
        default:
            throw new Error(`Unhandled error of ${type} in cartReducer`);
    }
}

export const CartProvider = ({children}) =>{
    // const [isCartOPen,setIsCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState([]);
    // const [cartCount,setCartCount] = useState(0);
    // const [cartTotal,setCartTotal] = useState(0);

    // useEffect(() =>{
    //     const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    //     setCartCount(newCartCount);
    // },[cartItems])
    

    // useEffect(() =>{
    //     const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    //     setCartTotal(newCartTotal);
    // },[cartItems])

    const [{cartItems,isCartOPen,cartTotal,cartCount},dispatch] = useReducer(cartReducer,INITIAL_STATE_VALUE);

    // update cart items reducer function
    const updateCartItemsReducer = (newCartItems) =>{
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        dispatch({type:CART_ACTION_TYPES.SET_CART_ITEMS, payload:{cartItems:newCartItems, cartTotal:newCartTotal, cartCount:newCartCount}})
       /* generate newCartTotal
        generate newCartCount

        dispatch new action with payload ={
            cartItems,
            newCartTotal,
            newCartCount
        } 
        */

    }

    // add item to cart
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    // remove item from cart
    const removeItemToCart = (cartItemToRemove)  => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    // clear item from cart
    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }

    // 
    const setIsCartOpen = (bool) => {
        dispatch({type:CART_ACTION_TYPES.SET_IS_CART_OPEN, payload:bool});
    }
    const value = {
        isCartOPen,
        setIsCartOpen,
        addItemToCart,
        removeItemToCart,
        clearItemFromCart,
        cartItems, 
        cartCount, 
        cartTotal};
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}