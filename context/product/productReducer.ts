import { IProduct } from '../../interfaces';
import { ProductState } from './ProductProvider';


type ProductActionType = 
   | { type: '[Product] - Get productos', payload: { categoryList: string, products: IProduct[]} } 


export const productReducer = ( state: ProductState, action: ProductActionType ): ProductState => {

   switch (action.type) {
        case '[Product] - Get productos':
            return {
                ...state,
                categoryList: action.payload.categoryList,
                producstList: action.payload.products
            }



       default:
          return state;
   }

}