import './checkout-item-styles.scss';
import { useContext } from 'react';
import { CartContext } from '../contexts/cart-context';
const CheckoutItem = ({cartItem}) => {
    const {name,quantity,price,imageUrl} = cartItem;
    const {clearItemFromCart,addItemToCart, removeItemToCart} = useContext(CartContext);
    // clearCartItem handler
    const clearItemFromCartHandler = () => clearItemFromCart(cartItem);
    // add item handler
    const addItemHandler = () => addItemToCart(cartItem);
    // remove item handler
    const removeItemHandler = () => removeItemToCart(cartItem);
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