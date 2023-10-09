import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IVisitas } from '../../../interfaces';
import { Order, User, Visita } from '../../../models';



type Data = {
    numeroOrdenes      :number;
    ordenesPendientes  :number;
    ordenesEnProceso   :number;
    ordenesFinalizadas :number;
    clientes           :number;
    numeroVisitas      :IVisitas[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
        
    await db.connect();
    
    const [
        numeroOrdenes,     
        ordenesPendientes, 
        ordenesEnProceso,  
        ordenesFinalizadas,
        clientes,                 
        numeroVisitas,
    ] = await Promise.all([
        Order.count(),
        Order.find({ status: 'pendiente' }).count(),
        Order.find({ status: 'en proceso' }).count(),
        Order.find({ status: 'finalizado' }).count(),
        User.find({ role: ['clientA', 'clientB', 'clientC'], }).count(),
        Visita.find(),
    ]);

    
    await db.disconnect();

    res.status(200).json({
        numeroOrdenes,     
        ordenesPendientes, 
        ordenesEnProceso,  
        ordenesFinalizadas,
        clientes,                     
        numeroVisitas,     
    })


}