import { FC, useReducer, useEffect, PropsWithChildren } from 'react';
import { AuthContext, authReducer } from './';
import Cookies from 'js-cookie';
import axios from 'axios';

import { nextStoreApi } from '../../api';
import { IUser } from '../../interfaces';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

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
    const router = useRouter()

    useEffect(() => {
        if( status === 'authenticated'){
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
            const { data } = await nextStoreApi.get('/user/validate-token');
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
        } catch (error) {
            Cookies.remove('token');
        }
    }
    


    const loginUser = async( email: string, password: string ): Promise<boolean> => {

        try {
            const { data } = await nextStoreApi.post('/user/login', { email, password });
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
            return true;
        } catch (error) {
            return false;
        }

    }


    const registerUser = async( name: string, email: string, password: string ): Promise<{hasError: boolean; message?: string}> => {
        try {
            const { data } = await nextStoreApi.post('/user/register', { name, email, password });
            const { token, user } = data;
            Cookies.set('token', token );
            dispatch({ type: '[Auth] - Login', payload: user });
            return {
                hasError: false
            }

        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    // message: error.response?.data.message!
                }
            }

            return {
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
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
            registerUser,
            logout,

        }}>
            { children }
        </AuthContext.Provider>
    )
};