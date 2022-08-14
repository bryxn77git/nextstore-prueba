import { createContext } from 'react';
import { ICategorias } from '../../interfaces';


interface ContextProps {
    isMenuOpen: boolean;
    isMenuCategoriesOpen: boolean;
    isCategoriesMenuOpen: boolean;
    isDialogProductAddedOpen: boolean;
    categoriesMenu: ICategorias[];

    // Methods
    toggleSideMenu: () => void;
    toggleSideMenuCategories: () => void;
    toggleSideMenuCategoriesOpen: () => void;
    toggleSideMenuCategoriesClose: () => void;
    toggleCategoriesMenu: () => void;
    toggleCategoriesMenuClosed: () => void;
    toggleDialogProductAdded: () => void;
    getCategoriesMenu: () => Promise<void>;
}


export const UiContext = createContext({} as ContextProps );