import { db } from './';
import { Product } from '../models';
import { IProduct } from '../interfaces';

export const getProductBySlug = async( slug: string ): Promise<IProduct | null> => {

    await db.connect();
    const product = await Product.findOne({ slug });
    
    if ( !product ) {
        return null;
    }

    product.visitas = product.visitas + 1 ;
    await product.save();
    await db.disconnect();


    product.img = product.img.map( image => {
        return image.includes('http') ? image : `${ process.env.HOST_NAME}${ image }`
    });

    return JSON.parse( JSON.stringify( product ) );
}

interface ProductSlug {
    slug: string;
}
export const getAllProductSlugs = async(): Promise<ProductSlug[]>  => {


    await db.connect();
    const slugs = await Product.find().select('slug -_id').lean();
    await db.disconnect();

    return slugs;
}

export const getProductsByTerm = async ( term:string): Promise<IProduct[]> => {
    
    term = term.toString().toLowerCase();

    await db.connect();
    const products = await Product.find({
        $text: { $search: term }
    })
    .select('title img slug marca -_id')
    .lean();

    await db.disconnect();

    const updateProducts = products.map( product => {
        product.img = product.img.map( image => {
            return image.includes('http') ? image : `${ process.env.HOST_NAME}${ image }`
        });
        return product;
    })

    return updateProducts;
}


export const getAllProducts = async(): Promise<IProduct[]> => {

    await db.connect();
    const products = await Product.find().lean();
    await db.disconnect();

    const updateProducts = products.map( product => {
        product.img = product.img.map( image => {
            return image.includes('http') ? image : `${ process.env.HOST_NAME}${ image }`
        });
        return product;
    });

    return JSON.parse( JSON.stringify( updateProducts ) );
}

export const getRelatedProducts = async( category: string[], productId: string ): Promise<IProduct[]> => {
    console.log(category)

    await db.connect();
    const products = await Product.find({ categorias: { $in: category}, _id: { $nin: productId  }})
        .sort({ visitas: 'desc'} )    
        .limit(4)
        .select('title img slug marca -_id')
        .lean()
    await db.disconnect();

        console.log(products)
    const updateProducts = products.map( product => {
        product.img = product.img.map( image => {
            return image.includes('http') ? image : `${ process.env.HOST_NAME}${ image }`
        });
        return product;
    });

    return JSON.parse( JSON.stringify( updateProducts ) );
}

export const getPopularProducts = async (): Promise<IProduct[]> => {

    await db.connect();
    const products = await Product.find()
    .sort({ visitas: 'desc' })
    .select('title img slug marca -_id')
    .limit(4)
    .lean();

    await db.disconnect();

    const updateProducts = products.map( product => {
        product.img = product.img.map( image => {
            return image.includes('http') ? image : `${ process.env.HOST_NAME}${ image }`
        });
        return product;
    })

    return updateProducts;
}