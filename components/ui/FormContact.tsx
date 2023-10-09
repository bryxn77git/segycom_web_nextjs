import { Box, Button, Grid, TextField, Typography} from "@mui/material"
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { segycomWebApi } from "../../api";
import { validations } from "../../utils";

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

export const FormContact = () => {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        defaultValues:  getFromInitialData()
    });

    const [loading, setloading] = useState(false)

    useEffect(() => {
        reset(getFromInitialData())
    }, [reset])

    const onSubmitInvitadoOrden = async( data: FormData ) => {
    
        setloading(true)
        try {
            const resp = await segycomWebApi.post('/emails/contact', data); 

            if(resp.data.message === 'error'){
                return alert('Error al enviar el mensaje')
            }

            setloading(false)
            router.push('/gracias/contacto')
            
        } catch (error) {
            console.log(error)
            setloading(false)
            alert('Error al enviar el formulario')
        }
        
        
    }

  return (
    <Box sx={{ width: '100%', pl: { xs: 1, md: 5 }, pr: 1, py: 3 }} >

        <Typography variant="h3" fontWeight={600} color='#666666' sx={{ mb: 1 }}>
            Contactanos
        </Typography>
        <Typography variant="body1" fontWeight={500} color='#666666' sx={{ mb: 3 }}>
        Mandanos tus comentarios o dudas a través de este formulario y un asesor de ventas se pondrá en contacto.
        </Typography>

        <form onSubmit={ handleSubmit( onSubmitInvitadoOrden ) } > 
        <Grid container spacing={3} >

            <Grid item xs={12} md={6}>
                <TextField 
                    id="name"
                    label="Nombre"
                    variant="outlined"
                    fullWidth
                    { ...register('name', {
                        required: true
                    })}
                    error={ !!errors.name }
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    id="lastname"
                    label="Apellido"
                    variant="outlined"
                    fullWidth
                    { ...register('lastname', {
                        required: true
                    })}
                    error={ !!errors.lastname }
                />            
            </Grid>
            <Grid item xs={12}>
                <TextField
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
            <Grid item xs={12} md={6}>
                <TextField
                    id="phone"
                    label="Teléfono"
                    variant="outlined"
                    fullWidth
                    { ...register('phone', {
                        required: true
                    })}
                    error={ !!errors.phone }
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField 
                    id="company" 
                    label="Empresa" 
                    variant="outlined" 
                    fullWidth
                    { ...register('company')}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="address"
                    label="Dirección"
                    variant="outlined"
                    fullWidth
                    { ...register('address', {
                        required: true
                    })}
                    error={ !!errors.address }
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    id="city"
                    label="Ciudad"
                    variant="outlined"
                    fullWidth
                    { ...register('city', {
                        required: true
                    })}
                    error={ !!errors.city }
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextField
                    id="state"
                    label="Estado"
                    variant="outlined"
                    fullWidth
                    { ...register('state', {
                        required: true
                    })}
                    error={ !!errors.state }
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

            
            
            <Grid item xs={12}>
                <Button fullWidth variant="contained" size="large" type='submit' disabled={ loading ? true : false }>
                    { loading ? 'Enviando...' : 'Enviar' }
                </Button>
            </Grid>


        </Grid>
        </form>

    </Box>
  )
}
