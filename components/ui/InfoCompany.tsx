import { Grid, Paper, Typography } from "@mui/material"
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';


export const InfoCompany = () => {
  return (
    <Grid sx={{ width: '100%', py: 3 }} >
        <Grid
            container 
            display='flex' 
            alignItems='center' 
            justifyContent='center'
            spacing={ 3 }
        >
            <Grid item xs={2} display='flex' justifyContent='center'> 
                <MailIcon fontSize='large' color='info'/>
            </Grid>

            <Grid item xs={10} >
                <Typography variant='body1' color='text.secondary' fontWeight={600}>Correos electrónicos:</Typography>
                <Typography variant='body2' color='primary' fontWeight={600}>ernesto.gomez@segycom.com.mx</Typography>
                <Typography variant='body2' color='primary' fontWeight={600}>macario.gomez@segycom.com.mx</Typography>
            </Grid>
            
            <Grid item xs={2} display='flex' justifyContent='center'> 
                <CallIcon fontSize='large' color='info'/>
            </Grid>

            <Grid item xs={10} >
                <Typography variant='body1' color='text.secondary' fontWeight={600}>Números de teléfono:</Typography>
                <Typography variant='body2' color='primary' fontWeight={600}>(614) 169 02 11 - (614) 130 11 39</Typography>
                <Typography variant='body2' color='primary' fontWeight={600}></Typography>
            </Grid>

            <Grid item xs={2} display='flex' justifyContent='center'> 
                <LocationOnIcon fontSize='large' color='info'/>
            </Grid>

            <Grid item xs={10} >
                <Typography variant='body1' color='text.secondary' fontWeight={600}>Dirección:</Typography>
                <Typography variant='body2' color='primary' fontWeight={600}>C. Francisco Pimentel 6502, Lagos, 31100, Chihuahua, Chih.</Typography>
            </Grid>


            {/* <Grid item xs={3} display='flex' justifyContent='center'> 
            <AccessTimeFilledIcon fontSize='large' color='info'/>
            </Grid>
            
            <Grid item xs={9} >
            <Typography variant='body1' color='text.secondary' fontWeight={600}>Horario::</Typography>
            <Typography variant='body2' color='primary' fontWeight={600}>Lunes a Viernes - 08:00 a.m. a 05:00 p.m.</Typography>
        </Grid>   */}
        </Grid>
        <Grid sx={{ pr: { xs: 1, md: 5 }, pl: 1, py: 5 }}>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.4802931661275!2d-106.10748448448436!3d28.675275988895073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ea43aa5cc145b7%3A0xcbdb698cdd3fa747!2sSEGYCOM%20de%20Chihuahua%20SA%20de%20CV!5e0!3m2!1sen!2smx!4v1674070271159!5m2!1sen!2smx" width="100%" height="450" style={{ border: 0}} loading="lazy" ></iframe>    

        </Grid>
    </Grid>
  )
}
