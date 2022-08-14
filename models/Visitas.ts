import mongoose, { Schema, model, Model } from 'mongoose';
import { IVisitas } from '../interfaces';


const visitasSchema = new Schema({

    numero  : { type: Number, required: true },
    
})

const Visita:Model<IVisitas> = mongoose.models.Visita || model('Visita', visitasSchema);

export default Visita;