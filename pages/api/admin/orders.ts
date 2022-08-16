import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Order } from '../../../models';
import { IOrder } from '../../../interfaces';
import { isValidObjectId } from 'mongoose';

type Data = 
| { message: string } 
|   IOrder[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch( req.method ) {

        case 'GET':
            return getOrders(req, res);
        case 'PUT':
            return updateOrder(req, res);

        default:
            return res.status(400).json({ message: 'Bad request'});

    }


}

const getOrders = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    try {
        
        await db.connect();
        const orders = await Order.find()
            .sort({ createdAt: 'desc' })
            .populate('user', 'name email')
            .lean();
        await db.disconnect();
    
        if(orders.length > 0 ){
            return res.status(200).json( orders )
        } else{
            return res.status(404).json({ message: 'no hay ordenes'})
        }

    } catch (error) {
        return res.status(500).json({ message: 'error de la request' })
    }

}

const updateOrder = async(req: NextApiRequest, res: NextApiResponse<Data>) =>  {
    
    const { orderId = '', status = '' } = req.body;
    
    if ( !isValidObjectId(orderId) ) {
        return res.status(400).json({ message: 'No existe la cotización por ese id' })
    }

    const validStatus = ['pendiente', 'en proceso', 'finalizado'];
    if ( !validStatus.includes(status) ) {
        return res.status(400).json({ message: 'Status no permitido: ' + validStatus.join(', ') })
    }

    await db.connect();
    const order = await Order.findById( orderId );

    if ( !order ) {
        await db.disconnect();
        return res.status(404).json({ message: 'Cotización no encontrado: ' + orderId });
    }

    order.status = status;
    await order.save();
    await db.disconnect();

    return res.status(200).json({ message: 'Cotización actualizada' });
     
}