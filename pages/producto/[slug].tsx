import { useState, useEffect } from 'react';

import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { ProductPrincipalInfo } from '../../components/products';
import { MainLayout } from "../../components/layouts"
import { ItemsProduct } from '../../components/products';
import { syscomApi } from "../../api";
import { IProducto, ITipoCambio } from "../../interfaces";

import * as jose from 'jose';
import * as cookie from 'cookie'
import jwt from 'jsonwebtoken';

import  SwiperCore ,{ Pagination, Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Container, Grid, Typography } from '@mui/material';
import { ProductAddedToCart } from '../../components/products/ProductAddedToCart';
import { getToken } from 'next-auth/jwt';


SwiperCore.use([Autoplay, Pagination, Navigation]);

interface Props {
    product: IProducto,
    productItems: IProducto[],
    productRelated: IProducto[],
    error: string,
}


const Producto: NextPage<Props> = ({ product, productItems, productRelated, error }) => {


    const [productDetails, setProductDetails] = useState(product)

    const router = useRouter();
    useEffect(() => {
        setProductDetails(product)   
    }, [router.query]);



  return (
    <MainLayout title={`SEGYCOM: ${productDetails.modelo}-${productDetails.marca}-${productDetails.titulo}`} pageDescription={`${productDetails.titulo}`}>

            <Container maxWidth='xl' >  

            <Grid sx={{ mb: 3 , bgcolor: '#FFFFFF' }} >
                <Container maxWidth='lg' >
                    
                    <ProductPrincipalInfo product={product} />

                </Container>

                        
            </Grid>

            {
                productItems.length > 0 && (
                    <Grid sx={{ mb: 3 , bgcolor: '#F7F7F7', py: 5, px: 3 }} >
                        <Typography variant='h5' fontWeight={600} color='#666666' sx={{ pb: 3 }}>Accesorios Opcionales</Typography>

                        <ItemsProduct products={ productItems }/>

                    </Grid>
                )
            }

            <Grid sx={{ mb: 3 , bgcolor: '#F7F7F7', py: 5, px: { xs: 1, md: 3} }} >
                <Typography variant='h5' fontWeight={600} color='#666666' sx={{ pb: 3 }}>Especificaciones</Typography>
                <Container maxWidth='lg' >

                
                {
                    product.descripcion && (

                        <Grid container className="descriptionContent" dangerouslySetInnerHTML={{__html: product.descripcion
                            .replace('img class="img-responsive center-block" style="padding: 25px;"', 'img id="iconSpecifications" style="padding: 25px; width="100%" height="auto""')
                            .replace(/style="padding: 25px;" width="160"/g, 'img id="iconSpecifications" style="padding: 25px;"')
                            .replace(/font-family: verdana, geneva, sans-serif/g, 'font-family: Montserrat, Roboto')
                            .replace(/Arial/g, 'Montserrat, Robot')
                            .replace(/#0091ff/g, '#8C0712')
                            .replace(/#62a9f1/g, '#8C0712')
                            .replace(/#ff0000/g, '#8C0712')
                            .replace(/EPCOM/g, 'SEGYCOM')
                            .replace(/Epcom/g, 'Segycom')
                            .replace('<a', '<p')
                            .replace(/iframe/g, 'p')
                        }}>
                                

                        </Grid>
                        
                    )
                }
                </Container>
            </Grid>

            {
                productRelated.length > 0 && (
                    <Grid sx={{ mb: 3 , bgcolor: '#F7F7F7', py: 5, px: 3 }} >
                        <Typography variant='h5' fontWeight={600} color='#666666' sx={{ pb: 3 }}>Productos Relacionados</Typography>

                        <ItemsProduct products={ productRelated }/>

                    </Grid>
                )
            }
        </Container>

            

       

    
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {

    let error = ''
    let productDetails = {}
    let productItemsDetails = {}
    let productRelatedDetails = {}
    let idProduct;
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    const { data: tipoCambio } = await syscomApi.get<ITipoCambio>('/tipocambio');

    // if( req.headers.cookie ){
    //     const parsedCookies = cookie.parse(req.headers.cookie);

    //     try {
    //         await jose.jwtVerify(parsedCookies.token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));
    //         const decoded = jwt.decode(parsedCookies.token) as { role: string };
    //         role = decoded.role;
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    if (typeof  query.slug === "string") {
        idProduct = query.slug?.split('.')[0].split('-') 
    }else{
        idProduct = ''
    }

    try {

        const { data: productsList } = await syscomApi.get<IProducto>(`productos/${idProduct[ idProduct.length - 1 ]}`);    
        const { data: productItemsList } = await syscomApi.get<IProducto[]>(`productos/${idProduct[ idProduct.length - 1 ]}/accesorios`)
        const { data: productRelatedList } = await syscomApi.get<IProducto[]>(`productos/${idProduct[ idProduct.length - 1 ]}/relacionados`)
        
        
        if( !session ){
            delete productsList.precios;
          } else {

            if (session?.user) {
              const { role } = session.user as { role: string };
            
              if( productsList.precios ) {
                          
                  switch (role) {
                      case 'admin':
                          productsList.precios.precio_descuento =  Number(productsList.precios.precio_descuento) * Number(tipoCambio.normal);
                          productsList.precios.precio_lista = Number(productsList.precios.precio_lista) * Number(tipoCambio.normal)
                      break;
                      case 'clientA':
                          productsList.precios.precio_descuento = 0;
                          productsList.precios.precio_especial = 0;
                          productsList.precios.precio_lista = (Number(productsList.precios.precio_lista)  - ( Number(productsList.precios.precio_lista)  * (15 / 100))) * Number(tipoCambio.normal)
                      break;
                      case 'clientB':
                          productsList.precios.precio_descuento = 0;
                          productsList.precios.precio_especial = 0;
                          productsList.precios.precio_lista = (Number(productsList.precios.precio_lista)  - ( Number(productsList.precios.precio_lista)  * (20 / 100))) * Number(tipoCambio.normal)
                      break;
                      case 'clientC':
                          productsList.precios.precio_descuento = 0;
                          productsList.precios.precio_especial = 0;
                          productsList.precios.precio_lista = (Number(productsList.precios.precio_lista)  - ( Number(productsList.precios.precio_lista)  * (25 / 100))) * Number(tipoCambio.normal)
                      break;
                  
                      default:
                      break;
                  }
              
              } 
        
              
            }
          }
          // console.log(role)
          delete productsList.existencia;
          delete productsList.total_existencia;

            productItemsList.map( product => {
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

            productRelatedList.map( product => {
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

        productDetails = productsList;
        productItemsDetails = productItemsList;
        productRelatedDetails = productRelatedList;
    } catch (e) {
        error = 'error';
    }
  
  return {
    props: {
        product: productDetails,
        productItems: productItemsDetails,
        productRelated: productRelatedDetails,
        error,
    }
  }
}

export default Producto