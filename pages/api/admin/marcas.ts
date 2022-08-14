import type { NextApiRequest, NextApiResponse } from 'next'

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '' );

import { connect, disconnect } from '../../../database/db';
import { Product } from '../../../models';
import { db } from '../../../database';
import { isValidObjectId } from 'mongoose';
import { IMarcas } from '../../../interfaces/marcas';
import Marca from '../../../models/Marcas';

type Data = 
|{ message: string }
| IMarcas[]
| IMarcas

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getMarcas( req, res )

        case 'PUT':
            return updatedMarcas( req, res );

        case 'POST':
            return createMarca( req, res );
            
        case 'DELETE':
            return deleteMarca( req, res );
        default:
            return res.status(400).json({ message: 'Bad request' })
        }
    }

const getMarcas = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect();

    const marcas = await Marca.find()
        .sort({ name: 'asc' })
        .lean();

    await db.disconnect();

    //TODO:
    // Tenemos que actualizar las imagenes
    const updateMarcas = marcas.map( marca => {
        marca.logo.url =  marca.logo.url.includes('http') ? marca.logo.url : `${ process.env.HOST_NAME}${ marca.logo.url }`
        return marca;
    })

    res.status(200).json( updateMarcas )
}

const createMarca = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { logo = {url: '', public_id: ''}, image = {url: '', public_id: ''} } = req.body as IMarcas;

    if ( image.url === '' ) {
        return res.status(400).json({ message: 'La marca necesita una imagen de fondo' });
    }

    if ( logo.url === '' ) {
        return res.status(400).json({ message: 'La marca necesita una logo' });
    }
    
    try {
        await db.connect();
        const marcaInDB = await Marca.findOne({ name: req.body.name });
        if ( marcaInDB ) {
            await db.disconnect();
            return res.status(400).json({ message: 'Ya existe una marca con ese nombre' });
        }
        
        const marca = new Marca( req.body );
        await marca.save();
        await db.disconnect();

        res.status(201).json( marca );


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }

}

const updatedMarcas = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { 
        _id = '', 
        image = { url: '', public_id: ''}, 
        logo = { url: '', public_id: ''} 
    } = req.body as IMarcas;

    if ( !isValidObjectId( _id ) ) {
        return res.status(400).json({ message: 'El id de la marca no es válido' });
    }

    if ( image.url === '' ) {
        return res.status(400).json({ message: 'Es necesario al menos 1 imagen de fondo' });
    }

    if ( logo.url === '' ) {
        return res.status(400).json({ message: 'Es necesario al menos 1 logo' });
    }

    try {
        
        await db.connect();
        const marca = await Marca.findById(_id);
        if ( !marca ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe una marca con ese ID' });
        }

        //TODO: eliminar fotos en Cloudinary
        //https://res.cloudinary.com/cursos-udemy/image/upload/v1645914028/nct31gbly4kde6cncc6i.jpg

        // if ( marca.image.url !== image.url ) ){
        //     //Borrar de cloudinary
        //     await cloudinary.uploader.destroy( image.public_id );
        // }

        // if ( marca.logo.url !== logo.url ) ){
        //     //Borrar de cloudinary
        //     await cloudinary.uploader.destroy( logo.public_id );
        // }
        

        await marca.update( req.body );
        await db.disconnect();
    
        return res.status(200).json( marca );
        
    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar la consola del servidor' });
    }

}

const deleteMarca = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
        
    try {
        await db.connect();
        const marcasInDB = await Marca.find({ _id: req.body });
        if ( !marcasInDB ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No hay marcas con ese o esos ID' });
        }
        
        marcasInDB.map( marca => {
            cloudinary.uploader.destroy(marca.logo.public_id)
            cloudinary.uploader.destroy(marca.image.public_id)
        })

        const marcasDelete = await Marca.deleteMany({ _id: { $in: req.body }})
        await db.disconnect(); 

        res.status(200).json({ message: 'Eliminación con éxito'});


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }
    // return res.status(200).json({ message: 'jalo chido' });
}
