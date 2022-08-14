

import { db } from "."
import { Catalogo } from '../models';


export const getAllCatalogos = async() => {
    await db.connect();
    const catalogos = await Catalogo.find()
        .sort({ name: 'asc' })
        .lean();
    await db.disconnect();

    const updateCatalogos = catalogos.map( catalogo => {
        catalogo.image = catalogo.image.includes('http') ? catalogo.image : `${ process.env.HOST_NAME}${ catalogo.image }`
        return catalogo;
    });

    return JSON.parse( JSON.stringify( updateCatalogos ) );
}

export const getCatalogoByName = async(name: string) => {
    await db.connect();
    const catalogo = await Catalogo.find({ name: name.toLowerCase() }).lean();
    await db.disconnect();

    if ( !catalogo ) {
        return null;
    }

   
    const updateCatalogo = catalogo.map( catalogo => {
        catalogo.url = catalogo.url.includes('http') ? catalogo.url : `${ process.env.HOST_NAME}${ catalogo.url }`
        return catalogo;
    });

    return JSON.parse( JSON.stringify( updateCatalogo[0] ) );
}

