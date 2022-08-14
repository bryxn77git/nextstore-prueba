import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedDatabase } from '../../database';
import { Category, Order, Product, User, Image, Marca, Catalogo } from '../../models';
import Visita from '../../models/Visitas';

type Data = { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if (  process.env.NODE_ENV === 'production'){
        return res.status(401).json({ message: 'No tiene acceso a este API'});
    }

    await db.connect();

    await User.deleteMany();
    await User.insertMany( seedDatabase.initialData.users );

    await Product.deleteMany();
    await Product.insertMany( seedDatabase.initialData.products );

    await Order.deleteMany(); 

    await Image.deleteMany();
    await Image.insertMany( seedDatabase.initialData.images );

    await Marca.deleteMany()
    await Marca.insertMany( seedDatabase.initialData.marcas );

    await Category.deleteMany();
    await Category.insertMany( seedDatabase.initialData.categories );

    await Catalogo.deleteMany();
    await Catalogo.insertMany( seedDatabase.initialData.catalogos );

    await Visita.deleteMany();
    await Visita.insertMany( seedDatabase.initialData.visitas );


    await db.disconnect();


    res.status(200).json({ message: 'Proceso realizado correctamente' });
}