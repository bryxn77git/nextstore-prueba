import type { NextApiRequest, NextApiResponse } from 'next'
import { db, dbCategories, SHOP_CONSTANTS } from '../../../database'
import { Product } from '../../../models'
import { IProduct } from '../../../interfaces/products';

type Data = 
| { message: string }
| IProduct[]
| { 
    products: IProduct[],
    productsCount: IProduct[]
  }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch( req.method ) {
        case 'GET':
            return getProducts( req, res )

        default:
            return res.status(400).json({
                message: 'Bad request'
            })
    }
}

const getProducts = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { categorias = 'all' } = req.query;

    const category = categorias.toString().split('?')[0];
    const query = categorias.toString().split('?')[1];
    let sort: any = { title: 'asc' };
    let condition = {};

    if( category !== 'all' ) {
        condition = { ...condition, categorias: category };
    }

    if( req.query.brands !== 'all' ){
        const arrBrands = req.query.brands
        if (typeof arrBrands === 'string') {
            condition = { ...condition, marca: arrBrands.split(',')}
        }
    }
    

    if( query !== undefined ){
        const sortUrl = query.split('&')[0].split('=')[1];
        switch (sortUrl) {
            case 'a-z':
                sort = { title: 'asc' };
                break;
            case 'z-a':
                sort = { title: 'desc' };
                break;
            case 'populares':
                sort = { visitas: 'desc' };
                break;
            default:
                break;
        }
        
    }

    var page = parseInt(req.query.page as string) -1  || 0; 
    var limit = parseInt(req.query.limit as string) || 15;

    await db.connect();
    const products = await Product.find(condition)
        .sort(sort)
        .skip(page * limit) //Notice here
        .limit(limit)
        .select('title img slug marca tallas colores -_id')
        .lean()

    const productsCount = await Product.find(condition)
        .select('title marca tallas colores -_id')
        .lean()

    await db.disconnect();

    return res.status(200).json({
            products,
            productsCount
    });

}