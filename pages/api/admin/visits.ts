import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import Visita from '../../../models/Visitas';

type Data = 
| { message: string } 

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {

        case 'PUT':
            return updateVisits(req, res);

        default:
            return res.status(400).json({ message: 'Bad request'});

    }


}

const updateVisits = async(req: NextApiRequest, res: NextApiResponse<Data>) =>  {

    await db.connect();

    const updateResult = await Visita.updateOne({}, { $inc: { numero: 1 } })
    
    await db.disconnect();
    
    return res.status(200).json({ message: `Visitas actualizadas: ${updateResult.modifiedCount}` });
     
}