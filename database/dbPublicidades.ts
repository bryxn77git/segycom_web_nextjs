
import { db } from "."
import { Publicidad } from '../models';

export const getAllPublicidades = async() => {
    await db.connect();
    const images = await Publicidad.find().lean();
    await db.disconnect();

    const updateImages = images.map( image => {
        image.url = image.url.includes('http') ? image.url : `${ process.env.HOST_NAME}${ image.url }`
        return image;
    });

    return JSON.parse( JSON.stringify( updateImages ) );
}

export const getAllPublicidad = async() => {
    await db.connect();

    const ads = await Publicidad.find().lean();

    await db.disconnect();
    
    const updateAds = ads.map( ad => {
        ad.url =  ad.url.includes('http') ? ad.url : `${ process.env.HOST_NAME}${ ad.url }`
        return ad;
    }) 

    return JSON.parse( JSON.stringify( updateAds ) );
}

