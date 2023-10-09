
import { db } from "."
import { Publicidad } from '../models';

export const getPublicidadByName = async(name: string) => {
    await db.connect();
    const ad = await Publicidad.find({ name: name.toLowerCase() }).lean();
    await db.disconnect();

    if ( !ad ) {
        return null;
    }
   
    const updateAd = ad.map( ad => {
        ad.url = ad.url.includes('http') ? ad.url : `${ process.env.HOST_NAME}${ ad.url }`
        return ad;
    });
    return JSON.parse( JSON.stringify( updateAd ) );
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



