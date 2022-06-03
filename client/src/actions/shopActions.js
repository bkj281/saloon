import axios from 'axios';
import {
  SHOP_DETAILS_FAIL,
  SHOP_DETAILS_REQUEST,
  SHOP_DETAILS_SUCCESS,
  SHOP_LIST_FAIL,
  SHOP_LIST_REQUEST,
  SHOP_LIST_SUCCESS,

  SHOP_CREATE_REQUEST,
  SHOP_CREATE_SUCCESS,
  SHOP_CREATE_FAIL,
} from '../constants/shopConstants'
import { backendUrl } from '../constants/urlConstant ';
import { logout } from './userActions';

export const listShops = (search) => async (
  dispatch, getState
) => {
  try {
    dispatch({ type: SHOP_LIST_REQUEST, })

    const {
      userLogin: { userInfo },
    } = getState()

    // const config = {
    //     headers: {
    //       'x-access-token': userInfo.token,
    //     }
    //   }
    if (search === "") {
      var { data } = await axios.get(
        `${backendUrl}/saloons/shops`,
        // config
      )
    }
    else {
      var { data } = await axios.get(
        `${backendUrl}/saloons/shops?search=${search}`
      )
    }
    dispatch({
      type: SHOP_LIST_SUCCESS,
      payload: data.list,
    })
  } catch (error) {
    dispatch({
      type: SHOP_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listShopDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SHOP_DETAILS_REQUEST })
    // console.log(id);
    const { data } = await axios.get(`${backendUrl}/saloons/shop/${id}`)
    // console.log(data);
    dispatch({
      type: SHOP_DETAILS_SUCCESS,
      payload: data.saloon,
    })
  } catch (error) {
    dispatch({
      type: SHOP_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const registerShop = (userId, ShopName, shopAddress, shopPincode, shopImage, openTiming, closeTiming) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHOP_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    // console.log(ShopName, shopAddress, shopPincode, shopImage, openTiming, closeTiming)
    const { data } = await axios.post(`${backendUrl}/saloons/shopDetails`, { userId, ShopName, shopAddress, shopPincode, shopImage, openTiming, closeTiming }, config)
    // console.log(data);
    dispatch({
      type: SHOP_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: SHOP_CREATE_FAIL,
      payload: message,
    })
  }
}