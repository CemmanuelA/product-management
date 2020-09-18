import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addToCart } from '../../../actions';
import './index.scss';

const ProductCard = ({product, addToCart}) => {
    const { name, description, photo} = product;
    const history = useHistory();
    const [amount, setAmount] = React.useState(1);
    const navigateToForm = () => {
        history.push({
            pathname: '/product-form',
            state: { product } 
        });

    }
    const handleMore = () => {
        if (amount < product.stock) {
            setAmount(amount + 1);
        }
    }

    const handleLess = () => {
        if (amount > 1) {
            setAmount(amount - 1);
        }
    }
    const handleAdd = () => {
        // there are not products
        if (!(amount > product.stock)) {
            const productAdded = {product: {...product}, amount};
            addToCart(productAdded);
        } else {
            alert('There are not products to buy');
        }
        setAmount(1);
    }
    return (
        <div className="card">
            <div className="card-image">
                <img src={photo} alt="product" />
            </div>
            <div className="card-description">
                <div className="title-container">
                    <span> {name} </span>
                    <img src={process.env.PUBLIC_URL + 'assets/images/edit.png'} alt="edit" onClick={() => navigateToForm()}/>
                </div>
                <p>
                    {description}
                </p>
                <div className="stock-container">
                    <div>
                        <img src={process.env.PUBLIC_URL + 'assets/images/less.png'} alt="less" onClick={() => handleLess()}/>
                        <span>{amount}</span>
                        <img src={process.env.PUBLIC_URL + 'assets/images/add.png'} alt="add" onClick={() => handleMore()}/>
                    </div>
                    <div>
                        <button className="btn" onClick={() => handleAdd() }> Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: product => dispatch(addToCart(product))
    }
}

export default connect(null,mapDispatchToProps)(ProductCard);