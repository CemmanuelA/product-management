import React from 'react';
import { connect } from 'react-redux';
import { handleBuyProduct } from '../../../actions';

import './index.scss';

const Resume = ({total, cart, buyProducts}) => {
    return(
        <div className="resume-container">
            <div>
                <h1>Total:</h1>
                <span>${total}</span>
            </div>
            <div>
                <button className="btn" onClick={() => {buyProducts(cart); alert('successful purchase')}}>
                    Buy
                </button>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        buyProducts: (cart) => dispatch(handleBuyProduct(cart))
    }
};

export default connect(null, mapDispatchToProps)(Resume);