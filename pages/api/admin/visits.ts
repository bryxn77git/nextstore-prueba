import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Order } from '../../../models';
import { IOrder } from '../../../interfaces';
import { isValidObjectId } from 'mongoose';
import Visita from '../../../models/Visitas';

type Data = 
| { message: string } 

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {

        case 'PUT':
            return updateVisits(req, res);

        default:
            return res.status(400).json({ message: 'Bad request'});

    }


}

const updateVisits = async(req: NextApiRequest, res: NextApiResponse<Data>) =>  {
    if ( !isValidObjectId(process.env.VISIT_ID) ) {
        return res.status(400).json({ message: 'No existe ese id' })
    }

    await db.connect();
    const visita = await Visita.findById( process.env.VISIT_ID );

    if ( !visita ) {
        await db.disconnect();
        return res.status(404).json({ message: 'Visita no encontrada' });
    }

    visita.numero = visita.numero + 1;
    await visita.save();
    await db.disconnect();

    return res.status(200).json({ message: 'Visitas actualizadas' });
     
}