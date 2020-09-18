import React from 'react';
import { connect } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import './index.scss';
const Header = ({cart}) => {
    const menuMobileRef = React.useRef();
    const history = useHistory();
    const [amount, setAmount] = React.useState(0);
    const toggleMenu = () => {
        if(menuMobileRef.current.style.display === 'block') {
            menuMobileRef.current.style.display = 'none';
        } else {
            menuMobileRef.current.style.display = 'block';
        }
    }
    const calculateAmount = () => {
        let sum = 0;
        cart.forEach( item => {
            sum+= item.amount
        });
        console.log(sum)
        setAmount(sum);
    }
    const navigateToCart = () => {
        history.push('/cart');
    }
    React.useEffect(() => {
        calculateAmount();
    });

    return(
        <header >
                <div className="nav-bar">
                    <li className="link-d">
                        <NavLink to="/products" activeClassName="active-link" >Products</NavLink>
                    </li>
                    <li className="link-d">
                        <NavLink to="/product-form" activeClassName="active-link" >Create product</NavLink>
                    </li>
                    <div className="mobile">
                        <img src={process.env.PUBLIC_URL + 'assets/images/menu.png'} alt="menu icon" onClick={() => toggleMenu()}/>
                        <div className="mobile-menu" ref={menuMobileRef}>
                            <li className="link-m" onClick={() => toggleMenu()}>
                                <NavLink to="/products" activeClassName="active-link" >Products</NavLink>
                            </li>
                            <li className="link-m" onClick={() => toggleMenu()}>
                                <NavLink to="/product-form" activeClassName="active-link" >Create product</NavLink>
                            </li>
                        </div>
                    </div>
                </div>
                <div className="cart-container">
                    <div className="cart-icon notification">
                        <img src={process.env.PUBLIC_URL + 'assets/images/cart.png'} alt="cart" onClick={() => navigateToCart()} />
                        {
                            amount > 0 ?
                                <span className="badge">{amount}</span>
                            :
                                null
                        }
                    </div>
                </div>
        </header>
    );
};

const mapStateToProps = state => {
    return {
        cart: state.cart.cart
    }
}

export default connect(mapStateToProps)(Header);