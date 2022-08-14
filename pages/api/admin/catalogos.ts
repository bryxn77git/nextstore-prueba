import type { NextApiRequest, NextApiResponse } from 'next'

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '' );

import { Catalogo } from '../../../models';
import { db } from '../../../database';
import { isValidObjectId } from 'mongoose';
import { ICategorias, IImages, ICatalogos } from '../../../interfaces';


type Data = 
|{ message: string }
| ICatalogos[]
| ICatalogos

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getCatalogos( req, res )

        case 'PUT':
            return updatedCatalogos( req, res );

        case 'POST':
            return createCatalogos( req, res );
            
        case 'DELETE':
            return deleteCatalogos( req, res );

        default:
            return res.status(400).json({ message: 'Bad request' })
        }
    }

const getCatalogos = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect();

    const catalogos = await Catalogo.find().lean();

    await db.disconnect();
    
    const updateCatalogos = catalogos.map( catalogo => {
        catalogo.url =  catalogo.url.includes('http') ? catalogo.url : `${ process.env.HOST_NAME}${ catalogo.url }`
        return catalogo;
    })

    res.status(200).json( updateCatalogos )
}

const createCatalogos = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { image = '' } = req.body as ICatalogos;

    if ( image === '' ) {
        return res.status(400).json({ message: 'El catálogo necesita una imagen' });
    }
    
    try {
        await db.connect();
        const catalogoInDB = await Catalogo.findOne({ name: req.body.name });
        if ( catalogoInDB ) {
            await db.disconnect();
            return res.status(400).json({ message: 'Ya existe un catálogo con ese nombre' });
        }
        
        const catalogo = new Catalogo( req.body );
        await catalogo.save();
        await db.disconnect();

        res.status(201).json( catalogo );


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }

}

const updatedCatalogos = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { 
        _id = '', 
        image = '',
        url = '', 
    } = req.body as ICatalogos;

    if ( !isValidObjectId( _id ) ) {
        return res.status(400).json({ message: 'El id del catálogo no es válido' });
    }

    if ( image === '' ) {
        return res.status(400).json({ message: 'Es necesario al menos 1 imagen de portada' });
    }


    try {
        
        await db.connect();
        const catalogo = await Catalogo.findById(_id);
        if ( !catalogo ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe un catálogo con ese ID' });
        }

            if ( catalogo.image !== image ){
                const [ fileId, extension ] = image.substring( url.lastIndexOf('/') + 1 ).split('.')
                await cloudinary.uploader.destroy( fileId );
            }        

        await catalogo.update( req.body );
        await db.disconnect();

        return res.status(200).json( catalogo );
        
    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar la consola del servidor' });
    }

}

const deleteCatalogos = async(req: NextApiRequest, res: NextApiResponse<Data>) => {    

    try {
        await db.connect();
        const catalogoInDB = await Catalogo.find({ _id: req.body });
        if ( !catalogoInDB ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No hay catálogos con ese o esos ID' });
        }
        
        const categoriesDelete = await Catalogo.deleteMany({ _id: { $in: req.body }})
        await db.disconnect(); 

        res.status(200).json({ message: 'Eliminación con éxito'});


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }
}
