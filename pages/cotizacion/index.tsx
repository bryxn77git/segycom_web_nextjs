import NextLink from 'next/link'
import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField, Typography, Container } from '@mui/material';

import { FormContact } from '../../components/ui';
import { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { CartContext } from '../../context/cart/CartContext';
import { OrderSummary } from '../../components/cotizacion/OrderSummary';
import { useForm } from 'react-hook-form';
import { validations } from '../../utils';
import segycomWebApi from '../../api/segycomWebApi';
import { CartList } from '../../components/cotizacion';
import { MainLayout } from '../../components/layouts';
import { AuthContext, UiContext } from '../../context';

type FormData = {
    name     : string;
    lastname : string;
    email    : string;
    phone    : string;
    company  : string;
    address  : string;
    city     : string;
    state    : string;
    commnets : string;
}

const getFromInitialData = ():FormData => {
    return {
        name: '',
        lastname: '',
        email: '',
        phone: '',
        company: '',
        address: '',
        city: '',
        state: '',
        commnets: '',
    }
}

const CartPage = () => {
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        defaultValues:  getFromInitialData()
    });
    const { isLoaded, cart, numberOfItems } = useContext( CartContext );
    const { tipoCambio } = useContext(UiContext)
    const { isLoggedIn } = useContext( AuthContext )
    const [invitado, setinvitado] = useState(false)
    const router = useRouter();

    const [loading, setloading] = useState(false)


    useEffect(() => {
      if( isLoaded && cart.length === 0 ){
        router.replace('/cotizacion/empty');
      }
    }, [isLoaded, cart, router])

    if( !isLoaded || cart.length === 0 ){
        return (<></>)
    }

    // useEffect(() => {
    //     reset(getFromInitialData())
    // }, [reset])

    const onSubmitInvitadoOrden = async( data: FormData ) => {

        const completeData = {
            ...data,
            tipoCambio: tipoCambio.normal,
            cart
        }
    
        setloading(true)
        try {
            const resp = await segycomWebApi.post('/emails/guest', completeData);

            if(resp.data.message === 'error'){
                return alert('Error al enviar el mensaje')
            }

            setloading(false)
            router.replace('/gracias/invitado')
            
        } catch (error) {
            console.log(error)
            setloading(false)
            alert('Error al enviar el formulario')
        }
        
        
    }

  return (
    <MainLayout title={`Cotización - ${numberOfItems}`} pageDescription={"Cotización de la tienda de segycom"}>
        <Container maxWidth='xl'  >
            
            <Box minHeight='calc(100vh - 200px)'>

            <Grid container sx={{ mb: 3 , bgcolor: '#F7F7F7', py: 5, px: { xs: 1, md: 3} }} >

                <Grid sx={{ mb: 4 }} item xs={12}>
                    <Typography variant='h5' fontWeight={600} color='#666666' >Cotización</Typography>
                </Grid>

                <Grid item xs={12} md={9} sx={{ mb: { xs: 3, md: 0 }}} className='fadeIn'>
                    {/* CartList */}
                    <CartList editable/>
                </Grid>
                <Grid item xs={12} md={3}>
                    <form onSubmit={ handleSubmit( onSubmitInvitadoOrden ) } > 
                    <Card elevation={0} >
                        <CardContent>   
                            {
                                !invitado && (
                                    <>
                                        <Typography sx={{ mt: 1, mb: 2}} variant='h2' fontSize={16} fontWeight={600} color='text.secondary'>RESUMEN DE PRODUCTOS</Typography>
                                        <Divider sx={{ mt: 1, mb: 2 }}/>
                                    </>
                                )
                            }
                            

                           
                                <Grid container spacing={ invitado ? 1 : 0}>

                                    {
                                        !invitado ? (
                                            <>
                                            <OrderSummary />
                                            <Grid item xs={12} sx={{ mt: 2}}>
                                                <Button fullWidth variant="contained" href='/checkout/address'>Continuar</Button>
                                            </Grid> 

                                            {
                                                !isLoggedIn && (
                                                    <Grid item xs={12} sx={{ mt: 1}}>
                                                        <Button fullWidth size='small' onClick={ () => setinvitado(true)}>Salicitar cotización como invitado</Button>
                                                    </Grid> 
                                                )
                                            }
                                            </>
                                        ) : (
                                            
                                            <>
                                            <Grid item xs={6}>
                                                <TextField 
                                                    size='small'
                                                    id="name"
                                                    label="Nombre"
                                                    variant="outlined"
                                                    fullWidth
                                                    { ...register('name', {
                                                        required: true
                                                    })}
                                                    error={ !!errors.name }
                                                    helperText={ errors.name?.message }
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    size='small'
                                                    id="lastname"
                                                    label="Apellido"
                                                    variant="outlined"
                                                    fullWidth
                                                    { ...register('lastname', {
                                                        required: true
                                                    })}
                                                    error={ !!errors.lastname }
                                                    helperText={ errors.lastname?.message }
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    size='small'
                                                    id="email"
                                                    label="Correo electrónico"
                                                    variant="outlined"
                                                    fullWidth
                                                    { ...register('email', {
                                                        required: true,
                                                        validate: validations.isEmail
                                                    })}
                                                    error={ !!errors.email }
                                                    helperText={ errors.email?.message }
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    size='small'
                                                    id="phone"
                                                    label="Teléfono"
                                                    variant="outlined"
                                                    fullWidth
                                                    { ...register('phone', {
                                                        required: true
                                                    })}
                                                    error={ !!errors.phone }
                                                    helperText={ errors.phone?.message }
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    size='small'
                                                    id="company"
                                                    label="Empresa"
                                                    variant="outlined"
                                                    fullWidth
                                                    { ...register('company')}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    size='small'
                                                    id="address"
                                                    label="Dirección"
                                                    variant="outlined"
                                                    fullWidth
                                                    { ...register('address', {
                                                        required: true
                                                    })}
                                                    error={ !!errors.address }
                                                    helperText={ errors.address?.message }
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    size='small'
                                                    id="city"
                                                    label="Ciudad"
                                                    variant="outlined"
                                                    fullWidth
                                                    { ...register('city', {
                                                        required: true
                                                    })}
                                                    error={ !!errors.city }
                                                    helperText={ errors.city?.message }
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <TextField
                                                    size='small'
                                                    id="state"
                                                    label="Estado"
                                                    variant="outlined"
                                                    fullWidth
                                                    { ...register('state', {
                                                        required: true
                                                    })}
                                                    error={ !!errors.state }
                                                    helperText={ errors.state?.message }
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField 
                                                    size='small' 
                                                    multiline 
                                                    maxRows={2} 
                                                    id="commnets" 
                                                    label="Comentarios" 
                                                    variant="outlined" 
                                                    fullWidth  
                                                    { ...register('commnets')}
                                                />
                                            </Grid>

                                            <Grid item xs={12} >
                                                <Button 
                                                    fullWidth 
                                                    variant="contained" 
                                                    type='submit'
                                                    disabled={ loading ? true : false}
                                                >
                                                    {
                                                        loading ? 'Enviando...' : 'Solicitar cotización'
                                                    }
                                                </Button>
                                            </Grid> 

                                            <Grid item xs={12}>
                                                <Button fullWidth size='small' onClick={ () => setinvitado(false)}>Volver</Button>
                                            </Grid> 
                                            </>
                                        ) 
                                    }

                                    
                                    


                                </Grid>

                        </CardContent>
                    </Card>
                    </form>
                </Grid>

            </Grid>
            </Box>
        
                                            
        </Container>
       
    </MainLayout>

  )
}

export default CartPage