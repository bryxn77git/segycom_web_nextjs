
import { db } from "."
import { Image } from '../models';

export const getAdByName = async(name: string) => {
    await db.connect();
    const ad = await Image.find({ name: name.toLowerCase() }).lean();
    await db.disconnect();

    if ( !ad ) {
        return null;
    }
   
    const updateAd = ad.map( ad => {
        ad.url = ad.url.includes('http') ? ad.url : `${ process.env.HOST_NAME}${ ad.url }`
        return ad;
    });

    return JSON.parse( JSON.stringify( updateAd[0] ) );
}

export const getAllAds = async() => {
    await db.connect();
    const ads = await Image.find().lean();
    await db.disconnect();

    if ( !ads ) {
        return null;
    }
   
    const updateAds = ads.map( ad => {
        ad.url = ad.url.includes('http') ? ad.url : `${ process.env.HOST_NAME}${ ad.url }`
        return ad;
    });

    return JSON.parse( JSON.stringify( updateAds ) );
}

