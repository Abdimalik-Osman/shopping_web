import React,{useState, useContext} from 'react'
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../components/contexts/user-context';
import {Outlet, Link} from 'react-router-dom';
import CartIcon from '../../components/cart-icon/cart-icon-component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown-component';
import { CartContext } from '../../components/contexts/cart-context';
import {ReactComponent as CrownLogo} from '../../assets/crown.svg';
import { useSelector, useDispatch } from 'react-redux';
import {selectCurrentUser} from '../../store/user/user-selector';
import { selectIsCartOpen } from '../../store/cart/cart-selector';
import { signOutStart } from '../../store/user/user-action';
import './navigation-styles.scss';
function Navigation() {
  const dispatch = useDispatch();
  // const {currentUser} = useContext(UserContext);
  const currentUser = useSelector(selectCurrentUser);
  const isCartOPen = useSelector(selectIsCartOpen);
  // const {isCartOPen} = useContext(CartContext);

  const signOutUser = () => dispatch(signOutStart());
  return (
    <div>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <CrownLogo />
            </Link>
            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">Shop</Link>
                {
                  currentUser ?
                  (<span className="nav-link" onClick={signOutUser}>SIGN OUT</span>)
                  : 
                  (<Link className="nav-link" to="/auth">Sign In</Link>)
                }
            <CartIcon />
            </div>
            {isCartOPen && <CartDropdown /> }
        </div>
        <Outlet />
    </div>
  )
}

export default Navigation;