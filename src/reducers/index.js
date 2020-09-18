import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cart';

import productReducer from './product';

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['product']
}



const rootReducer = combineReducers({
    product: productReducer,
    cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);