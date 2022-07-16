import {useContext} from 'react';
import { CartContext } from '../contexts/cart-context';
import './cart-icon-styles.scss';
import {ReactComponent as ShoppingIcon} from '../assets/shopping-bag.svg';

const CartIcon = () => {
    const {isCartOPen,setIsCartOpen,cartCount} = useContext(CartContext);
    const toggleCart = () => {
        setIsCartOpen(!isCartOPen);
    }
    return(
        <div className="cart-icon-container" onClick={toggleCart}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{cartCount}</span>
        </div>
    )
}
export default CartIcon;