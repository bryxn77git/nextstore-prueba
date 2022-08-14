import { FC, useReducer, useEffect, PropsWithChildren } from 'react';
import { IProduct } from '../../interfaces';
import { ProductContext } from './ProductContext';
import { productReducer } from './productReducer';


export interface ProductState {
    producstList: IProduct[];
    categoryList: string;
}


const PRODUCT_INITIAL_STATE: ProductState = {
    producstList: [],
    categoryList: ''
}


export const ProductProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer( productReducer, PRODUCT_INITIAL_STATE );

    const changeProducts = ( products: IProduct[], categoryList: string) => {
        dispatch({ type: '[Product] - Get productos', payload: {categoryList, products} })
    }


    return (
        <ProductContext.Provider value={{
            ...state,

            changeProducts,

        }}>
            { children }
        </ProductContext.Provider>
    )
};