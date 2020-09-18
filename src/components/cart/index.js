import React from 'react'
import { connect } from 'react-redux';
import CartPreview from './cartPreview'
import Resume from './resume'

import './index.scss';
const Cart = ({cart}) => {

    const [total, setTotal ] = React.useState(0);
    const getTotal = () => {
        let total = 0;
        cart.forEach(item => {
           total+= item.amount * item.product.price; 
        });
        setTotal(total);
    }
    React.useEffect(() => {
        getTotal();
    })
    return(
        <div>
            {cart.length ?
                <div className="container">
                    <div className="list">
                        {
                            cart.map( item => (
                                <CartPreview key={item.id} product={{...item.product, amount: item.amount}} />
                            ))
                        }
                    </div>
                    <div className="resume">
                        <Resume total={total} cart={cart} />
                    </div>
                </div>
                :
                <h1> There are not products in the cart</h1>
            
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        cart: state.cart.cart
    }
};

export default connect(mapStateToProps)(Cart);

