import mongoose, { Schema, model, Model } from 'mongoose';
import { ICategorias } from '../interfaces';

const categorySchema = new Schema({

    name  : { type: String, required: true, unique: true },
    image : { type: String, required: true },
    
}, {
    timestamps: true,
})

const Category:Model<ICategorias> = mongoose.models.Category || model('Category', categorySchema);

export default Category;