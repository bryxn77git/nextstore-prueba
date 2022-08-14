import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../database'
import { Category } from '../../../models'
import { ICategorias } from '../../../interfaces';

type Data = 
| { message: string }
| ICategorias[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'GET':
            return getCategories( req, res )

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
}

const getCategories = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    await db.connect();
    const categories:ICategorias[] = await Category.find()
        .sort({ name: 'asc' })
        .lean();

    await db.disconnect();

    const updateCategories = categories.map( category => {
        category.image = category.image.includes('http') ? category.image : `${ process.env.HOST_NAME}${ category.image }`
        return category;
    });

    return res.status(200).json( categories );

}