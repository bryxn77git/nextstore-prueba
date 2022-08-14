
import type { NextApiRequest, NextApiResponse } from 'next'
import { IProduct } from '../../../interfaces/products';

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '' );

import { connect, disconnect } from '../../../database/db';
import { Product } from '../../../models';
import { db } from '../../../database';
import { isValidObjectId } from 'mongoose';

type Data = 
|{ message: string }
| IProduct[]
| IProduct

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProducts( req, res )

        case 'PUT':
            return updatedProducts( req, res );
        case 'POST':
            return createProduct( req, res );
        case 'DELETE':
            return deleteProduct( req, res );
        default:
            return res.status(400).json({ message: 'Bad request' })
        }
    }


const getProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    await db.connect();

    const products = await Product.find()
        .sort({ title: 'asc' })
        .lean();

    await db.disconnect();

    //TODO:
    // Tenemos que actualizar las imagenes
    const updateProducts = products.map( product => {
        product.img = product.img.map( image => {
            return image.includes('http') ? image : `${ process.env.HOST_NAME}${ image }`
        });
        return product;
    })

    res.status(200).json( updateProducts )
}


const updatedProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { _id = '', img = [] } = req.body as IProduct;

    if ( !isValidObjectId( _id ) ) {
        return res.status(400).json({ message: 'El id del producto no es válido' });
    }

    if ( img.length < 1 ) {
        return res.status(400).json({ message: 'Es necesario al menos 1 imagen' });
    }

    try {
        
        await db.connect();
        const product = await Product.findById(_id);
        if ( !product ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe un producto con ese ID' });
        }

        //TODO: eliminar fotos en Cloudinary
        //https://res.cloudinary.com/cursos-udemy/image/upload/v1645914028/nct31gbly4kde6cncc6i.jpg
        product.img.forEach( async(image) => {
            if ( !img.includes(image) ){
                //Borrar de cloudinary
                const [ fileId, extension ] = image.substring( image.lastIndexOf('/') + 1 ).split('.')
                await cloudinary.uploader.destroy( fileId );
            }
        });

        await product.update( req.body );
        await db.disconnect();
    
        return res.status(200).json( product );
        
    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar la consola del servidor' });
    }

}

const createProduct = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { img = [] } = req.body as IProduct;

    if ( img.length < 2 ) {
        return res.status(400).json({ message: 'El producto necesita al menos 2 imágenes' });
    }
    
    // TODO: posiblemente tendremos un localhost:3000/products/asdasd.jpg
    
    try {
        await db.connect();
        const productInDB = await Product.findOne({ slug: req.body.slug });
        if ( productInDB ) {
            await db.disconnect();
            return res.status(400).json({ message: 'Ya existe un producto con ese slug' });
        }
        
        const product = new Product( req.body );
        await product.save();
        await db.disconnect();

        res.status(201).json( product );


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }

}

const deleteProduct = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
        
    try {
        await db.connect();
        const productsInDB = await Product.find({ _id: req.body });
        if ( !productsInDB ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No hay productos con ese o esos ID' });
        }
        
        const productDelete = await Product.deleteMany({ _id: { $in: req.body }})
        await db.disconnect();

        res.status(200).json({ message: 'Eliminación con éxito'});


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }
    // return res.status(200).json({ message: 'jalo chido' });
}

