import mongoose, { Schema, model, Model } from 'mongoose';
import { ICatalogos } from '../interfaces/catalogos';


const catalogosSchema = new Schema({

    name  : { type: String, required: true },
    image : { type: String, required: true },
    url   : { type: String, required: true }
    
}, {
    timestamps: true,
})

const Catalogo:Model<ICatalogos> = mongoose.models.Catalogo || model('Catalogo', catalogosSchema);

export default Catalogo;