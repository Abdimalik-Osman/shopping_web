import {useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart-selector';
import {setIsCartOpen} from '../../store/cart/cart-action';
import { CartContext } from '../contexts/cart-context';
import './cart-icon-styles.scss';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';

const CartIcon = () => {
    // const {isCartOPen,setIsCartOpen,cartCount} = useContext(CartContext);
    const dispatch = useDispatch();
    const isCartOPen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);
    const toggleCart = () => {
        dispatch(setIsCartOpen(!isCartOPen));
    }
    return(
        <div className="cart-icon-container" onClick={toggleCart}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{cartCount}</span>
        </div>
    )
}
export default CartIcon;