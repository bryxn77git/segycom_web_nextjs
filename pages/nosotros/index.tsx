import React from 'react'
import { MainLayout } from '../../components/layouts'
import { CardMedia, Container, Grid, Link, Typography, Button, Card } from '@mui/material';
import NextLink from "next/link"
import { SwiperImageUs } from '../../components/nosotros';
import { useMediaQuery, useTheme } from "@mui/material";

const Nosotros = () => {
    
  const theme = useTheme();
  const titleSize = useMediaQuery(theme.breakpoints.up('md')) ? 'h3' : 'h4';

  return (
    <MainLayout title='Sobre nosotros' pageDescription='Información de la empresa segycom de Chihuahua'>
        
        <Container maxWidth='xl' >

            <Grid container sx={{ py: { xs: 5, md: 8 }, pl: { xs: 0 ,md: 5 }, mb: 3, bgcolor: '#F7F7F7' }} >

                <Grid container alignItems='center' item xs={12} md={6} xl={6} sx={{ pl: { xs: 1, md: 3}, pr: { xs: 1, md: 0 } }} >
                    <Grid item>
                        <Typography variant={titleSize} fontWeight={600} color='#404040' sx={{ mb: 3 }}>Seguridad y Comunicación a su alcance</Typography>
                        <Typography variant='body1' fontWeight={500} align='justify' color='#404040' sx={{ mb: 3 }}>¡La solución a sus problemas de rastreo y monitoreo de sus vehículos, así como la facilidad de encontrar lo que busca con un solo clic!</Typography>
                        
                        <NextLink href={ '/contacto' } passHref >
                            <Link>
                                <Button color="primary" variant="contained" sx={{ mb: { xs: 3, md: 0}}} >
                                    CONTACTO
                                </Button>
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={6} xl={6} justifyContent='center' display='flex' >
                    <CardMedia  component='img' image={ './assets/home/logo-footer.webp' } sx={{ maxWidth: 600  }} />  
                </Grid>

            </Grid>


            <Grid container sx={{  py: { xs: 5, md: 8}, px: { xs: 1, lg: 3, xl: 15}, mb: 3, bgcolor: '#F7F7F7' }} >

                <Grid container >
                    <Grid item xs={12} lg={5} sx={{ px: { xs: 0, md: 5 }, pt: 3}}>
                        <Typography variant='h4' fontWeight={600} color='#404040' sx={{ mb: 3 }}>Nuestra historia</Typography>
                        <Typography variant='body1' fontWeight={500} align='justify' sx={{ mb: 1 }} color='#404040'>Somos una empresa joven que empezó distribuyendo equipos de radiocomunicación, al paso del tiempo nos fuimos extendiendo en la distribución de equipos de emergencia aplicados en el equipamiento de AMBULANCIAS.</Typography>
                        <Typography variant='body1' fontWeight={500} align='justify' sx={{ mb: 1 }} color='#404040'>Ahora estamos incursionando en el manejo de las plataformas de rastreo donde ofrecemos un servicio que cuenta con múltiples herramientas que ponemos a sus órdenes para que usted pueda administrar su flotilla y así pueda disminuir los gastos de combustible y desgaste de sus unidades.</Typography>
                        <Typography variant='body1' fontWeight={500} align='justify' sx={{ mb: 1 }} color='#404040'>También le ofrecemos los sistemas de Radiocomunicación e Iluminación líderes en el mercado. La experiencia que hemos adquirido con el paso del tiempo nos permite poder ofrecerle el apoyo en la elección de lo mejor que usted necesite.</Typography>
                    </Grid>
                    {/* <Grid item xs={8} sx={{ pr: { xs: 0, md: 5 }}}>
                    </Grid> */}
                    {/* <Grid item xs={4} sx={{ bgcolor: '#666666'}}>
                        <CardMedia  component='img' image={ './assets/aboutus/reconocimientosyscom.webp' } sx={{ maxWidth: 600, borderRadius: 10, pr: 10, py: { xs: 0, md: 3}  }} />  
                    </Grid> */}
                    <Grid container item xs={12} lg={7} display='flex' justifyContent='center' sx={{ px: { xs: 0, md: 5 }, pt: { xs: 5, md: 0 } }}>
                        <Grid item xs={6} sx={{ pt: 5 }}>
                            <Card sx={{ m: 1 }} >
                                <CardMedia  
                                    component='img'
                                    alt='Sucursal'
                                    image='./assets/aboutUs/reconocimientosyscom.webp'
                                />
                            </Card>
                            <Card sx={{ m: 1 }}>
                                <CardMedia
                                    component='img'
                                    alt='Sucursal'
                                    image='./assets/aboutUs/aboutUs3.webp'
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={6} sx={{ pt: 1 }}>
                            <Card sx={{ m: 1 }}>
                                <CardMedia
                                    component='img'
                                    alt='Sucursal'
                                    image='./assets/aboutUs/aboutUs2.webp'
                                />
                            </Card>
                            <Card sx={{ m: 1 }}> 
                                <CardMedia
                                    component='img'
                                    alt='Sucursal'
                                    image='./assets/aboutUs/aboutUs4.webp'
                                    // sx={{maxHeight: 300}}
                                />
                            </Card>
                        </Grid>
                        
                    </Grid>

                </Grid>

            </Grid>

            <Grid container direction="row" justifyContent="center" display='flex' sx={{  py: { xs: 5, md: 8}, mb: 3, px: { xs: 1, md: 8}, bgcolor: '#F7F7F7' }} >
                <iframe width="100%" height="600" src="https://www.youtube.com/embed/s71AXVul1UA" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </Grid>

            <Grid container sx={{   py: { xs: 5, md: 8}, mb: 3, px: { xs: 1, md: 8}, bgcolor: '#F7F7F7' }} >

                <Grid container display='flex' justifyContent='center' alignItems='center' >
                    <Grid item xs={12} >
                        <Typography variant='h4' fontWeight={600} color='#404040' sx={{ mb: 2 }}>Misión</Typography>
                        <Typography variant='body1' fontWeight={500} align='justify' color='#404040'>Ofrecer a nuestros clientes soluciones de seguridad tecnológicas efectivas, seguras y confiables que vayan acorde a sus necesidades y exigencias; siempre apoyados en nuestra experiencia, tiempo de respuesta, conocimiento del área y en la representación de empresas de Seguridad Informáticas.</Typography>
                    </Grid>

                    <Grid item xs={12} >
                        <Typography variant='h4' fontWeight={600} color='#404040' sx={{ mb: 2, mt: 5 }}>Visión</Typography>
                        <Typography variant='body1' fontWeight={500} align='justify' color='#404040'>Ser la empresa líder en el mercado nacional en el área de Radiocomunicación, teniendo como aval nuestro trato humano, confidencialidad, experiencia y servicio único; apoyando a personas físicas y morales en la implementación de soluciones y de seguridad que satisfagan necesidades. Para superar las expectativas de nuestros clientes.</Typography>
                    </Grid>
                </Grid>

            </Grid>

            <Grid container sx={{   py: { xs: 5, md: 8}, mb: 3, px: { xs: 1, md: 8}, bgcolor: '#F7F7F7' }} >
                <Grid item xs={12} sx={{ textAlign: 'center'}}>
                    <Typography variant='h4' fontWeight={600} color='#404040' sx={{ mb: 3 }}>Familia Segycom</Typography>
                    {/* Carousel component */}
                    <SwiperImageUs />
                </Grid> 
            </Grid>

        </Container>

    </MainLayout>
  )
}

export default Nosotros;