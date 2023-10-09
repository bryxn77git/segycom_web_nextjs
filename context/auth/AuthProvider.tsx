import { FC, useReducer, useEffect, PropsWithChildren, useContext } from 'react';
import { AuthContext, authReducer } from './';
import Cookies from 'js-cookie';
import axios from 'axios';

import { segycomWebApi } from '../../api';
import { IUser } from '../../interfaces';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { CartContext } from '../cart/CartContext';

export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}


const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}


export const AuthProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );
    const { data, status } = useSession();
    const { updateProductsToCart } = useContext( CartContext )
    const router = useRouter()

    useEffect(() => {
        if( status === 'authenticated'){
            // console.log({ user: data?.user })
          dispatch({ type: '[Auth] - Login', payload: data?.user as IUser});
        }
      }, [status, data])

    // useEffect(() => {
    //     checkToken();
    // }, [])

    const checkToken = async() => {

        if( !Cookies.get('token') ){
            return;
        }

        try {
            const { data } = await segycomWebApi.get('/user/validate-token');
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
        } catch (error) {
            Cookies.remove('token');
        }
    }
    


    const loginUser = async( email: string, password: string ): Promise<boolean> => {

        try {
            const { data } = await segycomWebApi.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
            return true;
        } catch (error) {
            return false;
        }

    }

    const logout = () => {
        // Cookies.remove('token');
        Cookies.remove('cart');
        Cookies.remove('name'),
        Cookies.remove('lastname'),
        Cookies.remove('phone'),
        Cookies.remove('company'),
        Cookies.remove('address'),
        Cookies.remove('city'),
        Cookies.remove('state'),
        Cookies.remove('commnets'),
        Cookies.remove('zip'),

        signOut();
        // router.reload();
    }


    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
            logout,

        }}>
            { children }
        </AuthContext.Provider>
    )
};