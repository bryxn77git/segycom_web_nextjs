import { createContext } from 'react';
import { ICartProduct, ShippingAddress } from '../../interfaces';

interface ContextProps {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?: ShippingAddress ;

    // Methods
    addProductToCart: (product: ICartProduct) => void;
    updateCartQuantity: (product: ICartProduct) => void;
    removeCartProduct: (product: ICartProduct) => void;
    updateAddress: (address: ShippingAddress) => void;
    updateProductsToCart: (products: ICartProduct[]) => void;
    createOrder: () => Promise<{hasError: boolean; message: string;}>;
    completeOrderInvitado: () => Promise<void>;
}


export const CartContext = createContext({} as ContextProps );