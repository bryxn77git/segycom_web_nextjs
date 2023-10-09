import mongoose, { Schema, model, Model } from 'mongoose';
import { IOrder } from '../interfaces';

const orderSchema = new Schema({

    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [{
        producto_id : { type: String || Number, required: true },
        modelo      : { type: String, required: true },
        titulo      : { type: String, required: true },         
        marca       : { type: String, required: true },          
        sat_key     : { type: String },        
        img_portada : { type: String, required: true },     
        link        : { type: String },          
        precio      : { type: String || Number },
        quantity    : { type: Number, required: true },
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
    subTotal     : { type: Number, required: true },
    tax          : { type: Number, required: true },
    total        : { type: Number, required: true },
    status : { type: String, required: true, default: 'pendiente' },
    
}, {
    timestamps: true,
})

const Order:Model<IOrder> = mongoose.models.Order || model('Order',orderSchema);

export default Order;