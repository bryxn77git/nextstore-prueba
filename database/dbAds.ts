
import { db } from "."
import { Category, Image } from '../models';
import { IMarcas } from '../interfaces/marcas';

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

