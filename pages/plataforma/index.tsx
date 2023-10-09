import React from 'react'
import { FC } from 'react';
import NextLink from 'next/link'
import { GetStaticProps } from 'next';

import { MainLayout } from '../../components/layouts'
import { SwiperClients, SwiperScreens, VentajasPlataforma } from '../../components/plataforma';
import { dbClientes } from '../../database';
import { IClientes } from '../../interfaces';

import { Grid, Typography, Button, Container, CardMedia, Link } from '@mui/material';
import { useMediaQuery, useTheme } from "@mui/material";

interface Props {
    clientList: IClientes[];
}

const Plataforma: FC<Props> = ({ clientList }) => {

    const theme = useTheme();
    const titleSize = useMediaQuery(theme.breakpoints.up('md')) ? 'h3' : 'h4';

  return (

    <MainLayout title='Plataforma' pageDescription='Información de la prlataforma segycom'>
    
        <Container maxWidth='xl'  >

            {/* Informacion principal de la plataforma */}
            <Grid container alignItems='center' sx={{  py: { xs: 5, md: 8 }, px: { xs: 1, md: 5 }, mb: 3, bgcolor: '#F7F7F7' }} >

                <Grid item xs={12} md={5} xl={4} sx={{ pl: { xs: 0, md: 3 }, mb: { xs: 3, md: 0 }}}>
                    <Typography variant={titleSize} fontWeight={600} color='#404040' sx={{ mb: 3 }}>Plataforma de rastreo</Typography>
                    <Typography variant='body1' fontWeight={500} align='justify' color='#404040' sx={{ mb: 3 }}>¡Te ofrecemos la plataforma líder del mercado. Rastrea en todo momento a tus unidades con facilidad y adáptala a tus necesidades!</Typography>

                    <NextLink href={ '/contacto' } passHref >
                        <Link>
                            <Button 
                                color="primary"
                                variant="contained"
                                sx={{ mb: { xs: 3, md: 0}}}
                                // to="/solicitar"
                            >
                                SOLICITAR
                            </Button>
                        </Link>
                    </NextLink>

                </Grid>

                <Grid item xs={12} md={7} xl={8}>   
                    <CardMedia  
                        component='img'
                        image={ './assets/home/multiple_devices.webp' }
                        sx={{ width: { xs: '100%', md: '125%' } }}
                    />  
                </Grid>

            </Grid>
            {/* fin - Informacion principal de la plataforma */}

            {/* Descripcion de la plataforma */}
            <Grid container sx={{ py: {xs: 5, md: 8 }, pl: { xs: 1, md: 5 }, pr: { xs: 1, md: 10 }, mb: 3, bgcolor: '#F7F7F7' }} >

                <Grid container display='flex' justifyContent='center' alignItems='center' >

                    <Grid item xs={12} md={6} justifyContent='center' display='flex' >
                        <CardMedia  
                            component='img'
                            image={ './assets/plataforma/plataforma_1.webp' }
                            sx={{ width: { xs: '50%', md: '70%' }, mb: { xs: 3, md: 0 } }}
                        />  
                    </Grid>

                    <Grid item xs={12} md={6}  sx={{ pr: 5}}>
                        <Typography variant='h5' fontWeight={600} color='#404040' sx={{ mb: 3 }}>Ofrece gran variedad de herramientas para adaptarlas a tus necesidades</Typography>
                        <Typography variant='body1' fontWeight={500} align='justify' color='#404040' sx={{ mb: 3 }}>La plataforma de Segycom ofrece herramientas para que puedas personalizar las funciones dependiendo las necesidades de tus unidades.</Typography>
                    </Grid>
                </Grid>

            </Grid>
            {/* fin - Descripcion de la plataforma */}
            
            {/* Ventajas de la plataforma */}
            <Grid 
                container
                justifyContent='center'
                display='flex'
                sx={{ textAlign: 'center',  mb: 3, py: { xs: 5, md: 8 }, px: { xs: 1, md: 10 }, bgcolor: '#F7F7F7'  }}                    
            >

                <VentajasPlataforma />

            </Grid>


            <Grid container direction="row" justifyContent="center" >   

                <Grid 
                    container  
                    sx={{ mb: 3, bgcolor: '#F7F7F7', py: { xs: 5, md: 8 }, px: { xs: 1, md: 5 } }}    
                    justifyContent='center' 
                    display='flex'        
                >
                    <Grid item xs={12} sx={{ textAlign: 'center', mb: 3 }}  >
                        <Typography variant='h4' fontWeight={600} color='#404040' sx={{ mb: 3 }}>Capturas de pantalla</Typography>
                    </Grid>

                    <Grid item sx={{ width: { xs: '100%', md: '80%'}}}>
                        <SwiperScreens />
                    </Grid>
                </Grid>

            </Grid>

            <Grid container direction="row" justifyContent="center" sx={{ bgcolor: '#F7F7F7', py: 5, px: { xs: 1, md: 10}, mb: 3 , textAlign: 'center'}} >
                
                <Grid item xs={12} sx={{ mb: 3 }} >
                    <Typography variant='h4' fontWeight={600} color='#404040' sx={{ mb: 3 }}>Nuestros clientes</Typography>
                </Grid>

                <Grid container justifyContent="center" display='flex' spacing={2} >
                    <SwiperClients clients={clientList} /> 
                </Grid>

            </Grid>
            
        </Container>
            
    </MainLayout>
  )
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
    
    const clientList = await dbClientes.getAllClients();
    
    return {
      props: {
        clientList,
      },
      revalidate: 60 * 60 * 24
    }
  }

export default Plataforma