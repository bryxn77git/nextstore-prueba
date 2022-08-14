import { useContext } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import { IProduct } from '../interfaces';
import { ProductContext } from '../context/product/ProductContext';


// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const useProducts = (url: string, config: SWRConfiguration = {} ) => {

    const { data, error } = useSWR<{ 
        products: IProduct[],
        productsCount: IProduct[]
    }>(`/api${ url }`, config );

    return {
        products: data?.products || [],
        productsCount: data?.productsCount || [],
        isLoading: !error && !data,
        isError: error
    }

}