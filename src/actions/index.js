import { ADD_PRODUCT,
        ADD_PRODUCT_TO_CART,
        BUY_PRODUCTS, 
        UPDATE_PRODUCT,
        EMPTY_CART, DELETE_ITEM } from "../constans/action-types";

export function addProduct(payload) {
    return { type: ADD_PRODUCT, payload}
}

export function updateProduct(payload) {
    return { type: UPDATE_PRODUCT, payload}
}

export function buyProducts(payload) {
    return { type: BUY_PRODUCTS, payload}
}

export function addToCart(payload) {
    return { type: ADD_PRODUCT_TO_CART, payload}
}

export function emptyCart() {
    return { type: EMPTY_CART}
}
export function deleteItem(payload) {
    return { type: DELETE_ITEM, payload}
}


export function handleBuyProduct(cart) {
    return dispatch => {
        dispatch(emptyCart());
        dispatch(buyProducts(cart))
    }
}