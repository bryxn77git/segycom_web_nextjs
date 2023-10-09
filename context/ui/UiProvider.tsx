import { FC, useReducer, PropsWithChildren, useEffect } from 'react';
import { UiContext, uiReducer } from './';
import { syscomApi } from '../../api';
import { ICategoria, ICategorias, ITipoCambio } from '../../interfaces';

export interface UiState {
    isMenuOpen: boolean;
    isMenuCategoriesOpen: boolean;
    isMenuSubCategoriesOpen: boolean;
    isDialogProductAddedOpen: boolean;
    appImageShowing: string;
    categoriesMenu: ICategorias[];
    subCategories: ICategoria[];
    tipoCambio: ITipoCambio;

}


const UI_INITIAL_STATE: UiState = {
    isMenuOpen: false,
    isMenuCategoriesOpen: false,
    isMenuSubCategoriesOpen: false,
    isDialogProductAddedOpen: false,
    appImageShowing: 'app-screen01.webp',
    categoriesMenu: [],
    subCategories: [],
    tipoCambio: {
        normal: '0'
    },


}


export const UiProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer( uiReducer , UI_INITIAL_STATE );   
    
    const toggleChangeImageApp = ( img: string ) => {
        dispatch({ type: '[UI] - ToggleAppImage', payload: { img } })
    }

    const toggleSideMenu = () => {
        dispatch({ type: '[UI] - ToggleMenu' });
    }

    const toggleSideMenuCategories = () => {
        dispatch({ type: '[UI] - ToggleMenuCategories' });
    }

    const toggleSideMenuSubCategories = () => {
        dispatch({ type: '[UI] - ToggleMenuSubCategories' });
    }
    
    const toggleCloseAllMenus = () => {
        dispatch({ type: '[UI] - ToggleCloseAllMenus' });
    }

    // const toggleCategoriesMenu = () => {
    //     dispatch({ type: '[UI] - ToggleCategoriesMenu' });
    // }

    const toggleDialogProductAdded = () => {
        dispatch({ type: '[UI] - ToggleDialogProductAdded' });
    }

    const subCategoriesStartLoading = async(idSubcategory: number|string) => {
    
        try {
            const { data } = await syscomApi.get<ICategoria>( `categorias/${idSubcategory}`);
            data.subcategorias.sort((a, b) => a.nombre.localeCompare(b.nombre));
            dispatch( { type: '[UI] - SubCategoriesMenu', payload: data } );
            
        } catch (error) {
            console.log(error)
        }
    
    }

    const getCategoriesMenu = async() => {
        try {
            const { data } = await syscomApi.get<ICategorias[]>('categorias');
            data.sort((a, b) => a.nombre.localeCompare(b.nombre));
            dispatch({ type: '[UI] - CategoriesMenu', payload: data })
            
        } catch (error) {
            console.log(error)
        }
    }

    const getTipoCambio = async() => {
        try {
            const { data } = await syscomApi.get('tipocambio');

            dispatch({ type: '[UI] - Tipo de Cambio', payload: data })

            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      getTipoCambio();
    }, [])
    

    return (
        <UiContext.Provider value={{
            ...state,

            // Methods
            toggleSideMenu,
            toggleChangeImageApp,
            toggleSideMenuCategories,
            toggleSideMenuSubCategories,
            toggleCloseAllMenus,
            subCategoriesStartLoading,
            // toggleCategoriesMenu
            toggleDialogProductAdded,
            getCategoriesMenu,
            getTipoCambio,

        }}>
            { children }
        </UiContext.Provider>
    )
};