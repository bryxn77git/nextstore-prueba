import { ICategorias } from '../../interfaces';
import { UiState } from './';


type UiActionType = 
   | { type: '[UI] - ToggleMenu' } 
   | { type: '[UI] - ToggleMenuCategories' }
   | { type: '[UI] - ToggleMenuCategoriesOpen' }
   | { type: '[UI] - ToggleMenuCategoriesClose' }
   | { type: '[UI] - ToggleCategoriesMenu' } 
   | { type: '[UI] - ToggleCategoriesMenuClosed' } 
   | { type: '[UI] - ToggleDialogProductAdded' } 
   | { type: '[UI] - CategoriesMenu', payload: ICategorias[] } 



export const uiReducer = ( state: UiState, action: UiActionType ): UiState => {

   switch (action.type) {
      case '[UI] - ToggleMenu':
         return {
            ...state,
            isMenuOpen: !state.isMenuOpen,
        }
      case '[UI] - ToggleMenuCategories':
         return {
            ...state,
            isMenuOpen: false,
            isMenuCategoriesOpen: false,
        }
      case '[UI] - ToggleMenuCategoriesOpen':
         return {
            ...state,
            isMenuCategoriesOpen: true,
        }
      case '[UI] - ToggleMenuCategoriesClose':
         return {
            ...state,
            isMenuCategoriesOpen: false,
        }
      case '[UI] - ToggleCategoriesMenu':
         return {
            ...state,
            isCategoriesMenuOpen: !state.isCategoriesMenuOpen
        }
      case '[UI] - ToggleCategoriesMenuClosed':
         return {
            ...state,
            isCategoriesMenuOpen: false
        }
      case '[UI] - ToggleDialogProductAdded':
         return {
            ...state,
            isDialogProductAddedOpen: !state.isDialogProductAddedOpen
        }
      case '[UI] - CategoriesMenu':
         return {
            ...state,
            categoriesMenu: action.payload
        }

       default:
          return state;
   }

}