import mongoose, { Schema, model, Model } from 'mongoose';
import { IImages } from '../interfaces';

const PublicidadSchema = new Schema({

    name  : { type: String, required: true, unique: true },
    url   : { type: String, required: true },
    link  : { type: String, required: true },
    
}, {
    timestamps: true,
})

const Publicidad:Model<IImages> = mongoose.models.Publicidad || model('Publicidad', PublicidadSchema);

export default Publicidad;