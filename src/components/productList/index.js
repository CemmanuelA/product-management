import React from 'react'
import { connect } from 'react-redux'
import ProductCard from './cardProduct';

import './index.scss';
const ProductList = ({products}) => {
        return (
            <div className="product-container scroll">
                {products.length ?
                    products.map( product => 
                        <ProductCard key={product.id} product={product} />)
                    :
                        <h2>No hay productos</h2>
                }
            </div>
        )
}

const mapStateToProps = state => {
    return {products: state.product.products};
};

const Products = connect(mapStateToProps)(ProductList); 

export default Products;
