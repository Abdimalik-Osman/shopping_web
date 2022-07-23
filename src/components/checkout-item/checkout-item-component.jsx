import './checkout-item-styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart-action';
import {selectCartItems} from '../../store/cart/cart-selector';
import { useContext } from 'react';
import { CartContext } from '../contexts/cart-context';
const CheckoutItem = ({cartItem}) => {
    const {name,quantity,price,imageUrl} = cartItem;
    // const {clearItemFromCart,addItemToCart, removeItemToCart} = useContext(CartContext);

    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    // clearCartItem handler
    const clearItemFromCartHandler = () => dispatch(clearItemFromCart(cartItems,cartItem));
    // add item handler
    const addItemHandler = () => dispatch(addItemToCart(cartItems,cartItem));
    // remove item handler
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems,cartItem));
    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <span className="arrow" onClick={removeItemHandler}>&#10094;</span>
                    <span className="value">{quantity}</span>
                <span className="arrow" onClick={addItemHandler}>&#10095;</span>
            </span>
            <span className="price">{price}</span>
            <span className="remove-button" onClick={clearItemFromCartHandler}>&#10005;</span>
        </div>
    )
}
export default CheckoutItem;