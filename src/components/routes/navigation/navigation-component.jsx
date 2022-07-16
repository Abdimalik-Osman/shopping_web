import React,{useState, useContext} from 'react'
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { UserContext } from '../../contexts/user-context';
import {Outlet, Link} from 'react-router-dom';
import CartIcon from '../../cart-icon/cart-icon-component';
import CartDropdown from '../../cart-dropdown/cart-dropdown-component';
import { CartContext } from '../../contexts/cart-context';
import {ReactComponent as CrownLogo} from '../../assets/crown.svg';
import './navigation-styles.scss';
function Navigation() {
  const {currentUser} = useContext(UserContext);
  const {isCartOPen} = useContext(CartContext);
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