import mongoose, { Schema, model, Model } from 'mongoose';
import { IImages } from '../interfaces';

const imageSchema = new Schema({

    name  : { type: String, required: true, unique: true },
    url   : { type: String, required: true },
    
}, {
    timestamps: true,
})

const Image:Model<IImages> = mongoose.models.Image || model('Image', imageSchema);

export default Image;