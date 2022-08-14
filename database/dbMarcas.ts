import { db } from "."
import { Marca } from '../models';


export const getAllBrands = async() => {
    await db.connect();
    const marcas = await Marca.find().lean();
    await db.disconnect();

    const updateMarcas = marcas.map( marca => {
        marca.image.url = marca.image.url.includes('http') ? marca.image.url : `${ process.env.HOST_NAME}${ marca.image.url }`
        marca.logo.url = marca.logo.url.includes('http') ? marca.logo.url : `${ process.env.HOST_NAME}${ marca.logo.url }`
        return marca;
    });

    return JSON.parse( JSON.stringify( updateMarcas ) );
}

export const getBrandByName = async( name: string ) => {
    await db.connect();
    const marca = await Marca.find({ name: name.toLowerCase() }).lean();
    await db.disconnect();

    if ( !marca ) {
        return null;
    }

   
    const updateMarcas = marca.map( marca => {
        marca.logo.url = marca.logo.url.includes('http') ? marca.logo.url : `${ process.env.HOST_NAME}${ marca.logo.url }`
        marca.image.url = marca.image.url.includes('http') ? marca.image.url : `${ process.env.HOST_NAME}${ marca.image.url }`
        return marca;
    });

    return JSON.parse( JSON.stringify( updateMarcas[0] ) );
}



