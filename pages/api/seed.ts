import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '../../database';
import { Noticia, Image, Publicidad, User } from '../../models';
import Cliente from '../../models/Clientes';

type Data = { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if (  process.env.NODE_ENV === 'production'){
        return res.status(401).json({ message: 'No tiene acceso a este API'});
    }

    await db.connect();

    await User.deleteMany();
    await User.insertMany( seedDatabase.initialData.users );
    await Noticia.deleteMany();
    await Image.deleteMany();
    await Publicidad.deleteMany();
    await Cliente.deleteMany();
    await Noticia.insertMany( seedDatabase.initialData.noticias );
    await Image.insertMany( seedDatabase.initialData.images );
    await Publicidad.insertMany( seedDatabase.initialData.publicidades );
    await Cliente.insertMany( seedDatabase.initialData.clientes );

    await db.disconnect();


    res.status(200).json({ message: 'Proceso realizado correctamente' });
}