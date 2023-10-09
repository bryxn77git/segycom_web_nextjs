
export interface ICartProduct {
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