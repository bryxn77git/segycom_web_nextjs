import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import * as jose from 'jose';

import { MainLayout } from "../../components/layouts"
import { syscomApi } from '../../api';
import { ICategoria, IProductos, ITipoCambio } from '../../interfaces';
import { ProductList } from '../../components/products';

import { Accordion, AccordionDetails, AccordionSummary, Box, Container, Divider, FormControl, FormGroup, Grid, InputLabel, Select, Typography, MenuItem, Checkbox, FormControlLabel, Pagination, CircularProgress, SelectChangeEvent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as cookie from 'cookie'
import jwt from 'jsonwebtoken';
import { getToken } from 'next-auth/jwt';

interface Props {
  products: IProductos | {};
  categories: ICategoria;
  orden: string;
  url: ParsedUrlQuery;
  marca: string;
  error?: string;
  role: string;
}

const Productos: FC<Props> = ({ products, categories, orden, url, marca, error = '', role }) => {

    const categoryTitle = categories.nombre.replaceAll(' ', '_').toLocaleLowerCase();
    const router = useRouter();

    const [subCategoriesProducts, setSubCategoriesProducts] = useState(categories.subcategorias);
    const [idCategoria, setIdCategoria] = useState(categories.id)
    const [ordenProducts, setOrdenProducts] = useState(orden || 'topseller')
    const [marcaProducts, setMarcaProducts] = useState(marca || '')
    const [paginaProducts, setPaginaProducts] = useState(url.pagina || 1)    
    const [idSubCategories, setIdSubCategories] = useState([categories.id]);

    //Refrescar los estados al cargar una nueva categoria por url
    useEffect(() => {
      setSubCategoriesProducts(categories.subcategorias)
      setOrdenProducts(orden || 'topseller');
      setPaginaProducts(url.pagina || 1);
      setMarcaProducts(marca || '')

      if( idCategoria != categories.id ){
        setIdCategoria(categories.id)
        setIdSubCategories([categories.id])

      }
      
    }, [router.query]);

    // Refrescar cambios con los diferentes filtros
    useEffect(() => {
      urlUpdate()      
    }, [ ordenProducts, paginaProducts ])

    // Actualizar los querys de la url para cargar los filtros
    const urlUpdate = ( ) => {

      if( error === 'error' ){
        router.push('/404')
      } else {
        const baseUrl = `/productos/${categories.id}?`;
        const idCategoria = idSubCategories.length > 0 ? `id_categoria=${idSubCategories}` : '';
        const categoriaName = categoryTitle !== '' ? `categoria=${categoryTitle}` : ''; 
        const marcaName = marcaProducts !== '' ? `marca=${marcaProducts}` : ''; 
        const orden = ordenProducts ? `&orden=${ordenProducts}` : `&  orden=topseller`;
        const pagina = paginaProducts !== 1 ? `&pagina=${paginaProducts}` : `&pagina=1`;

        router.push(`${baseUrl}${categoriaName}&${idCategoria}${ marcaName !== '' ? '&' : ''}${marcaName}${orden}${pagina}`); 
      }
    }

    const handleChangeSort = (e: SelectChangeEvent) => {
        setOrdenProducts(e.target.value);
        setPaginaProducts(1);
    }

    // Agregar o quitar subCategorias de la busqueda 
    const handleChangeCategories = (e: React.ChangeEvent<HTMLInputElement>) => {
    
      if(e.target.checked){
        if(idSubCategories.find(v => v === categories.id)){
          setIdSubCategories([e.target.id]);
        }else{
          setIdSubCategories([...idSubCategories, e.target.id]);
        }
      }else{
        if(idSubCategories.length === 1){
          setIdSubCategories([categories.id]);
        }else{
          let arr = idSubCategories.filter(v => v !== e.target.id)
          setIdSubCategories(arr)
        }         
      }
      setPaginaProducts(1);
      
      
  };

  return (
    <MainLayout title={"Productos"} pageDescription={"Lista de productos que ofrece la empresa Segycom"}>
      <Container maxWidth='xl' >

        <Grid container minHeight='calc(100vh - 100px)' sx={{ mb: 3 , bgcolor: '#F7F7F7' }} >

          {/* Filtro de los productos */}
          <Grid item xs={12} md={2} sx={{ px: {xs: 0, md: 3 }, py: {xs: 3, md: 6}, mb: 5 }} >

            <Grid >
              {/* Nombre de la categoria */}
              <Box display='flex' justifyContent='center' sx={{ pb: 1 }}>
                <Typography fontWeight={700} color='#666666' >
                  { categories.nombre.toUpperCase() }
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
                  {
                    role !== '' && (
                      <MenuItem value={'precio:asc'}>Precio de Menor a Mayor</MenuItem>
                    )
                  }
                  {
                    role !== '' && (
                      <MenuItem value={'precio:desc'}>Precio de Mayor a Menor</MenuItem>
                    )
                  }
                </Select>
              </FormControl>

              <Box display='flex' justifyContent='center' sx={{ px: { xs: 1, md: 0 } }}>
                <Divider sx={{ mb: 1, width: '100%', height: 5 }}/>           
              </Box>

              {/* Desplegar las sub categorias de la categoria principal */}
              <Box sx={{ px: { xs: 1, md: 0 } }}>
                <Accordion elevation={0} sx={{ bgcolor: '#F7F7F7' }} >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                  >
                    <Typography color='#666666' fontWeight={600}>Subcategorías</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      {
                        subCategoriesProducts.length > 0 && (
                          
                            subCategoriesProducts.map( (category) => (
                              <FormControlLabel
                                  key={category.id}
                                  control={
                                      <Checkbox 
                                          checked={idSubCategories.indexOf(category.id) > -1}
                                          id={category.id} 
                                          onChange={handleChangeCategories} 
                                          name={category.nombre} 
                                          color="primary"
                                      />
                                  }
                                  label={category.nombre}
                              />
                              
                          ))
                        ) 
                      }
                          
                      
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
              </Box>
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

export const getServerSideProps: GetServerSideProps = async ({ query, params, req }) => {

  let marcaName = '';
  let role = '';

  const { data: tipoCambio } = await syscomApi.get<ITipoCambio>('/tipocambio');

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // if( req.headers.cookie ){
  //   const parsedCookies = cookie.parse(req.headers.cookie);
  //   try {
  //     await jose.jwtVerify(parsedCookies.token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));
  //     const decoded = jwt.decode(parsedCookies.token) as { role: string };
  //     role = decoded.role;
  //   } catch (error) {
      
  //     console.log(error)
  //   }

  // }
  
  if(typeof query.marca === 'string'){
    marcaName = query.marca.replaceAll('-', '').replaceAll('_', '');
  }
    
  const idCategoria = query.id_categoria ? `categoria=${query.id_categoria}` : '';
  const orden = query.orden ? `&orden=${query.orden}` : `&orden=topseller`;
  const pagina = query.pagina ? `&pagina=${query.pagina}` : `&pagina=1`;

  const marca = query.marca ? `marca=${marcaName}` : '';

  let error = ''
  let productsList = {};
  let categoriesList = {};

  try {

      if( query.id_categoria || query.marca ){
        
          const { data } = await syscomApi.get<IProductos>(`productos?${idCategoria}${ marca ? '&' : ''}${marca}${orden}${pagina}`);
          const { data: categorias } = await syscomApi.get( `categorias/${params?.category}`);

          data.productos.map( product => {
            // TODO Validar el tipo de usuario para mostrar precios
            
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
          categoriesList = categorias;
      }else {
          productsList = {};
      }
  } catch (e) {
      error = 'error';
  }


return {
  props: {
      products: productsList,
      categories: categoriesList,
      marca: query.marca ? query.marca : '',
      orden: query.orden ? query.orden : 'topseller',
      url: query,
      error,
      role,
  }
}
}

export default Productos