
import { db } from "."
import { Category } from '../models';
import { IMarcas } from '../interfaces/marcas';


export const getAllCategoies = async() => {
    await db.connect();
    const categories = await Category.find()
        .sort({ name: 'asc' })
        .lean();
    await db.disconnect();

    const updateCategories = categories.map( category => {
        category.image = category.image.includes('http') ? category.image : `${ process.env.HOST_NAME}${ category.image }`
        return category;
    });

    return JSON.parse( JSON.stringify( updateCategories ) );
}

export const getCategoriesByName = async(name: string) => {
    await db.connect();
    const category = await Category.find({ name: name.toLowerCase() }).lean();
    await db.disconnect();

    if ( !category ) {
        return null;
    }

   
    const updateCategory = category.map( category => {
        category.image = category.image.includes('http') ? category.image : `${ process.env.HOST_NAME}${ category.image }`
        return category;
    });

    return JSON.parse( JSON.stringify( updateCategory[0] ) );
}

export const getPrincipalCategoies = async() => {
    await db.connect();
    const categories = await Category.find()
        .sort({ name: 'asc' })
        .limit(6)
        .lean();
    await db.disconnect();

    const updateCategories = categories.map( category => {
        category.image = category.image.includes('http') ? category.image : `${ process.env.HOST_NAME}${ category.image }`
        return category;
    });

    return JSON.parse( JSON.stringify( updateCategories ) );
}

export const getCategoriesByBrand = async( marca: IMarcas ) => {

    await db.connect();

    const categories = await Category.find({ name: { $in: marca.categories }});

    // const marca = await Marca.find({ name: name.toLowerCase() }).lean();
    await db.disconnect();

    if ( !categories ) {
        return null;
    }

   
    const updateCategories = categories.map( category => {
        category.image = category.image.includes('http') ? category.image : `${ process.env.HOST_NAME}${ category.image }`
        return category;
    });

    return JSON.parse( JSON.stringify( updateCategories ) );
}
