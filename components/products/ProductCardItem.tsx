import { Card, CardActionArea, CardContent, CardMedia, Grid, Link, Typography, Tooltip, TextField, Button, Box } from '@mui/material';
import NextLink from "next/link";
import { IProducto } from '../../interfaces';
import { FC, PropsWithChildren,  } from 'react';
import { useMediaQuery, useTheme } from "@mui/material";
import { currency } from '../../utils';

interface Props {
    product: IProducto;
}

export const ProductCardItem: FC<PropsWithChildren<Props>> = ({ product }) => {

    const theme = useTheme();
    const winsowsSize = useMediaQuery(theme.breakpoints.down('sm')) ? 55 : 75;

    let nombre = ''

    if(product.marca_logo){
        const nombrePng = product.marca_logo.split('/')
        nombre = nombrePng[nombrePng.length -1 ].split('.')[0]
    }

    const options = {
        maximumFractionDigits: 2,
        useGrouping: true
    };

  return ( 
    
        <Card elevation={0} sx={{ height: 470 }}>
            <CardContent  sx={{ textAlign: 'center', alignItems: 'center', diplay: 'flex'}}>
                <NextLink href={ `${product.link}` } passHref>
                    <Link>
                        <CardMedia  
                            component='img'
                            alt={ product.modelo }
                            image={ product.img_portada !== '' ? product.img_portada : `${process.env.NEXT_PUBLIC_HOST_NAME}assets/products/noproduct.webp` }
                            className='img-zoom'
                            sx={{
                                width: { xs: 160, md: 200 },
                                height: { xs: 160, md: 200 },
                                maxWidth: { xs: 160, md: 200 },
                                display: 'inline-block',
                            }}
                        />
                    </Link>
                </NextLink>
            </CardContent>
        <CardContent>
            <Grid container sx={{ height: '100%' }}>
                {/* <Grid container sx={{ height: '30%'}}> */}
                        <NextLink href={ `${product.link}` } passHref >
                            <Link >
                            <Tooltip title={product.titulo} arrow placement="top">
                                <Typography variant="body2" fontWeight={600} sx={{mb: 3}}>
                                    {
                                        product.titulo.length < winsowsSize ? product.titulo : product.titulo.substring(0, winsowsSize) + '...'
                                    }
                                </Typography>
                            </Tooltip>
                            </Link>
                        </NextLink>
                {/* </Grid> */}
                {/* <Grid container sx={{ height: '70%' }} alignItems='center'> */}
                    
                    <Grid item xs={8} sx={{ mb: 1 }}>
                        <Typography variant="body2" fontWeight={600} color='#666666'>
                            {product.modelo}
                        </Typography>
                        <NextLink href={ `/marcas/${nombre}` } passHref>
                                <Link >
                                    <Typography variant="caption" color="#8C0712" fontWeight={600} className='marcaProduct' >
                                        {product.marca.charAt(0).toLocaleUpperCase() + product.marca.slice(1)}
                                    </Typography>
                                </Link>
                        </NextLink>
                    </Grid>
                    <Grid item xs={4} alignItems='center' display='flex' justifyContent='flex-end' >
                        {/* <NextLink href={ `/marcas/${ product.marca.toLocaleLowerCase() }` } passHref>
                            <Link> */}
                                <CardMedia  
                                    component='img' 
                                    alt={ product.marca }
                                    image={ product.marca_logo !== '' ? product.marca_logo : `${process.env.NEXT_PUBLIC_HOST_NAME}assets/products/noproduct.webp`}
                                    sx={{ width: '100%',}}  
                                />
                            {/* </Link>
                        </NextLink> */}
                    </Grid>
                    {
                        product.precios && (
                            <Grid item xs={12} >
                                
                                <Typography variant="subtitle1" fontWeight={600} >
                                    { `MX ${ currency.format( Number(product.precios?.precio_lista) )}` }
                                </Typography>       
                                <Typography variant="caption" fontWeight={500} color='primary' >
                                    { `${ product.precios.precio_descuento !== 0 ? `Precio descuento: MX ${currency.format( Number(product.precios.precio_descuento) )}` : ''}` }
                                </Typography>       

                            </Grid>
                        )
                    }
                    
                {/* </Grid> */}

            
                {/* <LinkButton href='/' title={ product.marca.charAt(0).toLocaleUpperCase() + product.marca.slice(1) } /> */}

                

                {/* <Grid container alignItems='flex-end' sx={{ height: '20%'}} spacing={1}>
                    <Grid item xs={3} >

                        <TextField
                            
                            size="small"
                            defaultValue="1"
                            
                            variant="standard"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{ inputProps: { min: 1} }}
                        />
                    </Grid>
                    <Grid item xs={9} >
                        <Tooltip title={`Agregar ${product.modelo} a la cotización`} arrow placement="top">
                            <Button 
                                size="small" 
                                variant="contained" 
                                color="primary" 
                                fullWidth
                                
                                startIcon={<RequestQuoteOutlinedIcon />}
                                type='submit'
                            >
                                Agregar
                            </Button>

                        </Tooltip>

                    </Grid>
                </Grid> */}
            </Grid>

                
        </CardContent>
        </Card>
    // </Grid>
  )
}
