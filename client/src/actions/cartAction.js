// import axios from 'axios';
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
} from '../constants/cartConstants';

export const addToCart = (data) => async (dispatch, getState) => {
    dispatch({
        type: CART_ADD_ITEM,
        payload: data,
    })

    // console.log(getState().cart.cartItems);


    // let cart = JSON.parse(localStorage.getItem('cartItems'));
    // let newCart = getState().cart.cartItems[0];
    
    // if (5>3) {

    // } else {
    //     alert('Item Already in Cart');
    // }
    // cart.push(newCart);
    // localStorage.setItem('cartItems', JSON.stringify(cart));
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

};

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id,
    });
  
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};

  