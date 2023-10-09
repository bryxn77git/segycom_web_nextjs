import { db } from "."
import { Cliente} from '../models';

export const getAllClients = async() => {

    await db.connect();
    const clientes = await Cliente.find().lean();
    await db.disconnect();

    const updateImages = clientes.map( cliente => {
        cliente.url = cliente.url.includes('http') ? cliente.url : `${ process.env.HOST_NAME}${ cliente.url }`
        return cliente;
    });

    return JSON.parse( JSON.stringify( updateImages ) );
}
