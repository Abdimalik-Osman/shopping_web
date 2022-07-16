import {createContext, useState, useEffect} from 'react';

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
export const CartProvider = ({children}) =>{
    const [isCartOPen,setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount,setCartCount] = useState(0);
    const [cartTotal,setCartTotal] = useState(0);

    useEffect(() =>{
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    },[cartItems])
    

    useEffect(() =>{
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    },[cartItems])

    // add item to cart
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    // remove item from cart
    const removeItemToCart = (cartItemToRemove)  => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    // clear item from cart
    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }
    const value = {isCartOPen, setIsCartOpen, addItemToCart,removeItemToCart,clearItemFromCart, cartItems, cartCount, cartTotal};
    return(
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}