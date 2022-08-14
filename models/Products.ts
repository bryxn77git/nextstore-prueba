import mongoose, { Schema, model, Model } from 'mongoose';
import { Category } from '.';
import { IProduct } from '../interfaces';


const productSchema = new Schema({
    colores: [{ 
        nombre: { type: String }, 
        color: { type: String }
    }],
    descripcion: { type: String, required: true },
    img: [{ type: String }],
    tallas: [{
        type: String,
    }],
    guiaTallas: { type: String },
    tags: [{ type: String }],
    title: { type: String, required: true },
    marca: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    categorias: [{
        type: String,
        // enum: {
        //     values: Category,
        //     message: '{VALUE} no es un tipo válido'
        // }
    }],
    codigo: { type: String, required: true, unique: true },
    visitas: { type: Number, required: true, default: 0  }
},{
    timestamps: true
});


productSchema.index({ title: 'text', tags: 'text', categorias: 'text' });


const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema );


export default Product;