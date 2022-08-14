import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';

import { ICartProduct, IOrder, ShippingAddress } from '../../interfaces';
import { CartContext, cartReducer } from './';
import nextStoreApi from '../../api/nextStoreApi';

export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    shippingAddress?: ShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [],
    numberOfItems: 0,
    shippingAddress: undefined,
}


export const CartProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer( cartReducer , CART_INITIAL_STATE );

    // Efecto
    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ): []
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
        }

        
    }, []);

    useEffect(() => {
        if( Cookie.get('name') ){
            const shippingAddress = {
                name     : Cookie.get('name') || '',
                lastname : Cookie.get('lastname') || '',
                phone    : Cookie.get('phone') || '',
                company  : Cookie.get('company') || '',
                address  : Cookie.get('address') || '',
                city     : Cookie.get('city') || '',
                state    : Cookie.get('state') || '',
                commnets : Cookie.get('commnets') || '',
                zip      : Cookie.get('zip') || '',
            }
    
            dispatch({ type: '[Cart] - LoadAddress from Cookies', payload: shippingAddress})

        }
    }, [])

    
    useEffect(() => {
      Cookie.set('cart', JSON.stringify( state.cart ));
    }, [state.cart]);


    useEffect(() => {
        
        const numberOfItems = state.cart.reduce( ( prev, current ) => current.quantity + prev , 0 );
    
        const orderSummary = {
            numberOfItems,
        }

        dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
    }, [state.cart]);



    const addProductToCart = ( product: ICartProduct ) => {
        //! Nivel 1
        // dispatch({ type: '[Cart] - Add Product', payload: product });

        //! Nivel 2
        // const productsInCart = state.cart.filter( p => p._id !== product._id && p.size !== product.size );
        // dispatch({ type: '[Cart] - Add Product', payload: [...productsInCart, product] })
        //! Nivel Final
        const productInCart = state.cart.some( p => p._id === product._id );
        if ( !productInCart ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })

        const productInCartButDifferentSize = state.cart.some( p => {
            if(p._id === product._id && (p.talla === product.talla && p.color?.color === product.color?.color)) return true

            return false
        } );
        if ( !productInCartButDifferentSize ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })

        // Acumular
        const updatedProducts = state.cart.map( p => {
            if ( p._id !== product._id ) return p;
            if ( p.talla !== product.talla) return p
            if ( p.color?.color !== product.color?.color) return p

            // Actualizar la cantidad
            p.quantity += product.quantity;
            return p;
        });

        dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });

    }

    const updateCartQuantity = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Change cart quantity', payload: product });
    }

    const removeCartProduct = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product });
    }

    const updateAddress = ( address: ShippingAddress ) => {
        Cookie.set('name', address.name);
        Cookie.set('lastname', address.lastname);
        Cookie.set('phone', address.phone);
        Cookie.set('company', address.company || '');
        Cookie.set('address', address.address);
        Cookie.set('city', address.city);
        Cookie.set('state', address.state);
        Cookie.set('commnets', address.commnets || '');
        Cookie.set('zip', address.zip || '');
        dispatch({ type: '[Cart] - Update Address', payload: address })

    }

    const createOrder = async():Promise<{ hasError: boolean; message: string; }> => {

        if ( !state.shippingAddress ) {
            throw new Error('No hay dirección de entrega');
        }

        const body: IOrder = {
            orderItems: state.cart.map( p => ({
                ...p,
                size: p.talla!,
                color: p.color!,
            })),
            shippingAddress: state.shippingAddress,
            numberOfItems: state.numberOfItems,
            status: 'pendiente',
        }


        try {
            
            const { data } = await nextStoreApi.post<IOrder>('/orders', body);

            dispatch({ type: '[Cart] - Order complete' });

            return {
                hasError: false,
                message: data._id!
            }


        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: 'El total no cuadra con el monto'
                }
            }
            return {
                hasError: true,
                message : 'Error no controlado, hable con el administrador'
            }
        }

    }

    const completeOrderInvitado = async() => {
        dispatch({ type: '[Cart] - Order complete' });
    }


    return (
        <CartContext.Provider value={{
            ...state,

            // Methods
            addProductToCart,
            removeCartProduct,
            updateCartQuantity,
            updateAddress,
            createOrder,
            completeOrderInvitado,
        }}>
            { children }
        </CartContext.Provider>
    )
};