import productReducer from "./product";

const { ADD_PRODUCT_TO_CART, EMPTY_CART, DELETE_ITEM} = require("../constans/action-types");

const initalState = {
    cart: []
}

const cartReducer = (state = initalState,action) => {
    switch (action.type) {
        case ADD_PRODUCT_TO_CART:
            const product = action.payload;
            const cart = state.cart.filter( item => item.product.id !== product.product.id);
            product.id = `cart_${Math.floor(Math.random() * 100)}`
            return { ...state, cart: cart.concat(product)};
        case DELETE_ITEM: {
            let cart = [...state.cart];
            let product = action.payload;
            cart = cart.filter( item => (item.product.id !== product.id))
            return {...state, cart};
        }
        case EMPTY_CART:
            return {...state, cart: []}
        default:
            return state;
    }
}

export default cartReducer;