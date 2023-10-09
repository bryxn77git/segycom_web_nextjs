import mongoose, { Schema, model, Model } from 'mongoose';
import { IClientes } from '../interfaces';

const clientSchema = new Schema({

    title      : { type: String, required: true, unique: true },
    logo       : { type: String, required: true },
    background : { type: String, required: true },
    url        : { type: String },
    instagram  : { type: String },
    facebook   : { type: String },
    twitter    : { type: String },
    youtube    : { type: String },
    
}, {
    timestamps: true,
})

const Cliente:Model<IClientes> = mongoose.models.Cliente || model('Cliente', clientSchema);

export default Cliente;