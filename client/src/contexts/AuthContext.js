import { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'

import { apiurl, LOCAL_STORAGE_TOKEN_NAME } from './constant';
import { authReducer } from '../reducer/authReducer';
import setAuthToken from '../utils/setAuthToken';

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    // use reducer
    const [authState, dispatch] = useReducer(authReducer , {
        authLoading: true,
        isAuthenticated: false,
        user: null,
    })

    // Authenticated user
    const loadUser = async () => {
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
        }

        try {
            const response = await axios.get(`${apiurl}/auth`);

            if(response.status === 200) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: {
                        isAuthenticated: true,
                        authLoading: false,
                        user: response.data.user
                    }
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
            setAuthToken(null);
            dispatch({
                type: 'SET_AUTH',
                payload: {
                    isAuthenticated: false,
                    // authLoading: true,
                    user: null
                }
            })
        }
    }

    useEffect(() => {loadUser()}, []);

    // login
    const loginUser = async (useForm) => {
        try {
            const response = await axios.post(`${apiurl}/auth/login`, useForm);
            if(response.status === 200) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME, 
                    response.data.token    
                )
            }

            await loadUser();

            return response;
        } catch (error) {
            if(error.response) return error.response;
            return {success: false, message: error};
        }
    }

    // logoutUser
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch({
            type: 'SET_AUTH',
            payload: {
                isAuthenticated: false,
                user: null
            }
        })
    }

    // register
    const registerUser = async (useForm) => {
        try {
            const response = await axios.post(`${apiurl}/auth/register`, useForm);

            return response;
        } catch (error) {
            if(error.response) return error.response;
            return {success: false, message: error} 
        }
    }

    // Context data
    const authContextData = {
        loginUser,
        registerUser,
        authState,
        logoutUser,
    }

    // return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;