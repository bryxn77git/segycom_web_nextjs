import { isValidObjectId } from 'mongoose';
import { db } from '.';
import { IOrder } from '../interfaces';
import { Order } from '../models';


export const getOrderById = async( id: string ):Promise<IOrder| null> => {

    if ( !isValidObjectId(id) ){
        return null;
    }

    await db.connect();
    const order = await Order.findById( id ).lean();
    await db.disconnect();

    if ( !order ) {
        return null;
    }

    return JSON.parse(JSON.stringify(order));


}

export const getOrders = async():Promise<IOrder[]| null> => {

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

    if ( !orders ) {
        return null;
    }

    return JSON.parse(JSON.stringify(orders));

}


export const getOrdersByUser = async( userId: string ): Promise<IOrder[]> => {
    
    if ( !isValidObjectId(userId) ){
        return [];
    }

    await db.connect();
    const orders = await Order.find({ user: userId }).lean();
    await db.disconnect();


    return JSON.parse(JSON.stringify(orders));


}