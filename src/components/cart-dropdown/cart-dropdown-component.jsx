import {useContext} from 'react';
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
   const {cartItems} = useContext(CartContext);
    return(
        <div className="cart-dropdown-container">
            <div className="cart-items">
            {cartItems.length? (
                cartItems.map(item => <CartItem cartItem={item}/>)
            ):
            (
                <span className="empty-message">your Cart is Empty</span>
            )
            }
            </div>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    )
}
export default CartDropdown;