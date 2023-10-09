
export interface IProductos {
    cantidad:  number;
    pagina:    number;
    paginas:   number;
    productos: IProducto[];
    todo?:      boolean;
}

export interface IProducto {
    producto_id:      number | string;
    modelo:           string;
    total_existencia?: number;
    titulo:           string;
    marca:            string;
    sat_key?:          string;
    img_portada:      string;
    categorías:       Categorias[];
    marca_logo?:       string;
    link?:             string;
    precios?:          Precios;
    existencia?:       any[];
    iconos?:           Iconos;
    caracteristicas:  string[];
    imagenes:         Imagene[];
    descripcion:      string;
    recursos:         Recurso[];
}

interface Categorias {
    id: number | string;
    nombre: string;
    nivel: number;
}

interface Iconos {
    inf_izq: string;
    inf_der: string;
    sup_izq: string;
    sup_der: string;
}

export interface Imagene {
    imagen: number;
    url:   string;
}

export interface Precios {
    precio_lista:      number | string;
    precio_especial:   number | string;
    precio_descuento: number | string;
}

interface Recurso {
    recurso: string;
    path:    string;
}

