import { 
    SHOP_DETAILS_FAIL, 
    SHOP_DETAILS_REQUEST, 
    SHOP_DETAILS_SUCCESS, 
    SHOP_LIST_FAIL, 
    SHOP_LIST_REQUEST, 
    SHOP_LIST_SUCCESS,

    SHOP_CREATE_FAIL,
    SHOP_CREATE_REQUEST,
    SHOP_CREATE_RESET,
    SHOP_CREATE_SUCCESS,
} from "../constants/shopConstants"

export const shopListReducer = (state = { shops: [] }, action) => {
    switch (action.type) {
        case SHOP_LIST_REQUEST:
            return { loading: true, shops: [] }
        case SHOP_LIST_SUCCESS:
            return {
                loading: false,
                shops: action.payload,
            }
        case SHOP_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}
  
export const shopDetailsReducer = (
    state = { shop: {  } },
    action
) => {
    switch (action.type) {
        case SHOP_DETAILS_REQUEST:
            return { ...state, loading: true }
        case SHOP_DETAILS_SUCCESS:
            return { loading: false, shop: action.payload }
        case SHOP_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const shopCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case SHOP_CREATE_REQUEST:
            return { loading: true }
        case SHOP_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case SHOP_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case SHOP_CREATE_RESET:
            return {}
        default:
            return state
    }
}