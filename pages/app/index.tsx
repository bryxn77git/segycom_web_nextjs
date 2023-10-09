import { useContext } from 'react';
import NextLink from "next/link"

import { MainLayout } from '../../components/layouts'
import { AppFunctionText } from '../../components/app/AppFunctionText';
import { UiContext } from '../../context';
import { SwiperScreens } from '../../components/app';

import { useMediaQuery, useTheme } from "@mui/material";
import { Grid, Typography, Container, CardMedia, Link } from '@mui/material';

import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import LanguageIcon from '@mui/icons-material/Language';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import HistoryIcon from '@mui/icons-material/History';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const App = () => {

    const theme = useTheme();

    // Cambiar el tamaño de la letra y direccion de un Grid dependiendo del tamaño de la pantalla
    const titleSize = useMediaQuery(theme.breakpoints.up('md')) ? 'h3' : 'h4';
    const dir = useMediaQuery(theme.breakpoints.up('md')) ? 'row' : 'column-reverse';

    // Imagen que se esta mostrando en la funcionalidad de la app
    const { appImageShowing } = useContext( UiContext )

  return (
    <MainLayout title='App Segycom' pageDescription='Información de la aplicación de segycom' >

        <Container maxWidth='xl'  >

            {/* Descripcion y Gif de la app */}
            <Grid container sx={{ py: { xs: 5, md: 8 }, pl: { xs: 0 ,md: 5}, mb: 3, bgcolor: '#F7F7F7' }} >
                
                {/* Descripcion principal de la app */}
                <Grid container alignItems='center' item xs={12} md={6} xl={5} sx={{ px: { xs: 1, md: 3}  }} >
                    <Grid item>
                        <Typography variant={titleSize} fontWeight={600} color='#404040' sx={{ mb: 3 }}>App para Smartphone</Typography>
                        <Typography variant='body1' fontWeight={500} align='justify' color='#404040' sx={{ mb: 3 }}>La mejor solución a sus problemas de monitoreo de flotillas también disponible al alcance de sus manos, para rastrear sus unidades en cualquier momento y en cualquier lugar, disponible también para dispositivos móviles.</Typography>
                    
                        <Grid container direction='row' sx={{ mb: { xs: 5, md: 0 } }}>

                            {/* Boton de appstore */}
                            <Grid item >
                                <NextLink href={ 'https://apps.apple.com/mx/developer/segycom-de-chihuahua-s-a-de-c-v/id1304391274' } passHref prefetch={ false }>
                                    <Link target='_blank'>
                                        <CardMedia  
                                            component='img'
                                            image={ './assets/app/appstore-badge.svg' }
                                            sx={{ width: 135 }}
                                        />  
                                    </Link>
                                </NextLink>
                            </Grid>
                            {/* fin - Boton de appstore */}

                            {/* Boton de playstore */}
                            <Grid item >
                                <NextLink href={ 'https://play.google.com/store/apps/developer?id=SEGYCOM&hl=en&gl=US' } passHref prefetch={ false }>
                                    <Link target='_blank'>
                                        <CardMedia  
                                            component='img'
                                            image={ './assets/app/playstore-badge.svg' }
                                            sx={{ width: 150}}
                                        />  
                                    </Link>
                                </NextLink>
                            </Grid>
                            {/* fin - Boton de playstore */}
                        </Grid>
                    </Grid>
                </Grid>
                {/* fin - Descripcion principal de la app */}

                {/* Gif de la app */}
                <Grid item xs={12} md={6} xl={7} justifyContent='center' display='flex' >  
                    <CardMedia  
                        component='img'
                        image={ './assets/app/iphone_gif_1.2.gif' }
                        sx={{ width: { xs: '100%' }, maxHeight: 560 }}
                    />  
                </Grid>
                {/* fin - Gif de la app */}
                
            </Grid>
            {/* fin - Descripcion y Gif de la app */}
            
            
            {/* Logo de la app y una pequeña descripcion */}
            <Grid container sx={{  py: { xs: 5, md: 8 }, pl: { xs: 1, md: 5 }, pr: { xs: 1, md: 10 }, mb: 3, bgcolor: '#F7F7F7' }} >

                <Grid container display='flex' justifyContent='center' alignItems='center' >
                    <Grid item xs={12} md={6} justifyContent='center' display='flex' >
                        <CardMedia  
                            component='img'
                            image={ './assets/app/logoapp.webp' }
                            sx={{ width: 'auto', borderRadius: '25%', boxShadow: '10px 10px 10px #CCCCCC', maxWidth: { xs: 250, md: 380 }, mb: { xs: 5, md: 0 } }}
                        />  
                    </Grid>

                    <Grid item xs={12} md={6}  sx={{ pr: { xs: 0, md: 5}}}>
                        <Typography variant='h5' fontWeight={600} color='#404040' sx={{ mb: 3 }}>La App de Segycom</Typography>
                        <Typography variant='body1' fontWeight={500} align='justify' color='#404040' sx={{ mb: 3 }}>Ahora está disponible para los usuarios de iOS y Android. En ella se aprecia la información sobre las unidades rastreadas, con una interfaz amigable y accesible, con un diseño estético y moderno. La información del vehículo está disponible de una manera manejable.</Typography>
                    </Grid>
                </Grid>

            </Grid>
            {/* fin - Logo de la app y una pequeña descripcion */}

            {/* Funcion de la app, se muetra en pantallas grandes*/}
            <Grid container direction="row" justifyContent="center" >   
                <Grid 
                    container  
                    sx={{ mb: 3, bgcolor: 'rgba(255, 255, 255,  0.4)', py: { xs: 5, md: 8}, px: { xs: 0, md: 5} }}    
                    justifyContent='center'
                    display='flex'        
                >

                    <Grid item xs={12} sx={{ textAlign: 'center', mb: 3 }}>
                        <Typography variant='h4' fontWeight={600} color='#404040' sx={{ mb: 3 }}>Funcionalidad de la app </Typography>
                    </Grid>
                
                    <Grid container item xs={12} md={4} display='flex' direction='row' sx={{ px: {xs: 1, md: 5} }}>
                        <AppFunctionText img='app-screen01.webp' icon={<FormatListBulletedIcon color="primary" />} title={'Lista de trabajo'} text={'Monitorea tus vehículos en tiempo real, visualiza los sensores y enviar comandos de una manera sencilla.'}  />
                        <AppFunctionText img='app-screen02.webp' icon={<MapOutlinedIcon color="primary" />} title={'Mapa'} text={'Visualiza todas tus unidades en los diferentes mapas que te ofrece la app de segycom.'}  />
                        <AppFunctionText img='app-screen03.webp' icon={<HistoryIcon color="primary" />} title={'Historial'} text={'Solicita la información, recorridos y estacionamientos de tus unidades de hasta 3 meses atrás.'}  />
                        <AppFunctionText img='app-screen04.webp' icon={<NotificationsActiveOutlinedIcon color="primary" />} title={'Notificaciones '} text={'Obtén alertas de pánico, excesos de velocidad, entradas y salidas de geocercas de tus unidades.'}  />
                    </Grid>

                    <Grid item container justifyContent="center" xs={4} sx={{ display: { xs: 'none', md: 'flex'}}}>
                        <img src="./assets/app/iphone-notch-1.webp" alt="App icon" className='imgIphone' />
                        <img src={`./assets/app/${appImageShowing}`} alt="App Screen" className='imgScreen' />

                        {/* <CardMedia component='img' alt='App icon' image={ './assets/app/iphone-notch-1.webp' } className='imgIphone'/>  
                        <CardMedia component='img' alt='App Screen' image={ `./assets/app/${appImageShowing}` } className='imgScreen'/>   */}
                    </Grid>

                    <Grid container item xs={12} md={4} display='flex' direction='row' sx={{ px: {xs: 1, md: 5} }}>
                        <AppFunctionText img='app-screen05.webp' icon={<FeedOutlinedIcon color="primary" />} title={'Informes '} text={'Descarga y visualiza las plantillas de informes de tus unidades de una manera rápida y sencilla.'}  />
                        <AppFunctionText img='app-screen06.webp' icon={<LanguageIcon color="primary" />} title={'Geocercas'} text={'Crea geocercas que permitan saber cuándo salen o entran tus unidades de un área en específico.'}  />
                        <AppFunctionText img='app-screen07.webp' icon={<DashboardOutlinedIcon color="primary" />} title={'Estado'} text={'Toda la información resumida del estado de tus unidades y geocercas, ahora en una sola sección.'}  />
                        <AppFunctionText img='app-screen08.webp' icon={<SettingsOutlinedIcon color="primary" />} title={'Ajustes'} text={'Personaliza las configuraciones de la app a tus necesidades para tener una mejor experiencia.'}  />
                    </Grid>

                </Grid>

            </Grid>
            {/* fin - Funcion de la app, se muetra en pantallas grandes */}
            
            {/* Capturas de panrtalla, se muestra cuendo son pantañas pequeñas */}
            <Grid 
                container  
                sx={{ mb: 3, bgcolor: 'rgba(255, 255, 255,  0.4)', py: { xs: 5, md: 8}, px: { xs: 0, md: 5}, display: { xs: 'flex', md: 'none'}}} 
                justifyContent='center'
                display='flex'        
            >

                <Grid item xs={12} sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography variant='h4' fontWeight={600} color='#404040' sx={{ mb: 3 }}>Capturas de pantalla</Typography>
                </Grid>

                <Grid container justifyContent="center" >
                    {/* <CardMedia component='img' alt='App icon' image={ './assets/app/iphone-notch-1.webp' } className='imgIphone2'/>   */}
                    <img src="./assets/app/iphone-notch-1.webp" alt="App icon" className='imgIphone2' />
                    
                    
                    <SwiperScreens />                                              
                </Grid>

            </Grid>
            {/* fin - Capturas de panrtalla, se muestra cuendo son pantañas pequeñas */}

            {/* informacion del demo de la app */}
            <Grid container direction={ dir } sx={{ py: { xs: 5, md: 8 }, pr: { xs: 1, md: 10}, pl: { xs: 1, md: 0}, mb: 3, bgcolor: '#F7F7F7' }} >

                <Grid item xs={12} md={7}  justifyContent='center' display='flex' > 
                    <CardMedia  
                        component='img'
                        image={ './assets/app/ipad_iphone.webp' }
                        sx={{ maxWidth: 450, pb: 3 }}
                    />  
                </Grid>

                {/* info demo */}
                <Grid container alignItems='center' justifyContent='center' direction='row' item xs={12} md={5}  sx={{ pr: { xs: 0, md: 10}}}>

                    <Grid item sx={{ textAlign: 'center' }}>
                    
                        <Typography variant='h4' fontWeight={600} color='#404040' sx={{ mb: 2 }}>¿Te gustaria probar la app?</Typography>
                        <Typography variant='body1' fontWeight={500} color='#404040' sx={{ mb: 3 }}>Usuario= demosegycom | Contraseña= segycom</Typography>

                        <Grid container direction='row' justifyContent='center' display='flex' sx={{ mb: { xs: 5, md: 0 } }}>
                            <Grid item >
                                <NextLink href={ 'https://apps.apple.com/mx/developer/segycom-de-chihuahua-s-a-de-c-v/id1304391274' } passHref prefetch={ false }>
                                    <Link target='_blank'>
                                        <CardMedia  
                                            component='img'
                                            image={ './assets/app/appstore-badge.svg' }
                                            sx={{ width: 135 }}
                                        />  
                                    </Link>
                                </NextLink>
                            </Grid>
                            <Grid item >
                                <NextLink href={ 'https://play.google.com/store/apps/developer?id=SEGYCOM&hl=en&gl=US' } passHref prefetch={ false }>
                                    <Link target='_blank'>
                                        <CardMedia  
                                            component='img'
                                            image={ './assets/app/playstore-badge.svg' }
                                            sx={{ width: 150}}
                                        />  
                                    </Link>
                                </NextLink>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* info demo */}

            </Grid>
            {/* fin - informacion del demo de la app */}

        </Container>        
    </MainLayout>
  )
}

export default App;