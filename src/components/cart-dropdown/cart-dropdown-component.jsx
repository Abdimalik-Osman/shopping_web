import {useContext} from 'react';
import {useSelector} from 'react-redux';
import {selectCartItems} from '../../store/cart/cart-selector';
import {useNavigate} from 'react-router-dom';
import { CartContext } from '../contexts/cart-context';
import Button from '../buttons-component/button';
import './cart-dropdown-styles.scss';
import CartItem from '../cart-item/cart-item-component';

const CartDropdown = () =>{
    const navigate = useNavigate();
    const goToCheckoutHandler = () =>{
        navigate('/checkout');
    }
//    const {cartItems} = useContext(CartContext);

    const cartItems = useSelector(selectCartItems);
    return(
        <div className="cart-dropdown-container">
            <div className="cart-items">
            {cartItems.length? (
                cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)
            ):
            (
                <span className="empty-message">Your Cart is Empty</span>
            )
            }
            </div>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    )
}
export default CartDropdown;