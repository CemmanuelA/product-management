import React from 'react';
import { connect } from 'react-redux';
import { deleteItem } from '../../../actions';

import './index.scss';

const CartPreview = ({product, deleteItem}) => {
    return(
        <div className="preview-container">
            <div className="product-img">
                <img src={product.photo} alt="product" />
            </div>
            <div className="description">
                <p>{product.description}</p>
            </div>
            <div className="amount">
                <span>{product.amount}</span>
            </div>
            <div className="price">
                <span>${product.price}</span>
            </div>
            <div className="delete">
                <img src={process.env.PUBLIC_URL + 'assets/images/trash.png'} alt="trash" onClick={() => deleteItem(product)} />
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteItem: product => dispatch(deleteItem(product))
    }
}

export default connect(null, mapDispatchToProps)(CartPreview);