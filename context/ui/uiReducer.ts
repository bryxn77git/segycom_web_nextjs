import { ICategoria, ICategorias, ITipoCambio } from '../../interfaces';
import { UiState } from './';

type UiActionType = 
   | { type: '[UI] - ToggleMenu' } 
   | { type: '[UI] - ToggleMenuCategories' }
   | { type: '[UI] - ToggleMenuSubCategories' }
   | { type: '[UI] - ToggleCloseAllMenus' }
   | { type: '[UI] - ToggleCategoriesMenu' } 
   | { type: '[UI] - Tipo de Cambio', payload: ITipoCambio } 
   | { type: '[UI] - ToggleDialogProductAdded' } 
   | { type: '[UI] - ToggleAppImage' , payload: { img: string }}
   | { type: '[UI] - CategoriesMenu', payload: ICategorias[] } 
   | { type: '[UI] - SubCategoriesMenu', payload: ICategoria } 

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
            isMenuCategoriesOpen: !state.isMenuCategoriesOpen,
         }
      // case '[UI] - ToggleCategoriesMenu':
      //    return {
      //       ...state,
      //       isCategoriesMenuOpen: !state.isCategoriesMenuOpen
      //    }
         
      case '[UI] - ToggleMenuSubCategories':
         return {
            ...state,
            isMenuSubCategoriesOpen: !state.isMenuSubCategoriesOpen
         }
      case '[UI] - ToggleCloseAllMenus':
         return {
            ...state,
            isMenuOpen: false,
            isMenuCategoriesOpen: false,
            isMenuSubCategoriesOpen: false,
         }
            
      case '[UI] - ToggleAppImage':
         return {
            ...state,
            appImageShowing: action.payload.img
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
      case '[UI] - SubCategoriesMenu':
         return {
            ...state,
            subCategories: [ ...state.subCategories, action.payload ]
         }

      case '[UI] - Tipo de Cambio':
         return {
            ...state,
            tipoCambio: action.payload
         }

       default:
          return state;
   }

}