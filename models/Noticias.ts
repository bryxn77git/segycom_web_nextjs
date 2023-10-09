import mongoose, { Schema, model, Model } from 'mongoose';
import { INoticias } from '../interfaces';

const noticiaSchema = new Schema({
    slug: { type: String, required: true },
    date: { type: Date, required: true },
    title: { type: String, required: true },
    details: { type: String, required: true },
    img: { type: String },
    
},{
    timestamps: true
});


// noticiaSchema.index({ title: 'text', tags: 'text', categorias: 'text' });


const Noticia: Model<INoticias> = mongoose.models.Noticia || model('Noticia', noticiaSchema );


export default Noticia;