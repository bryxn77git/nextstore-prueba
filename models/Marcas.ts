import mongoose, { Schema, model, Model } from 'mongoose';
import { IMarcas } from '../interfaces';

const marcaSchema = new Schema({

    name       : { type: String, required: true, unique: true },
    logo       : { 
        url: {type: String, required: true},
        public_id: { type: String, required: true }
    },
    image      : { 
        url: {type: String, required: true},
        public_id: { type: String, required: true }
    },
    categories : [{ type: String }],
    
}, {
    timestamps: true,
})

const Marca:Model<IMarcas> = mongoose.models.Marca || model('Marca', marcaSchema);

export default Marca;