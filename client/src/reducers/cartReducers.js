import {
    CART_ADD_ITEM,
    CART_CLEAR_ITEMS,
    CART_REMOVE_ITEM,
} from '../constants/cartConstants';

export const cartReducer = ( state = { cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:{
            const item = action.payload
            const existItem = state.cartItems.find((x) => x.Style === item.Style)
            if (existItem) 
            {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.Style === existItem.Style ? item : x
                    ),
                }
            } 
            else 
            {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }
        }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.Style !== action.payload),
            }
        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems: [],
            }
        default:
            return state
    }
}