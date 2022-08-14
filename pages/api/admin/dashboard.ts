import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IVisitas } from '../../../interfaces';
import { Order, Product, User, Category, Marca } from '../../../models';
import Visita from '../../../models/Visitas';
import { IProduct } from '../../../interfaces/products';
import { IMarcas } from '../../../interfaces/marcas';

type Data = {
    numeroOrdenes      :number;
    ordenesPendientes  :number;
    ordenesEnProceso   :number;
    ordenesFinalizadas :number;
    clientes           :number;
    productos          :number;
    categorias         :number;
    marcas             :number;
    numeroVisitas      :IVisitas[];
    productosMarcas    :any[][];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    let productsByMarca: any[][] = [];
    
    await db.connect();

    const brands = await Marca.find()
        .sort({ name: 'asc' })
        .lean();

    const product = await Product.find().lean();

    brands.map( async(marca) => {
        const productSearch = product.filter( product => product.marca.toLowerCase() === marca.name.toLowerCase() )
        productsByMarca = [ ...productsByMarca, [marca.name.charAt(0).toLocaleUpperCase() + marca.name.slice(1), productSearch.length] ]
    })

    
    const [
        numeroOrdenes,     
        ordenesPendientes, 
        ordenesEnProceso,  
        ordenesFinalizadas,
        clientes,          
        productos,         
        categorias,        
        marcas,            
        numeroVisitas,
    ] = await Promise.all([
        Order.count(),
        Order.find({ status: 'pendiente' }).count(),
        Order.find({ status: 'en proceso' }).count(),
        Order.find({ status: 'finalizado' }).count(),
        User.find({ role: 'client' }).count(),
        Product.count(),
        Category.count(),
        Marca.count(),
        Visita.find(),
    ]);

    
    await db.disconnect();

    res.status(200).json({
        numeroOrdenes,     
        ordenesPendientes, 
        ordenesEnProceso,  
        ordenesFinalizadas,
        clientes,          
        productos,         
        categorias,        
        marcas,            
        numeroVisitas,     
        productosMarcas: productsByMarca,
    })


}