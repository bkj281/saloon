import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';
import { shopCreateReducer, shopDetailsReducer, shopListReducer } from './reducers/shopReducers';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer } from './reducers/orderReducers';
import logger from 'redux-logger';

const reducer = combineReducers(
    {
        // authentication
        userRegister:userRegisterReducer,
        userLogin : userLoginReducer,

        // shops
        shopList : shopListReducer,
        shopDetails : shopDetailsReducer, 
        shopCreate : shopCreateReducer, 

        // cart
        cart : cartReducer,

        // appointment booking
        orderCreate  : orderCreateReducer,
    }
);

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null
const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []
const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
    cart: {
        cartItems: cartItemsFromStorage,
    },
}

const middleware = [thunk, logger];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  )
  
  export default store