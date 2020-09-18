import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/index';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer,
        storeEnhancers(applyMiddleware(thunk))
    );

export const persistor = persistStore(store);