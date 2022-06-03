import axios from "axios";
import {
    // login
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    
    // logout
    USER_LOGOUT,

    // register
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,

} from '../constants/userConstants'
import { backendUrl } from "../constants/urlConstant ";
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        })
  
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
  
        const { data } = await axios.post(
            `${backendUrl}/user/login`,
            { email, password },
            config
        )

        localStorage.setItem('userInfo', JSON.stringify(data));
        localStorage.setItem('user', data.user._id);
  
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('user');
    localStorage.removeItem('cartItems');
    dispatch({ type: USER_LOGOUT })
}

export const register = (name, email, password, City, State, phoneNo, Pincode, Role) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST,
        })
    
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.post(
            `${backendUrl}/user/register`,
            { name, email, password, City, State, phoneNo, Pincode, Role },
            config
        )
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data,
        })
    
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        })
    
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}