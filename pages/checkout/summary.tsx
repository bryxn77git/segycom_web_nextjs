import NextLink from 'next/link'
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography, Container, Chip, Backdrop, CircularProgress } from '@mui/material';
import { CartList } from '../../components/cotizacion';
import { MainLayout } from "../../components/layouts"
import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { CartContext } from '../../context/cart/CartContext';
import { OrderSummary } from '../../components/cotizacion/OrderSummary';
import Cookies from 'js-cookie';
import { segycomWebApi } from '../../api';



const SummaryPage = () => {

    const router = useRouter();

    const { numberOfItems, shippingAddress, createOrder } = useContext( CartContext );

    const [ isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if( !Cookies.get('name') ){
            router.push('/checkout/address')
        }
    }, [ router ])

    const onCreateOrder = async() => {
        setIsPosting(true); // 19

        const { hasError, message } = await createOrder();

        if( hasError ){
            setIsPosting(false);
            setErrorMessage( message );
            return;
        }

        try {
            const resp = await segycomWebApi.post('/emails/order', { url: `${process.env.NEXT_PUBLIC_HOST_NAME}admin/orders/${message}`,  data: shippingAddress });
            if(resp.data.message === 'error'){
                return alert('Error al enviar el mensaje')
            }
            
        } catch (error) {
            setIsPosting(false)
            alert('Error al enviar el formulario')
        }

        

        router.replace(`/orders/${ message }`)
    }

    if(!shippingAddress) {
        return <></>
    }

    const { address, city, lastname, name, phone, state, commnets = '', company = '', zip  } = shippingAddress; 


  return (
    <>

        <MainLayout title={`Resumen - ${numberOfItems}`} pageDescription={'Resumen de cotización de la tienda'} >


            <Container maxWidth='xl' >
                <Grid minHeight='calc(100vh - 200px)' sx={{ mb: 3 }} >
                    <Grid container sx={{ bgcolor:'#F7F7F7', py: 5, px: { xs: 1, md: 3 } }} >
                        <Grid item xs={12} sx={{ mb: 4 }}>
                            <Typography variant='h5' component='h1' color='#666666' fontWeight={600} >Resumen</Typography>
                        </Grid>

                        <Grid item xs={12} md={9} sx={{ mb: { xs: 3, md: 0 }}} className='fadeIn'>
                            {/* CartList */}
                            <CartList />
                        </Grid>

                        <Grid item xs={12} md={3}>
                                
                            <Card elevation={0} >
                                <CardContent>

                                    <Typography variant='subtitle1' color='#666666' fontWeight={700}>RESUMEN DE LA COTIZACIÓN</Typography>
                                    <Divider sx={{ my:1 }} />

                                    <Box display='flex' justifyContent='space-between' sx={{ mb: 0.5 }}>
                                        <Typography color='text.secondary' fontWeight={600} variant='body1' >Información del cliente</Typography>
                                        <NextLink href='/checkout/address' passHref>
                                            <Link underline='always'>
                                                Editar
                                            </Link>
                                        </NextLink>
                                    </Box>
                                    
                                    <Typography color='text.secondary' fontWeight={500} variant='body2'>{ name } { lastname }</Typography>
                                    <Typography color='text.secondary' fontWeight={500} variant='body2'>{ address }</Typography>
                                    <Typography color='text.secondary' fontWeight={500} variant='body2'>{ state }, { city }, { zip }</Typography>
                                    <Typography color='text.secondary' fontWeight={500} variant='body2'>{ phone }</Typography>
                                    <Typography color='text.secondary' fontWeight={500} variant='body2'>{ company }</Typography>
                                    <Typography color='text.secondary' fontWeight={500} variant='body2'>{ commnets }</Typography>                            

                                    <Divider sx={{ mt: 2, mb: 1 }} />

                                    <Box display='flex' justifyContent='space-between' sx={{ mb: 0.5 }}>
                                        <Typography color='text.secondary' fontWeight={600} variant='body1'>Productos</Typography>
                                        <NextLink href='/cotizacion' passHref>
                                            <Link underline='always'>
                                                Editar
                                            </Link>
                                        </NextLink>
                                    </Box>

                                    <OrderSummary /> 

                                    <Grid item xs={12} sx={{ mt: 3 }} display="flex" flexDirection="column">
                                        <Button 
                                            fullWidth 
                                            variant="contained" 
                                            // href='/gracias/orden'
                                            disabled={ isPosting ? true : false }
                                            onClick={ onCreateOrder }
                                        >
                                            {
                                                isPosting ? 'Cargando...' : 'Confirmar cotización'
                                            } 
                                        
                                        </Button>

                                        <Chip 
                                            color="error"
                                            label={ errorMessage }
                                            sx={{ display: errorMessage ? 'flex' : 'none', mt: 2}}
                                        />
                                    </Grid> 

                                </CardContent>
                            </Card>
                            
                        </Grid>

                    </Grid>
                </Grid>

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
                    open={isPosting}
                    // onClick={handleClose}
                >
                    <CircularProgress />
                </Backdrop>

            </Container>

        </MainLayout>


    </>
  )
}

export default SummaryPage