import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Order } from '../../../models';
import { IOrder } from '../../../interfaces';
import { isValidObjectId } from 'mongoose';

type Data = 
| { message: string } 
|   IOrder[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {

        case 'GET':
            return getOrders(req, res);
        case 'PUT':
            return updateOrder(req, res);

        default:
            return res.status(400).json({ message: 'Bad request'});

    }


}

const getOrders = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    try {
        
        await db.connect();
        const orders = await Order.aggregate([
        {
            $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'userDetails',
            },
        },
        {
            $match: {
            userDetails: { $ne: [] },
            },
        },
        {
            $sort: { createdAt: -1 },
        },
        {
            $project: {
            _id: 1,
            orderItems: 1,
            shippingAddress: 1,
            numberOfItems: 1,
            subTotal: 1,
            tax: 1,
            total: 1,
            status: 1,
            createdAt: 1,
            updatedAt: 1,
            user: { $arrayElemAt: ['$userDetails', 0] },
            },
        },
        {
            $project: {
            'userDetails.password': 0,
            'userDetails.createdAt': 0,
            'userDetails.updatedAt': 0,
            'userDetails.__v': 0,
            },
        },
        {
            $lookup: {
            from: 'products',
            localField: 'orderItems.producto_id',
            foreignField: '_id',
            as: 'products',
            },
        },
        ]);
        await db.disconnect();

        // console.log(orders)
    
        if(orders.length > 0 ){
            return res.status(200).json( orders )
        } else{
            return res.status(404).json({ message: 'no hay ordenes'})
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'error de la request' })
    }

}

const updateOrder = async(req: NextApiRequest, res: NextApiResponse<Data>) =>  {
    
    const { orderId = '', status = '' } = req.body;
    
    if ( !isValidObjectId(orderId) ) {
        return res.status(400).json({ message: 'No existe la cotización por ese id' })
    }

    const validStatus = ['pendiente', 'en proceso', 'finalizado'];
    if ( !validStatus.includes(status) ) {
        return res.status(400).json({ message: 'Status no permitido: ' + validStatus.join(', ') })
    }

    await db.connect();
    const order = await Order.findById( orderId );

    if ( !order ) {
        await db.disconnect();
        return res.status(404).json({ message: 'Cotización no encontrado: ' + orderId });
    }

    order.status = status;
    await order.save();
    await db.disconnect();

    return res.status(200).json({ message: 'Cotización actualizada' });
     
}