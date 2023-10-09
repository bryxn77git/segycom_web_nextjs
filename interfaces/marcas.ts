
export interface IMarcas {
    descripcion: string,
    titulo: string,
    logo: string,
    categorias: [
        {
            nombre: string,
            id: string,
            imagen: string,
            cantidad: number | string
        },
    ]
      
}
