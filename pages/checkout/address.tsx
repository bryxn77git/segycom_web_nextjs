import React from 'react'
import { Grid, TextField, Button, Typography, Card, CardContent, Box, Container } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { CartContext } from '../../context/cart/CartContext';
import { useContext, useEffect } from 'react';
import { MainLayout } from '../../components/layouts';

type FormData = {
    name     : string;
    lastname : string;
    phone    : string;
    company  : string;
    address  : string;
    city     : string;
    state    : string;
    commnets : string;
    zip      : string;
}

const getAddressFromCookies = ():FormData => {
    return {
        name     : Cookies.get('name') || '',
        lastname : Cookies.get('lastname') || '',
        phone    : Cookies.get('phone') || '',
        company  : Cookies.get('company') || '',
        address  : Cookies.get('address') || '',
        city     : Cookies.get('city') || '',
        state    : Cookies.get('state') || '',
        commnets : Cookies.get('commnets') || '',
        zip      : Cookies.get('zip') || '',
    }
}

const Address = () => {

    const router = useRouter();
    const { updateAddress } = useContext( CartContext )

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        defaultValues:  getAddressFromCookies()
    });

    useEffect(() => {
        reset(getAddressFromCookies())
      }, [reset])

    const onSubmitAddress = ( data: FormData ) => {

        updateAddress( data );
        router.push('/checkout/summary')
     }

  return (
    <MainLayout title={`Dirección`} pageDescription={`Datos del usuario para la cotización de los productos seleccionados`}>
        <Container maxWidth='xl' >
            <Grid minHeight='calc(100vh - 200px)' sx={{ mb: 3 }} >
            <Grid container sx={{ bgcolor:'#F7F7F7', py: 5, px: { xs: 1, md: 3 } }} >
                <Grid item xs={12} sx={{ mb: 4 }}>
                    <Typography variant='h5' component='h5' color='#666666' fontWeight={600} >Datos del cliente</Typography>
                </Grid>

                <form onSubmit={ handleSubmit( onSubmitAddress ) } className='fromContact'> 
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                id="name"
                                label="Nombre"
                                variant="outlined"
                                fullWidth
                                { ...register('name', {
                                    required: 'Este campo es obligatorio'
                                })}
                                error={ !!errors.name }
                                helperText={ errors.name?.message }
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                            
                                id="lastname"
                                label="Apellido"
                                variant="outlined"
                                fullWidth
                                { ...register('lastname', {
                                    required: 'Este campo es obligatorio'
                                })}
                                error={ !!errors.lastname }
                                helperText={ errors.lastname?.message }
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                            
                                id="phone"
                                label="Teléfono"
                                variant="outlined"
                                fullWidth
                                { ...register('phone', {
                                    required: 'Este campo es obligatorio'
                                })}
                                error={ !!errors.phone }
                                helperText={ errors.phone?.message }
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                            
                                id="company"
                                label="Empresa"
                                variant="outlined"
                                fullWidth
                                { ...register('company')}
                            />
                        </Grid>

                        <Grid item xs={12} sm={8}>
                            <TextField
                            
                                id="address"
                                label="Dirección"
                                variant="outlined"
                                fullWidth
                                { ...register('address', {
                                    required: 'Este campo es obligatorio'
                                })}
                                error={ !!errors.address }
                                helperText={ errors.address?.message }
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                            
                                id="zip"
                                label="Codigo postal"
                                variant="outlined"
                                fullWidth
                                { ...register('zip', {
                                    required: 'Este campo es obligatorio'
                                })}
                                error={ !!errors.zip }
                                helperText={ errors.zip?.message }
                            />
                        </Grid>

                        <Grid item  xs={12} sm={6}>
                            <TextField
                            
                                id="city"
                                label="Ciudad"
                                variant="outlined"
                                fullWidth
                                { ...register('city', {
                                    required: 'Este campo es obligatorio'
                                })}
                                error={ !!errors.city }
                                helperText={ errors.city?.message }
                            />
                        </Grid>

                        <Grid item  xs={12} sm={6}>
                            <TextField
                            
                                id="state"
                                label="Estado"
                                variant="outlined"
                                fullWidth
                                { ...register('state', {
                                    required: 'Este campo es obligatorio'
                                })}
                                error={ !!errors.state }
                                helperText={ errors.state?.message }
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                    multiline
                                    maxRows={2}
                                    id="commnets"
                                    label="Comentarios"
                                    variant="outlined"
                                    fullWidth
                                    { ...register('commnets')}
                                />
                        </Grid>

                        <Grid item xs={12} display='flex' justifyContent='center' sx={{ mt: 1 }}>
                            <Button fullWidth variant="contained" type='submit' size='large'>Continuar</Button>
                        </Grid> 
                    </Grid>
                </form>

            </Grid>
            </Grid>
        </Container>         
    </MainLayout>
  )
}

export default Address