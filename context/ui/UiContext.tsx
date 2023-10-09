import { createContext } from 'react';
import { ICategorias, ICategoria, ITipoCambio } from '../../interfaces';


interface ContextProps {
    isMenuOpen: boolean;
    isMenuCategoriesOpen: boolean;
    isMenuSubCategoriesOpen: boolean;
    isDialogProductAddedOpen: boolean;
    subCategories: ICategoria[];
    categoriesMenu: ICategorias[];
    appImageShowing: string;
    tipoCambio: ITipoCambio;

    // Methods
    toggleSideMenu: () => void;
    toggleSideMenuCategories: () => void;
    toggleSideMenuSubCategories: () => void;
    toggleCloseAllMenus: () => void;
    subCategoriesStartLoading: (idSubcategory: number | string) => Promise<void>;
    // toggleCategoriesMenu: () => void;
    toggleDialogProductAdded: () => void;
    getCategoriesMenu: () => Promise<void>;
    toggleChangeImageApp: (img: string) => void;
    getTipoCambio: () => Promise<void>;
}


export const UiContext = createContext({} as ContextProps );