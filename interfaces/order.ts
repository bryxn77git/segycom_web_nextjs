import { IUser } from './';

export interface IOrder {

    _id? : string;
    user?: IUser | string;
    orderItems: IOrderItem[];
    shippingAddress: ShippingAddress;
    numberOfItems: number;
    subTotal     : number;
    tax          : number;
    total        : number;
    status  : 'pendiente' | 'en proceso' | 'finalizado';

    createdAt?: string;
    updatedAt?: string;

}

export interface IOrderItem {
    producto_id:      number | string;
    modelo:           string;
    titulo:           string;
    marca:            string;
    sat_key?:         string;
    img_portada:      string;
    link?:            string;
    precio?:          number | string;
    quantity:         number;    
}

export interface ShippingAddress {
    name      : string;
    lastname  : string;
    phone     : string;
    company?  : string;
    address   : string;
    city      : string;
    state     : string;
    commnets? : string;
    zip       : string;
}
