import { db } from './';
import { Noticia } from '../models';
import { INoticias } from '../interfaces';
import { isValidObjectId } from 'mongoose';

export const getNewsById = async( id: string ):Promise<INoticias| null> => {

    if ( !isValidObjectId(id) ){
        return null;
    }

    await db.connect();
    const news = await Noticia.findById( id ).lean();
    await db.disconnect();

    if ( !news ) {
        return null;
    }

    return JSON.parse(JSON.stringify(news));


}

export const getNoticiaBySlug = async( slug: string ): Promise<INoticias | null> => {

    await db.connect();
    const noticia = await Noticia.findOne({ slug });
    
    if ( !noticia ) {
        return null;
    }

    await noticia.save();
    await db.disconnect();


    // noticia.img = noticia.img.map( image => {
    //     return image.includes('http') ? image : `${ process.env.HOST_NAME}${ image }`
    // });

    return JSON.parse( JSON.stringify( noticia ) );
}

interface NoticiaSlug {
    slug: string;
}
export const getAllNoticiaSlugs = async(): Promise<NoticiaSlug[]>  => {


    await db.connect();
    const slugs = await Noticia.find().select('slug -_id').lean();
    await db.disconnect();

    return slugs;
}

export const getLatestNoticia = async(): Promise<INoticias>  => {

    await db.connect();
    const noticia = await Noticia.findOne().sort({date: -1}).limit(1);
    await db.disconnect();

    return JSON.parse( JSON.stringify( noticia ) );
    
}

// export const getProductsByTerm = async ( term:string): Promise<IProduct[]> => {
    
//     term = term.toString().toLowerCase();

//     await db.connect();
//     const products = await Product.find({
//         $text: { $search: term }
//     })
//     .select('title img slug marca -_id')
//     .lean();

//     await db.disconnect();

//     const updateProducts = products.map( product => {
//         product.img = product.img.map( image => {
//             return image.includes('http') ? image : `${ process.env.HOST_NAME}${ image }`
//         });
//         return product;
//     })

//     return updateProducts;
// }


export const getAllNoticias = async(): Promise<INoticias[]> => {

    await db.connect();
    const noticias = await Noticia.find().lean();
    await db.disconnect();

    // const updateProducts = products.map( product => {
    //     product.img = product.img.map( image => {
    //         return image.includes('http') ? image : `${ process.env.HOST_NAME}${ image }`
    //     });
    //     return product;
    // });

    return JSON.parse( JSON.stringify( noticias ) );
}

// export const getRelatedProducts = async( category: string[], productId: string ): Promise<IProduct[]> => {

//     await db.connect();
//     const products = await Product.find({ categorias: { $in: category}, _id: { $nin: productId  }})
//         .sort({ visitas: 'desc'} )    
//         .limit(4)
//         .select('title img slug marca -_id')
//         .lean()
//     await db.disconnect();

//     const updateProducts = products.map( product => {
//         product.img = product.img.map( image => {
//             return image.includes('http') ? image : `${ process.env.HOST_NAME}${ image }`
//         });
//         return product;
//     });

//     return JSON.parse( JSON.stringify( updateProducts ) );
// }

// export const getPopularProducts = async (): Promise<IProduct[]> => {

//     await db.connect();
//     const products = await Product.find()
//     .sort({ visitas: 'desc' })
//     .select('title img slug marca -_id')
//     .limit(4)
//     .lean();

//     await db.disconnect();

//     const updateProducts = products.map( product => {
//         product.img = product.img.map( image => {
//             return image.includes('http') ? image : `${ process.env.HOST_NAME}${ image }`
//         });
//         return product;
//     })

//     return updateProducts;
// }