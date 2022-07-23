import { compose, createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import {rootSaga} from './root-saga';
import createSagaMiddleWare from 'redux-saga';
import {rootReducer} from  './root-reducer';



const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['cart']
}
const sagaMiddleWare = createSagaMiddleWare();
const persistedReducer = persistReducer(persistConfig,rootReducer);
const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleWare].filter(Boolean)
// const middleWares = [loggerMiddleWare];

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))
export const store = createStore(persistedReducer,undefined, composedEnhancers);

sagaMiddleWare.run(rootSaga);
export const persistor = persistStore(store);