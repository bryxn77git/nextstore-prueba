import { FC, useReducer, PropsWithChildren, useEffect } from 'react';
import { UiContext, uiReducer } from './';
import nextStoreApi from '../../api/nextStoreApi';
import { ICategorias } from '../../interfaces';

export interface UiState {
    isMenuOpen: boolean;
    isMenuCategoriesOpen: boolean;
    isCategoriesMenuOpen: boolean;
    isDialogProductAddedOpen: boolean;
    categoriesMenu: ICategorias[];
}


const UI_INITIAL_STATE: UiState = {
    isMenuOpen: false,
    isMenuCategoriesOpen: false,
    isCategoriesMenuOpen: false,
    isDialogProductAddedOpen: false,
    categoriesMenu: [],

}


export const UiProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer( uiReducer , UI_INITIAL_STATE );

    useEffect( () => {
        getCategoriesMenu();
        sumarVisita();

    }, [])


    const sumarVisita = async() => {
        try {
            await nextStoreApi.put('/admin/visits');
            
        } catch (error) {
            console.log(error)
        }
    }
    const getCategoriesMenu = async() => {
        try {
            const { data } = await nextStoreApi.get('/categories');
            dispatch({ type: '[UI] - CategoriesMenu', payload: data })
            
        } catch (error) {
            console.log(error)
        }
    }

    const toggleSideMenu = () => {
        dispatch({ type: '[UI] - ToggleMenu' });
    }

    const toggleSideMenuCategories = () => {
        dispatch({ type: '[UI] - ToggleMenuCategories' });
    }

    const toggleSideMenuCategoriesOpen = () => {
        dispatch({ type: '[UI] - ToggleMenuCategoriesOpen' });
    }
    
    const toggleSideMenuCategoriesClose = () => {
        dispatch({ type: '[UI] - ToggleMenuCategoriesClose' });
    }

    const toggleCategoriesMenu = () => {
        dispatch({ type: '[UI] - ToggleCategoriesMenu' });
    }

    const toggleCategoriesMenuClosed = () => {
        dispatch({ type: '[UI] - ToggleCategoriesMenuClosed' });
    }
    const toggleDialogProductAdded = () => {
        dispatch({ type: '[UI] - ToggleDialogProductAdded' });
    }


    return (
        <UiContext.Provider value={{
            ...state,

            // Methods
            toggleSideMenu,
            toggleSideMenuCategories,
            toggleSideMenuCategoriesOpen,
            toggleSideMenuCategoriesClose,
            toggleCategoriesMenu,
            toggleCategoriesMenuClosed,
            toggleDialogProductAdded,
            getCategoriesMenu
        }}>
            { children }
        </UiContext.Provider>
    )
};