import type { NextApiRequest, NextApiResponse } from 'next'

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL || '' );

import { connect, disconnect } from '../../../database/db';
import { Category, Product } from '../../../models';
import { db } from '../../../database';
import { isValidObjectId } from 'mongoose';
import { IMarcas } from '../../../interfaces/marcas';
import Marca from '../../../models/Marcas';
import { ICategorias } from '../../../interfaces';

type Data = 
|{ message: string }
| ICategorias[]
| ICategorias
| {category: ICategorias, cantidad: number}[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getCategories( req, res )

        case 'PUT':
            return updatedCategory( req, res );

        case 'POST':
            return createCategory( req, res );
            
        case 'DELETE':
            return deleteCategories( req, res );

        default:
            return res.status(400).json({ message: 'Bad request' })
        }
    }

const getCategories = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    let productsByCategory: {category: ICategorias, cantidad: number}[] = []

    await db.connect();

    const categories = await Category.find()
        .sort({ name: 'asc' })
        .lean();

    const product = await Product.find().lean();

    await db.disconnect();
    
    categories.map( async(category) => {
        const productSearch = product.filter( product => product.categorias.includes(category.name))
        productsByCategory = [ ...productsByCategory, { category: category, cantidad: productSearch.length } ]
    })

    res.status(200).json( productsByCategory )
}

const createCategory = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { image = '' } = req.body as ICategorias;

    if ( image === '' ) {
        return res.status(400).json({ message: 'La categoria necesita una imagen de fondo' });
    }
    
    try {
        await db.connect();
        const categoryInDB = await Category.findOne({ name: req.body.name });
        if ( categoryInDB ) {
            await db.disconnect();
            return res.status(400).json({ message: 'Ya existe una categoria con ese nombre' });
        }
        
        const categoria = new Category( req.body );
        await categoria.save();
        await db.disconnect();

        res.status(201).json( categoria );


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }

}

const updatedCategory = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const { 
        _id = '', 
        image = '', 
    } = req.body as ICategorias;

    if ( !isValidObjectId( _id ) ) {
        return res.status(400).json({ message: 'El id de la categoria no es válido' });
    }

    if ( image === '' ) {
        return res.status(400).json({ message: 'Es necesario al menos 1 imagen de fondo' });
    }


    try {
        
        await db.connect();
        const categoria = await Category.findById(_id);
        if ( !categoria ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No existe una categoria con ese ID' });
        }

            if ( categoria.image !== image ){
                const [ fileId, extension ] = image.substring( image.lastIndexOf('/') + 1 ).split('.')
                await cloudinary.uploader.destroy( fileId );
            }        

        await categoria.update( req.body );
        await db.disconnect();

        return res.status(200).json( categoria );
        
    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar la consola del servidor' });
    }

}

const deleteCategories = async(req: NextApiRequest, res: NextApiResponse<Data>) => {    

    try {
        await db.connect();
        const categoriesInDB = await Category.find({ _id: req.body });
        if ( !categoriesInDB ) {
            await db.disconnect();
            return res.status(400).json({ message: 'No hay categoria con ese o esos ID' });
        }
        
        await categoriesInDB.map( async(category) => {
            const [ fileId, extension ] = category.image.substring( category.image.lastIndexOf('/') + 1 ).split('.')
            cloudinary.uploader.destroy(fileId)
            const products = await Product.find({ categorias: { $in: category.name} })
            const marcas = await Marca.find({ categories: { $in: category.name} })
            
            products.map( async(product) => {
                product.categorias = product.categorias.filter( categoryProduct => categoryProduct !== category.name )
                await Product.findOneAndUpdate( { _id: product._id }, { $set: {categorias: product.categorias} } )
            })

            marcas.map( async(marca) => {
                marca.categories = marca.categories.filter( categoryBrand => categoryBrand !== category.name )
                await Marca.findOneAndUpdate( { _id: marca._id }, { $set: {categories: marca.categories} } )
            })

        })

        
        const categoriesDelete = await Category.deleteMany({ _id: { $in: req.body }})
        await db.disconnect(); 

        res.status(200).json({ message: 'Eliminación con éxito'});


    } catch (error) {
        console.log(error);
        await db.disconnect();
        return res.status(400).json({ message: 'Revisar logs del servidor' });
     }
    // return res.status(200).json({ message: 'jalo chido' });
}
