import { createContext } from 'react';
import { IProduct } from '../../interfaces';


interface ContextProps {
    producstList: IProduct[];
    categoryList: string;

    changeProducts: (products: IProduct[], category: string) => void;
}


export const ProductContext = createContext({} as ContextProps );