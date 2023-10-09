import type { NextApiRequest, NextApiResponse } from 'next'


import { v2 as cloudinary } from 'cloudinary';
// import * as cloudinary from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '' );

import { Noticia } from '../../../models';
import { db } from '../../../database';
import { isValidObjectId } from 'mongoose';
import { INoticias } from '../../../interfaces';

type Data = 
|{ message: string }
| INoticias[]
| INoticias

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getNews( req, res )

        case 'PUT':
            return updatedNews( req, res );

        case 'POST':
            return createNews( req, res );
            
        case 'DELETE':
            return deleteNews( req, res );

        default:
            return res.status(400).json({ message: 'Bad request' })
        }
    }

const getNews = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    try {
        
        await db.connect();
        const news = await Noticia.find()
            .sort({ date: 'asc' })
            .lean();
        await db.disconnect();
    
        if(news.length > 0 ){
            return res.status(200).json( news )
        } else{
            return res.status(404).json({ message: 'no hay noticias'})
        }

    } catch (error) {
        return res.status(500).json({ message: 'error de la request' })
    }
}

const createNews = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { img = '' } = req.body as INoticias;

    if ( img === '' ) {
        return res.status(400).json({ message: 'La noticia necesita una imagen' });
    }
    
    try {
        await db.connect();
        const NewsInDB = await Noticia.findOne({ _id: req.body._id });
        if ( NewsInDB ) {
            await db.disconnect();
            return res.status(400).json({ message: 'Ya existe una noticia con ese nombre' });
        }

        const news = new Noticia( req.body );
        await news.save();
        await db.disconnect();

        res.status(201).json( news );


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }

}

const updatedNews = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { 
        _id = '', 
        img = '', 
    } = req.body as INoticias;

    if ( !isValidObjectId( _id ) ) {
        return res.status(400).json({ message: 'El id de la noticia no es válido' });
    }

    if ( img === '' ) {
        return res.status(400).json({ message: 'Es necesario al menos 1 imagen para la noticia' });
    }


    try {
        
        await db.connect();
        const news = await Noticia.findById(_id);
        if ( !news ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe una publicidad con ese ID' });
        }

            // if ( news.img !== img ){
            //     const [ fileId, extension ] = img.substring( img.lastIndexOf('/') + 1 ).split('.')
            //     await cloudinary.uploader.destroy( fileId );
            // }        

        await news.update( req.body );
        await db.disconnect();

        return res.status(200).json( news );
        
    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar la consola del servidor' });
    }

}

const deleteNews = async(req: NextApiRequest, res: NextApiResponse<Data>) => {    

    try {
        await db.connect();
        const NewsInDB = await Noticia.find({ _id: req.body });
        if ( !NewsInDB ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No hay noticias con ese o esos ID' });
        }
        
        const newsDelete = await Noticia.deleteMany({ _id: { $in: req.body }})
        await db.disconnect(); 

        res.status(200).json({ message: 'Eliminación con éxito'});


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }
}
