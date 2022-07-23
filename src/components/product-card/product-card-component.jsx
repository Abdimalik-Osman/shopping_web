import {useContext} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToCart} from '../../store/cart/cart-action';
import {selectCartItems} from '../../store/cart/cart-selector';
import {CartContext} from '../contexts/cart-context';
import './product-card-styles.scss';
import Button from '../buttons-component/button';
const ProductCard = ({product}) => {
    const {name,imageUrl,price} = product;
    // const {addItemToCart} = useContext(CartContext);
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    // add product to cart
    const addProductToCart = () => dispatch(addItemToCart(cartItems,product));
    return(
        <div className="product-card-container">
            <img src={imageUrl} alt={`${name}`}/> 
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart}>Add To Cart</Button>
        </div>
    )
}
export default ProductCard;