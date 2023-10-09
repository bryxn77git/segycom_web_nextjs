import { useContext } from 'react';
import useSWR, { SWRConfiguration } from 'swr';
import { IProductos } from '../interfaces';



// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const useProducts = (url: string, config: SWRConfiguration = {} ) => {

    const { data, error } = useSWR<{ 
        products: IProductos[],
    }>(`/api${ url }`, config );

    return {
        products: data?.products || [],
        isLoading: !error && !data,
        isError: error
    }

}