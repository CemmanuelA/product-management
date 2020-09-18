import { ADD_PRODUCT, BUY_PRODUCTS, UPDATE_PRODUCT } from "../constans/action-types";

const initialState = {
    products: [],
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT: {
            action.payload.id = action.payload.name + '_' + Math.random() * 100;
            console.log(action.payload);
            return {...state, 
                products: state.products.concat(action.payload)
            };
        }
        case UPDATE_PRODUCT: {
            let products = [...state.products];
            const productUpdated = action.payload;
            const idx =  products.findIndex( product => product.id === productUpdated.id)
            products[idx] = productUpdated;
            return {...state, 
                products
            };
        }
        case BUY_PRODUCTS: {
            let products = [...state.products];
            console.log(products, 'PRODUCTS')
            let cart = action.payload;
            console.log(cart, 'CART')
            products.forEach( product => {
                const cartItem = cart.find( item => item.product.id === product.id);
                if (cartItem) {
                    product.stock = product.stock - cartItem.amount;
                }
            } )
            return { ...state, products}
        }
           
        default:
            return state;
    }
};

export default productReducer;