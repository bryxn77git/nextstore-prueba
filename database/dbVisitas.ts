


import { db } from "."
import { Visita } from '../models';


export const getVisitas = async() => {
    await db.connect();
    const visitas = await Visita.find()
    await db.disconnect();

    

    return JSON.parse( JSON.stringify( visitas ) );
}

