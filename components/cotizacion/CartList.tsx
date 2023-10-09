import NextLink from 'next/link'
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Link, Typography, Tooltip } from '@mui/material';
import { ItemCounter } from '../ui'

import DeleteIcon from '@mui/icons-material/Delete';
import { useMediaQuery, useTheme } from "@mui/material";
import { FC, useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/cart';
import { ICartProduct, IOrderItem } from '../../interfaces';
import { currency } from '../../utils';

interface Props {
    editable?: boolean;
    products?: IOrderItem[];
}

export const CartList: FC<Props> = ({ editable = false, products }) => {

    const { cart, updateCartQuantity, removeCartProduct } = useContext( CartContext );
    const [dialog, setDialog] = useState(false)

    const theme = useTheme();
    const windowSize = useMediaQuery(theme.breakpoints.up('md')) ? 'row' : 'column';

    const onNewCartQuantityValue = ( product: ICartProduct, newQuantityValue: number ) => {
        product.quantity = newQuantityValue;
        updateCartQuantity( product );
    }

    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    const deleteProductFomCart = ( product: IOrderItem ) => {
        if (confirm('Desea eliminar el producto de la cotización')) {
            removeCartProduct( product ) 
        }    
    }

    const productsToShow = products ? products : cart;

  return (

    <>
        <Grid container spacing={2} sx={{ mb: 3 }} >
            <Grid item xs={3}>
                <Typography variant='body1' fontWeight={600} color='text.secondary'>IMAGEN</Typography>
            </Grid>
            <Grid item xs={4}>
                <Typography variant='body1' fontWeight={600} color='text.secondary'>INFORMACIÓN</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant='body1' fontWeight={600} color='text.secondary'>CANTIDAD</Typography>
            </Grid>
            {/* <Grid item xs={2}>
                <Typography variant='body1' fontWeight={600} color='text.secondary'>SUBTOTAL</Typography>
            </Grid> */}

         </Grid>
        


        {
            hasMounted && productsToShow.map( product => (
            
                <Grid container spacing={2} key={product.producto_id} sx={{ mb: 3 }}>
                    <Grid item xs={3} display='flex' justifyContent='center' >
                        {/* TODO llevar a la pagina del producto */}
                        <NextLink href={`${product.link}`} passHref>
                            <Link>
                                <CardActionArea>
                                    <CardMedia 
                                        image={ `${ product.img_portada }` }
                                        component='img'
                                        sx={{ borderRadius: '5px', maxWidth: 100 }}
                                    />
                                </CardActionArea>


                            </Link>
                        </NextLink>

                    </Grid>
                    <Grid item xs={4}>
                        <Box display='flex' flexDirection='column'>
                            <Tooltip title={product.titulo} arrow placement="top">
                                <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }} color='#666666'>
                                    {
                                        product.titulo.length < 50 ? product.titulo : product.titulo.substring(0, 70) + '...'
                                    }
                                </Typography>
                            </Tooltip>
                            <Typography variant='caption' fontWeight={600} color='#666666'>Modelo: <span className='infoProduct'>{ product.modelo }</span></Typography>     
                            <Typography variant='caption' fontWeight={600} color='#666666'>Marca: <span className='infoProduct'>{ product.marca }</span></Typography>     
                            {
                                product.precio && (
                                    <Typography variant='caption' fontWeight={600} color='#666666'>Precio Unitario: <span className='infoProduct'>{ `MX${ currency.format( Number(product.precio))}` }</span></Typography>     

                                )
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={5} display='flex' alignItems='center' flexDirection={windowSize}>
                        <Grid item xs={12} md={ product.precio ? 4 : 6 }>
                            

                            {   
                                editable 
                                ? (
                                    <Box display='flex' alignItems='center'>
                                        <ItemCounter 
                                            currentValue={ product.quantity }
                                            updateQuantity={ ( value ) => onNewCartQuantityValue(product, value) }
                                        />

                                    </Box>
                                )
                                : <Typography variant='subtitle1' color='text.secondary' fontWeight={500}>{ product.quantity } { product.quantity > 1 ? 'productos': 'producto'}</Typography>
                            }
                        </Grid>
                        {
                            product.precio && (
                                <Grid container item xs={12} md={ !editable ? 8 : 5} justifyContent='center'>
                                    <Typography variant='subtitle1' color='text.secondary' fontWeight={500}>
                                        { `MX${ currency.format( Number(product.precio) * product.quantity )}` }    
                                    </Typography>
                                </Grid>

                            )
                        }
                        {
                            editable && (
                                <Grid container item xs={12} md={ product.precio ? 3 : 12 } justifyContent='center'>
                                    <IconButton
                                        onClick={ () => deleteProductFomCart( product )}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                    
                                </Grid>
                            )
                        }

                    </Grid>

                    

                </Grid>
            
                
            ))
        }
    </>
    
  )
}
