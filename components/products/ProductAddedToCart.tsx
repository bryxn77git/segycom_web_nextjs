import { Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CardMedia, Grid, Avatar, Box, CardActionArea, IconButton, Typography } from '@mui/material';
import { useRouter } from "next/router";
import { FC, useContext } from 'react';
import { UiContext } from "../../context";
import { ICartProduct } from "../../interfaces";
import { ItemCounter } from '../ui';

interface Props {
    product: ICartProduct,
}

export const ProductAddedToCart: FC<Props> = ({ product }) => {

    const router = useRouter();
    const { isDialogProductAddedOpen, toggleDialogProductAdded } = useContext( UiContext )


    const handleClickCart = () => {
        toggleDialogProductAdded();
        router.push('/cotizacion');
    };
    
      const handleClose = () => {
        toggleDialogProductAdded();
      };

  return (
    <Dialog
        open={isDialogProductAddedOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle variant='h6' color='text.secondary' fontWeight={700}>
            { product.quantity > 1 ? 'Productos agregados': 'Producto agregado'}
          
        </DialogTitle>
        <DialogContent>
            <Grid container spacing={2} sx={{ mb: 1 }}>
                    <Grid item xs={6} display='flex' justifyContent='center'>
                        {/* TODO llevar a la pagina del producto */}
                       
                          <CardMedia 
                              image={ `${ product.img_portada }` }
                              component='img'
                              sx={{ borderRadius: '5px', maxWidth: 200 }}
                          />
                        

                    </Grid>
                    <Grid container item xs={6} display='flex' alignItems='center'>
                        <Box display='flex' flexDirection='column' >
                            <Typography color='text.secondary' variant='body1' sx={{ mb: 0.5}}><strong>Modelo:</strong> { product.modelo[0].toUpperCase() + product.modelo.slice(1) }</Typography>
                            <Typography color='text.secondary' variant='body1' sx={{ mb: 0.5}}> <strong>Marca:</strong> { product.marca }</Typography>
                            
                            <Typography color='text.secondary' variant='body1'><strong>Cantidad:</strong> { product.quantity }</Typography>
     
                        </Box>
                    </Grid>

                </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Aceptar</Button>
          <Button onClick={handleClickCart} autoFocus>
            Ir a la cotización
          </Button>
        </DialogActions>
      </Dialog>
  )
}
