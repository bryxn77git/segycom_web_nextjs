import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';

import { ICartProduct, IOrder, IProducto, ITipoCambio, IUser, ShippingAddress } from '../../interfaces';
import { CartContext, cartReducer } from './';
import { segycomWebApi, syscomApi } from '../../api';
import { useSession } from 'next-auth/react';

export interface CartState {
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    shippingAddress?: ShippingAddress;
}

const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined,
}


export const CartProvider:FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer( cartReducer , CART_INITIAL_STATE );
    const { data, status } = useSession();

    // Efecto
    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ): []
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: cookieProducts });
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cookies | storage', payload: [] });
        }
    }, []);

    useEffect(() => {
        if( Cookie.get('name') ){
            const shippingAddress = {
                name     : Cookie.get('name') || '',
                lastname : Cookie.get('lastname') || '',
                phone    : Cookie.get('phone') || '',
                company  : Cookie.get('company') || '',
                address  : Cookie.get('address') || '',
                city     : Cookie.get('city') || '',
                state    : Cookie.get('state') || '',
                commnets : Cookie.get('commnets') || '',
                zip      : Cookie.get('zip') || '',
            }
            dispatch({ type: '[Cart] - LoadAddress from Cookies', payload: shippingAddress})
        }
    }, []);
    
    useEffect(() => {
      Cookie.set('cart', JSON.stringify( state.cart ));
    }, [state.cart]);


    useEffect(() => {
        
        const numberOfItems = state.cart.reduce( ( prev, current ) => current.quantity + prev , 0 );
        // const subTotal = state.cart.reduce( ( prev, current ) => (current.price * current.quantity) + prev, 0 );
        const subTotal = state.cart.reduce( ( prev, current ) => {
            if(current.precio){
               return (Number(current.precio) * current.quantity) + prev
            }else {
                return 0
            }
        }, 0);
        const taxRate =  Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        
        // console.log(subTotal)
        const orderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * ( taxRate + 1 )
        }
        // console.log(orderSummary)

        dispatch({ type: '[Cart] - Update order summary', payload: orderSummary });
    }, [state.cart]);

    useEffect(() => {
      if( status === 'authenticated'){
        // console.log('autenticado')
        const user = data?.user as IUser;
        const role = user.role;
        const products = state.cart;

        products.map( async product => {
            
        
            // console.log(product)

            // let role = '';

            // if( Cookie.get('token') ){

            //     try {
            //         const token = Cookie.get('token')!;
            //         const decodedToken = Buffer.from(token.split('.')[1], 'base64');
            //         const parsedToken = JSON.parse(decodedToken.toString());
                
            //         role = parsedToken.role;
            //     } catch (error) {
            //         console.log(error)
            //     }
            // }
            const { data: tipoCambio } = await syscomApi.get<ITipoCambio>('/tipocambio');
            const { data: productInDb } = await syscomApi.get<IProducto>(`/productos/${ product.producto_id }`)

            if( role !== ''){       
                switch (role) {
                    case 'admin':
                        product.precio = Number(productInDb.precios?.precio_lista) * Number(tipoCambio.normal)
                    break;
                    case 'clientA':
                        product.precio = (Number(productInDb.precios?.precio_lista)  - ( Number(productInDb.precios?.precio_lista)  * (15 / 100))) * Number(tipoCambio.normal)
                    break;
                    case 'clientB':
                        product.precio = (Number(productInDb.precios?.precio_lista)  - ( Number(productInDb.precios?.precio_lista)  * (20 / 100))) * Number(tipoCambio.normal)
                    break;
                    case 'clientC':
                        product.precio = (Number(productInDb.precios?.precio_lista)  - ( Number(productInDb.precios?.precio_lista)  * (25 / 100))) * Number(tipoCambio.normal)
                    break;
                
                    default:
                    break;
                }     
            }
            
            dispatch({ type: '[Cart] - Update products in cart', payload: products });
        });
      }
    }, [status])
    



    const addProductToCart = ( product: ICartProduct ) => {
        //! Nivel 1
        // dispatch({ type: '[Cart] - Add Product', payload: product });

        //! Nivel 2
        // const productsInCart = state.cart.filter( p => p._id !== product._id && p.size !== product.size );
        // dispatch({ type: '[Cart] - Add Product', payload: [...productsInCart, product] })
        //! Nivel Final
        const productInCart = state.cart.some( p => p.producto_id === product.producto_id );
        if ( !productInCart ) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product ] })

        // Acumular
        const updatedProducts = state.cart.map( p => {
            if ( p.producto_id !== product.producto_id ) return p;

            // Actualizar la cantidad
            p.quantity += product.quantity;
            return p;
        });

        dispatch({ type: '[Cart] - Update products in cart', payload: updatedProducts });

    }

    const updateProductsToCart =  async( products: ICartProduct[] ) => {



        // console.log(data)
        // const user = data?.user as IUser;
        // const role = user.role;

        // products.map( async product => {
            
        
        //     console.log(product)

        //     // let role = '';

        //     // if( Cookie.get('token') ){

        //     //     try {
        //     //         const token = Cookie.get('token')!;
        //     //         const decodedToken = Buffer.from(token.split('.')[1], 'base64');
        //     //         const parsedToken = JSON.parse(decodedToken.toString());
                
        //     //         role = parsedToken.role;
        //     //     } catch (error) {
        //     //         console.log(error)
        //     //     }
        //     // }
        //     const { data: tipoCambio } = await syscomApi.get<ITipoCambio>('/tipocambio');
        //     const { data: productInDb } = await syscomApi.get<IProducto>(`/productos/${ product.producto_id }`)

        //     if( role !== ''){       
        //         switch (role) {
        //             case 'admin':
        //                 product.precio = Number(productInDb.precios?.precio_lista) * Number(tipoCambio.normal)
        //             break;
        //             case 'clientA':
        //                 product.precio = (Number(productInDb.precios?.precio_lista)  - ( Number(productInDb.precios?.precio_lista)  * (15 / 100))) * Number(tipoCambio.normal)
        //             break;
        //             case 'clientB':
        //                 product.precio = (Number(productInDb.precios?.precio_lista)  - ( Number(productInDb.precios?.precio_lista)  * (20 / 100))) * Number(tipoCambio.normal)
        //             break;
        //             case 'clientC':
        //                 product.precio = (Number(productInDb.precios?.precio_lista)  - ( Number(productInDb.precios?.precio_lista)  * (25 / 100))) * Number(tipoCambio.normal)
        //             break;
                
        //             default:
        //             break;
        //         }     
        //     }
            
        //     dispatch({ type: '[Cart] - Update products in cart', payload: products });
        // });
    

    }


    const updateCartQuantity = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Change cart quantity', payload: product });
    }

    const removeCartProduct = ( product: ICartProduct ) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product });
    }

    const updateAddress = ( address: ShippingAddress ) => {
        Cookie.set('name', address.name);
        Cookie.set('lastname', address.lastname);
        Cookie.set('phone', address.phone);
        Cookie.set('company', address.company || '');
        Cookie.set('address', address.address);
        Cookie.set('city', address.city);
        Cookie.set('state', address.state);
        Cookie.set('commnets', address.commnets || '');
        Cookie.set('zip', address.zip || '');
        dispatch({ type: '[Cart] - Update Address', payload: address })

    }

    const createOrder = async():Promise<{ hasError: boolean; message: string; }> => {

        if ( !state.shippingAddress ) {
            throw new Error('No hay dirección de entrega');
        }

        const body: IOrder = {
            orderItems: state.cart.map( p => ({
                ...p,
            })),
            shippingAddress: state.shippingAddress,
            numberOfItems: state.numberOfItems,
            status: 'pendiente',
            subTotal: state.subTotal,
            tax: state.tax,
            total: state.total,
        }


        try {
            
            const { data } = await segycomWebApi.post<IOrder>('/orders', body);

            dispatch({ type: '[Cart] - Order complete' });

            return {
                hasError: false,
                message: data._id!
            }


        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: 'El total no cuadra con el monto'
                }
            }
            return {
                hasError: true,
                message : 'Error no controlado, hable con el administrador'
            }
        }

    }

    const completeOrderInvitado = async() => {
        dispatch({ type: '[Cart] - Order complete' });
    }


    return (
        <CartContext.Provider value={{
            ...state,

            // Methods
            addProductToCart,
            removeCartProduct,
            updateCartQuantity,
            updateProductsToCart,
            updateAddress,
            createOrder,
            completeOrderInvitado,
        }}>
            { children }
        </CartContext.Provider>
    )
};