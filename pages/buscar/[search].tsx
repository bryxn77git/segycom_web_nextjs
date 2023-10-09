import { FC, useEffect, useState } from 'react';
import { Container, Typography, Grid, SelectChangeEvent, Box, Divider, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { MainLayout } from "../../components/layouts"
import { ProductPrincipalInfo, ItemsProduct } from "../../components/products"
import { GetServerSideProps } from 'next';
import { IProducto, IProductos, ITipoCambio } from '../../interfaces';
import { ProductList } from '../../components/products';
import { syscomApi } from '../../api';
import { useRouter } from 'next/router';
import { getToken } from 'next-auth/jwt';

interface Props {
    products: IProductos;
    orden: string;
    pagina: string | number | string[];
    query: string;
}

const SearchPage: FC<Props> = ({ products, orden, pagina, query }) => {

  const router = useRouter();

  const [busqueda, setBusqueda] = useState(query)
  const [ordenProducts, setOrdenProducts] = useState(orden || 'topseller')
  const [paginaProducts, setPaginaProducts] = useState(pagina || 1)   

  useEffect(() => {
    setBusqueda(query)
    setOrdenProducts(orden || 'topseller');
    setPaginaProducts(pagina || 1);
    
  }, [router.query]);

   // Refrescar cambios con los diferentes filtros
  useEffect(() => {
    urlUpdate()      
  }, [ ordenProducts, paginaProducts ])

  // Actualizar los querys de la url para cargar los filtros
  const urlUpdate = ( ) => {
    const baseUrl = `/buscar/${query}?`;
    const orden = ordenProducts ? `&orden=${ordenProducts}` : `&  orden=topseller`;
    const pagina = paginaProducts !== 1 ? `&pagina=${paginaProducts}` : `&pagina=1`;
    router.push(`${baseUrl}${orden}${pagina}`); 

  }

  const handleChangeSort = (e: SelectChangeEvent) => {
    setOrdenProducts(e.target.value);
    setPaginaProducts(1);
  } 
// const SearchPage = () => {
  return (

    <MainLayout title={`Buscar: ${busqueda}`} pageDescription={`Lista de productos que ofrece la empresa Segycom relacionados con ${busqueda}`}>

        <Container maxWidth='xl' >

        <Grid container minHeight='calc(100vh - 100px)' sx={{ mb: 3 , bgcolor: '#F7F7F7' }} >

             {/* Filtro de los productos */}
          <Grid item xs={12} md={2} sx={{ px: {xs: 0, md: 3 }, py: {xs: 3, md: 6}, mb: 5 }} >

            <Grid >
              {/* Nombre de la busqueda */}
              <Box display='flex' justifyContent='center' sx={{ pb: 1 }}>
                <Typography fontWeight={700} color='#666666' >
                  { products.cantidad !== 0 ? busqueda.toUpperCase() : 'No hay productos' }
                </Typography>
              </Box>

              <Box display='flex' justifyContent='center' sx={{ px: { xs: 1, md: 0 } }}>
                <Divider sx={{ mt: 1, mb: 3, width: '100%', height: 5 }}/>           
              </Box>

              {/* Input para desplegar las formas de organizar los productos */}
              <FormControl fullWidth size="small" sx={{ mb: 2, px: { xs: 1, md: 0 } }}>
                <InputLabel >Ordenar</InputLabel>
                <Select
                  value={ordenProducts}
                  defaultValue={ordenProducts}
                  label="Ordenar"
                  onChange={handleChangeSort}
                >
                  <MenuItem value={'topseller'} >Más Vendido</MenuItem>
                  <MenuItem value={'relevancia'}>Relevancia</MenuItem>
                  <MenuItem value={'modelo:asc'}>Modelo de A-Z</MenuItem>
                  <MenuItem value={'modelo:desc'}>Modelo de Z-A</MenuItem>
                  <MenuItem value={'marca:asc'}>Marca de A-Z</MenuItem>
                  <MenuItem value={'marca:desc'}>Marca de Z-A</MenuItem>
                </Select>
              </FormControl>

              
              </Grid>
            </Grid>

            {/* Lista de los productos */}
            <Grid item xs={12} md={10} sx={{ p: { xs: 0.5, md: 3, lg: 5 } }}>
                <ProductList 
                    products={ products as IProductos }
                    page={ setPaginaProducts }
                /> 
            </Grid>

          </Grid>



        </Container>

    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const orden = query.orden ? `&orden=${query.orden}` : `&orden=topseller`;
    const pagina = query.pagina ? `&pagina=${query.pagina}` : `&pagina=1`;
    const { data: tipoCambio } = await syscomApi.get<ITipoCambio>('/tipocambio');
    let role = '';
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  

    let productsList = {};

    try {
        if( query.search ){

            const { data } = await syscomApi.get<IProductos>(`productos?busqueda=${query.search}${orden}${pagina}`);
            data.productos.map( product => {
              if( !session ){
                delete product.precios;
              } else {
  
                if (session?.user) {
                  const { role } = session.user as { role: string };
                
                  if( product.precios ) {
                              
                      switch (role) {
                          case 'admin':
                              product.precios.precio_descuento =  Number(product.precios.precio_descuento) * Number(tipoCambio.normal);
                              product.precios.precio_lista = Number(product.precios.precio_lista) * Number(tipoCambio.normal)
                          break;
                          case 'clientA':
                              product.precios.precio_descuento = 0;
                              product.precios.precio_especial = 0;
                              product.precios.precio_lista = (Number(product.precios.precio_lista)  - ( Number(product.precios.precio_lista)  * (15 / 100))) * Number(tipoCambio.normal)
                          break;
                          case 'clientB':
                              product.precios.precio_descuento = 0;
                              product.precios.precio_especial = 0;
                              product.precios.precio_lista = (Number(product.precios.precio_lista)  - ( Number(product.precios.precio_lista)  * (20 / 100))) * Number(tipoCambio.normal)
                          break;
                          case 'clientC':
                              product.precios.precio_descuento = 0;
                              product.precios.precio_especial = 0;
                              product.precios.precio_lista = (Number(product.precios.precio_lista)  - ( Number(product.precios.precio_lista)  * (25 / 100))) * Number(tipoCambio.normal)
                          break;
                      
                          default:
                          break;
                      }
                  
                  } 
            
                  
                }
              }
              // console.log(role)
              delete product.existencia;
              delete product.total_existencia;
            })
            
            productsList = data;
        }else {
            productsList = {};
        }
        
    } catch (error) {
        return {
            redirect: {
                destination: '/',
                permanent: true
            }
        }
    }

    return {
        props: {
            products: productsList,
            orden: query.orden ? query.orden : 'topseller',
            pagina: query.pagina ? query.pagina : 1,
            query: query.search
        }
    }
}




export default SearchPage;