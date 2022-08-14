import type { NextApiRequest, NextApiResponse } from 'next'

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '' );

import { connect, disconnect } from '../../../database/db';
import { Category, Image, Product } from '../../../models';
import { db } from '../../../database';
import { isValidObjectId } from 'mongoose';
import { IMarcas } from '../../../interfaces/marcas';
import Marca from '../../../models/Marcas';
import { ICategorias, IImages } from '../../../interfaces';

type Data = 
|{ message: string }
| IImages[]
| IImages
| ICategorias[]
| ICategorias
| {category: ICategorias, cantidad: number}[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getAds( req, res )

        case 'PUT':
            return updatedAd( req, res );

        case 'POST':
            return createAd( req, res );
            
        case 'DELETE':
            return deleteAds( req, res );

        default:
            return res.status(400).json({ message: 'Bad request' })
        }
    }

const getAds = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect();

    const ads = await Image.find().lean();

    await db.disconnect();
    
    const updateAds = ads.map( ad => {
        ad.url =  ad.url.includes('http') ? ad.url : `${ process.env.HOST_NAME}${ ad.url }`
        return ad;
    })

    res.status(200).json( updateAds )
}

const createAd = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { url = '' } = req.body as IImages;

    if ( url === '' ) {
        return res.status(400).json({ message: 'La publicidad necesita una imagen' });
    }
    
    try {
        await db.connect();
        const adInDB = await Image.findOne({ name: req.body.name });
        if ( adInDB ) {
            await db.disconnect();
            return res.status(400).json({ message: 'Ya existe una publicidad con ese nombre' });
        }
        
        const ad = new Image( req.body );
        await ad.save();
        await db.disconnect();

        res.status(201).json( ad );


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }

}

const updatedAd = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { 
        _id = '', 
        url = '', 
    } = req.body as IImages;

    if ( !isValidObjectId( _id ) ) {
        return res.status(400).json({ message: 'El id de la publicidad no es válido' });
    }

    if ( url === '' ) {
        return res.status(400).json({ message: 'Es necesario al menos 1 imagen de publicidad' });
    }


    try {
        
        await db.connect();
        const ad = await Image.findById(_id);
        if ( !ad ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe una publicidad con ese ID' });
        }

            if ( ad.url !== url ){
                const [ fileId, extension ] = url.substring( url.lastIndexOf('/') + 1 ).split('.')
                await cloudinary.uploader.destroy( fileId );
            }        

        await ad.update( req.body );
        await db.disconnect();

        return res.status(200).json( ad );
        
    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar la consola del servidor' });
    }

}

const deleteAds = async(req: NextApiRequest, res: NextApiResponse<Data>) => {    

    try {
        await db.connect();
        const adInDB = await Image.find({ _id: req.body });
        if ( !adInDB ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No hay publicidades con ese o esos ID' });
        }
        
        const adsDelete = await Image.deleteMany({ _id: { $in: req.body }})
        await db.disconnect(); 

        res.status(200).json({ message: 'Eliminación con éxito'});


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }
}
