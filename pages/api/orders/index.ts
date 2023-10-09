import type { NextApiRequest, NextApiResponse } from 'next'
import { syscomApi } from '../../../api';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces/order';
import { Order } from '../../../models';
import { jwt } from '../../../utils';
import { IProducto } from '../../../interfaces/products';
import { ITipoCambio } from '../../../interfaces';
import * as jose from 'jose';
import * as jwtoken from 'jsonwebtoken';
import { getSession } from 'next-auth/react';


type Data = 
| { message: string }
| IOrder;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return createOrder( req, res );
    
        default:
            res.status(400).json({ message: 'Bad request' })
    }

}

const createOrder = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { orderItems, total } = req.body as IOrder;
    // const { token = ''  } = req.cookies;

    // let userId = '';
    // let role = '';

    // try {
    //     userId = await jwt.isValidToken( token );

    // } catch (error) {
    //     return res.status(401).json({message: 'Debe de estar autenticado para hacer esto'}); 
    // }
    const session: any = await getSession({ req });
    if ( !session ) {
        return res.status(401).json({message: 'Debe de estar autenticado para hacer esto'});
    }

    const productsIds = orderItems.map( product => product.producto_id );
    await db.connect();

    const dbProducts: IProducto[] = await Promise.all(productsIds.map(async productId => {
        const { data: productdb } = await syscomApi.get(`/productos/${productId}`)
        return productdb
      }));
    // const dbProducts = await Product.find({ _id: { $in: productsIds } });

    const { data: tipoCambio } = await syscomApi.get<ITipoCambio>('/tipocambio');

    
        // try {
        //     await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));
        //     const decoded = jwtoken.decode(token) as { role: string, _id: string };
        //     role = decoded.role;
        //     userId = decoded._id;
        // } catch (error) {
            
        //     console.log(error)
        // } 
          

        dbProducts.map( product => {
            // TODO Validar el tipo de usuario para mostrar precios
            if( product.precios ) {
                
                if (session?.user) {
                    const { role } = session.user as { role: string };
                
                    if( product.precios ) {
                                
                        switch (role) {
                            case 'admin':
                                product.precios.precio_descuento =  Number(product.precios.precio_descuento) * Number(tipoCambio.normal);
                                product.precios.precio_lista = Number(product.precios.precio_lista) * Number(tipoCambio.normal)
                            break;
                            case 'clientA':
                                product.precios.precio_descuento = 0;
                                product.precios.precio_especial = 0;
                                product.precios.precio_lista = (Number(product.precios.precio_lista)  - ( Number(product.precios.precio_lista)  * (15 / 100))) * Number(tipoCambio.normal)
                            break;
                            case 'clientB':
                                product.precios.precio_descuento = 0;
                                product.precios.precio_especial = 0;
                                product.precios.precio_lista = (Number(product.precios.precio_lista)  - ( Number(product.precios.precio_lista)  * (20 / 100))) * Number(tipoCambio.normal)
                            break;
                            case 'clientC':
                                product.precios.precio_descuento = 0;
                                product.precios.precio_especial = 0;
                                product.precios.precio_lista = (Number(product.precios.precio_lista)  - ( Number(product.precios.precio_lista)  * (25 / 100))) * Number(tipoCambio.normal)
                            break;
                        
                            default:
                            break;
                        }
                    
                    }               
                }
            } 
            
          })

    try {

        const subTotal = orderItems.reduce( ( prev, current ) => {
            const currentPrice = dbProducts.find( prod => prod.producto_id === current.producto_id )?.precios?.precio_lista;
            if ( !currentPrice ) {
                throw new Error('Verifique el carrito de nuevo, producto no existe');
            }

            return (Number(currentPrice) * current.quantity) + prev
        }, 0 );


        const taxRate =  Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const backendTotal = subTotal * ( taxRate + 1 );

        if ( total !== backendTotal ) {
            throw new Error('El total no cuadra con el monto');
        }

        // Todo bien hasta este punto
        const newOrder = new Order({ ...req.body, status: 'pendiente', user: session.user._id });
        await newOrder.save();
        await db.disconnect();
        
        return res.status(201).json( newOrder );



        
    } catch (error:any) {
        await db.disconnect();
        console.log(error);
        res.status(400).json({
            message: error.message || 'Revise logs del servidor'
        })
    }


}
