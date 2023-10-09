import { FC, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import NextLink from "next/link";

import { ICartProduct, IProducto } from '../../interfaces';
import { CartContext, UiContext } from '../../context';
import { ItemCounter } from "../ui"

import { Swiper, SwiperSlide } from "swiper/react"

import { Card, CardMedia, ButtonBase, Typography, Box, Button, Grid, Link } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ProductAddedToCart } from './ProductAddedToCart';
import { currency } from '../../utils';

interface Props {
    product: IProducto;    
}

export const ProductPrincipalInfo:FC<Props> = ({ product }) => {
    
    const router = useRouter();
    

    const [imgSelected, setImgSelected] = useState(product.imagenes[0]?.imagen || product.img_portada);
    const [imagesList, setImagesList] = useState(product.imagenes || [])
    const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
        producto_id: product.producto_id,
        modelo: product.modelo,    
        titulo: product.titulo,   
        marca: product.marca,
        sat_key: product.sat_key,
        img_portada: product.img_portada,   
        link: product.link,
        precio: product.precios?.precio_lista,   
        quantity: 1,      
    })

    useEffect(() => {
        setImgSelected(product.imagenes[0]?.imagen || product.img_portada)
        setImagesList(product.imagenes || [])
        setTempCartProduct({
            producto_id: product.producto_id,
            modelo: product.modelo,    
            titulo: product.titulo,   
            marca: product.marca,
            sat_key: product.sat_key,
            img_portada: product.img_portada,   
            link: product.link,
            precio: product.precios?.precio_lista,   
            quantity: 1, 
        })
        
            
    }, [router.query]);

    const { addProductToCart } = useContext( CartContext )
    const { toggleDialogProductAdded } = useContext(UiContext)

    const options = {
        maximumFractionDigits: 2,
        useGrouping: true
    };

    const onUpdateQuantity = ( quantity: number ) => {
        setTempCartProduct( currentProduct => ({
          ...currentProduct,
          quantity
        }));
    }

    const onAddProduct = () => {    
        addProductToCart(tempCartProduct);
        toggleDialogProductAdded();
    }

  return (
    <>
        <Grid container sx={{ py: { xs: 5, xl: 10} }}>
            <Grid container item xs={12} md={5} sx={{ mb: { xs: 3, md: 0 }, display: { xs: 'none', md: 'flex'}}} justifyContent='center'>
                <Card elevation={0} sx={{ display: 'flex', alignItems: 'center' }}>
                
                    <CardMedia  
                        component='img'
                        alt={ product.modelo }
                        image={ imgSelected.toString() }
                        sx={{ maxHeight: 390, width: '100%' }}
                    />

                </Card>

                <Grid container item xs={11} sm={7} md={9} lg={8} xl={7} justifyContent="center" >
                    {
                        imagesList.length > 1   
                        && (
                            imagesList.map( img => {
                                
                                return (
                                    <Grid
                                        key={ img.imagen }
                                        item
                                        xs={2}
                                    >
                                        <ButtonBase
                                            className='imgBtn'
                                            onMouseEnter={ () => setImgSelected(img.imagen) }
                                        >
                                            <img alt={ img.url } className='imgMini' src={img.imagen.toString()}/>
                                            
                                        </ButtonBase>

                                    </Grid>
                                )
                            })

                        )
                    }  
                </Grid>
            </Grid>                
            <Grid container item xs={12} md={5} sx={{ mb: { xs: 3, md: 0 }, display: { xs: 'flex', md: 'none'}}} justifyContent='center'>
                
                    {
                        imagesList.length > 0 
                        ? (
                            <Swiper
                                pagination={{
                                    "clickable": true
                                }} 
                            >
                                {
                                    imagesList.map( img => {
                                        
                                        return (
                                            <SwiperSlide key={ img.imagen } className='swiperImgProduct'>
                                                {/* <img src={ img.imagen.toString() } alt={ img.url } className='imgProductPrincipal'/> */}
                                                <CardMedia  
                                                    component='img'
                                                    alt={ img.url }
                                                    image={ img.imagen.toString() }
                                                    sx={{ maxHeight: 390, width: { xs: '80%', sm: '50%'} }}
                                                />
                                            </SwiperSlide>
                                        )
                                    })
                                }
                            </Swiper> 

                        ) : (
                            <CardMedia  
                                component='img'
                                alt={ product.modelo }
                                image={ imgSelected.toString() }
                                sx={{ maxHeight: 390, width: { xs: '80%', sm: '50%'} }}
                            />
                        )
                    }   
                    
            </Grid>                
            <Grid container item xs={12} md={7} >
                <Grid item xs={12}>
                    <Typography variant='h5' fontWeight={600} color='#666666'>{ product.titulo }</Typography>
                </Grid>
                <Grid item xs={12} sx={{ mt: 3 }}>
                    <Typography variant='body1' fontWeight={600} color='#666666'>Características Principales:</Typography>
                    {
                        product.caracteristicas.map( char => (
                            <Typography variant='body2' fontWeight={500} color='#666666' key={char}>{ `-${char}` }</Typography>
                        ))
                    }
                    
                </Grid>
                <Grid item xs={8} sx={{ mt: 3 }}> 
                    <Typography variant='body2' fontWeight={600} color='#666666'>Modelo: <span className='infoProduct' >{ `${ product.modelo }` }</span></Typography>
                    <NextLink href={ `/marcas/${ product.marca.toLocaleLowerCase() }` } passHref>
                        <Link>
                            <Typography variant='body2' fontWeight={600} color='#666666'>Marca: <span className='infoProduct marcaProduct' >{ `${ product.marca }` }</span></Typography>
                        </Link>
                    </NextLink>
                    <Typography variant='body2' fontWeight={600} color='#666666'>Código SAT: <span className='infoProduct' >{ `${ product.sat_key }` }</span></Typography>
                </Grid>
                <Grid item xs={4} sx={{ mt: 3 }}>
                    <NextLink href={ `/marcas/${ product.marca.toLocaleLowerCase() }` } passHref>
                        <Link>
                            <CardMedia  
                                component='img'
                                alt={ product.marca }
                                image={ product.marca_logo }
                                sx={{ width: '80%' }}
                            />
                        </Link>
                    </NextLink>
                </Grid>
                {
                    product.precios?.precio_lista && (
                        <Grid item xs={12} sx={{ mt: 3 }}> 
                            <Typography variant='h4' fontWeight={600} >{`MX ${ currency.format( Number(product.precios?.precio_lista) ) }`}</Typography>
                            <Typography variant="caption" fontWeight={500} color='primary' >
                                    { `${ product.precios.precio_descuento !== 0 ? `Precio descuento: MX ${currency.format( Number(product.precios.precio_descuento) )}` : ''}` }
                            </Typography> 
                        </Grid>

                    )
                }

                <Grid item xs={12} sx={{ mt: 5 }}>
                    <Box display='flex' alignItems='center'>
                        <ItemCounter 
                            currentValue={ tempCartProduct.quantity }
                            updateQuantity={ onUpdateQuantity }
                        />

                        <Button 
                            variant="contained" 
                            fullWidth 
                            startIcon={<AddIcon />}
                            onClick={ onAddProduct }
                            disabled={false}
                        >
                            Agregar a la cotización
                        </Button>      
                    </Box>
                    
                </Grid> 
            </Grid>                
        </Grid>
        <ProductAddedToCart product={tempCartProduct} />
    </>
  )
}
