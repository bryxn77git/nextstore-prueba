import { db } from "."
import { Image } from '../models';


export const getAllImagesSwiper = async() => {

    await db.connect();
    const images = await Image.find().lean();
    await db.disconnect();

    const updateImages = images.map( image => {
        image.url = image.url.includes('http') ? image.url : `${ process.env.HOST_NAME}${ image.url }`
        return image;
    });

    return JSON.parse( JSON.stringify( updateImages ) );
}
