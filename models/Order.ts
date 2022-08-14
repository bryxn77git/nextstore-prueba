import mongoose, { Schema, model, Model } from 'mongoose';
import { IOrder } from '../interfaces';

const orderSchema = new Schema({

    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{
        _id     : { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        title   : { type: String, required: true },
        talla    : { type: String, required: true },
        quantity: { type: Number, required: true },
        slug    : { type: String, required: true },
        img   : { type: String, required: true },
        color   : { 
            nombre: { type: String },
            color: { type: String }
        },
        code: { type: String, required: true}
    }],
    shippingAddress: {
        name     : { type: String, required: true },
        lastname : { type: String, required: true },
        phone    : { type: String, required: true },
        company  : { type: String },
        address  : { type: String, required: true },
        city     : { type: String, required: true },
        state    : { type: String, required: true },
        commnets : { type: String },
        zip      : { type: String, required: true },
    },

    numberOfItems: { type: Number, required: true },
    status : { type: String, required: true, default: 'pendiente' },
    
}, {
    timestamps: true,
})

const Order:Model<IOrder> = mongoose.models.Order || model('Order',orderSchema);

export default Order;