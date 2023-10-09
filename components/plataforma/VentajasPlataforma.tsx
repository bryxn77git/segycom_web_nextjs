
import { Typography, Grid } from '@mui/material';

import MapIcon from '@mui/icons-material/Map';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import RoomIcon from '@mui/icons-material/Room';
import LanguageIcon from '@mui/icons-material/Language';

export const VentajasPlataforma = () => {
  return (
    <>
        <Grid item xs={12} sx={{ mb: { xs: 3, md: 5 } }} >
            <Typography variant='h4' fontWeight={600} color='#404040' sx={{ mb: 3 }}>Algunas de las ventajas de la plataforma</Typography>
        </Grid>

        <Grid container justifyContent='center' display='flex' spacing={5}>

            <Grid item xs={12} sm={6} md={4} >
                <MapIcon color="primary"/>
                <Typography variant='h6' fontWeight={600} color='#404040' sx={{ mb: 1 }}>Monitoreo en tiempo real</Typography>
                <Typography variant='body1' fontWeight={500} color='#404040' sx={{ mb: 1 }}>Monitorear tus flotas en tiempo real para saber su ubicación en cada momento.</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4} >
                <AssignmentIcon color="primary"/>
                <Typography variant='h6' fontWeight={600} color='#404040' sx={{ mb: 1 }}>Sistema flexible de informes</Typography>
                <Typography variant='body1' fontWeight={500} color='#404040' sx={{ mb: 1 }}>Informes para adaptarlos a las necesidades de cada usuario para facilitar su consulta.</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}  >
                <NotificationsIcon color="primary"/>
                <Typography variant='h6' fontWeight={600} color='#404040' sx={{ mb: 1 }}>Sistema de notificaciones</Typography>
                <Typography fontWeight={500} color='#404040' sx={{ mb: 1 }}>Enviar alertas para mantener informado a los usuarios sobre las actividades de las unidades.</Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>

                <PersonIcon color="primary"/>
                <Typography variant='h6' fontWeight={600} color='#404040' sx={{ mb: 1 }}>Amigable para el usuario</Typography>
                <Typography fontWeight={500} color='#404040' sx={{ mb: 1 }}>Es intuitivo para los usuarios, ya que cuenta con una interfaz fácil de utilizar.</Typography>

            </Grid>

            <Grid item xs={12} sm={6} md={4}>

                <RoomIcon color="primary"/>
                <Typography variant='h6' fontWeight={600} color='#404040' sx={{ mb: 1 }}>Trazado de rutas</Typography>
                <Typography fontWeight={500} color='#404040' sx={{ mb: 1 }}>Marcar rutas en las unidades para facilitar a los conductores su destino.</Typography>

            </Grid>

            <Grid item xs={12} sm={6} md={4}>

                <LanguageIcon color="primary"/>
                <Typography variant='h6' fontWeight={600} color='#404040' sx={{ mb: 1 }}>Geocercas</Typography>
                <Typography fontWeight={500} color='#404040' sx={{ mb: 1 }}>Crear geocercas que permiten saber cuando una unidad sale o entra de un área en específico.</Typography>

            </Grid>
        </Grid>
    </>
  )
}
