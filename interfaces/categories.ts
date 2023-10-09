
export interface ICategorias {
    id:            string;
    nombre:        string;
    nivel:         string;
}

export interface ICategoria {
    id:            string;
    nombre:        string;
    nivel:         string;
    origen:        any[];
    subcategorias: Subcategoria[];
}

export interface Subcategoria {
    id:     string;
    nombre: string;
    nivel:  string;
}
