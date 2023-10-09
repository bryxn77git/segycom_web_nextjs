import NextLink from "next/link"
import { Box, Button, Card, CardMedia, Grid, Link, Typography, Container } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export const Footer = () => {
  return (
      
    <Box sx={{ height: { xs: 'auto', md: 280}, backgroundColor: '#404040', alignItems: 'center', display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
      <Container maxWidth="lg" disableGutters>
        <Grid container sx={{ mt: { xs: 3, md: 0 }, mb: { xs: 3, md: 0 } }} spacing={1}>
          <Grid item xs={ 12 } sm={ 6 } md={ 3 } display='flex' justifyContent='center'>
            <NextLink href='/' passHref>
              <Link>
                <CardMedia
                  component='img'
                  image='/assets/home/logo-footer.webp'
                  alt='Logo next store'
                  sx={{ width: 200, p: 0 }}
                />
              </Link>
            </NextLink>
          </Grid>

          <Grid container item xs={ 12 } sm={ 6 } md={ 3 } spacing={1} >
            <Grid item xs={12} sx={{ mb: { xs: 3, md: 0 } }}>  
              <Typography variant='subtitle1' color='white'>Contacto:</Typography>
              <Typography variant='subtitle2' color='white'>(614) 169 0211 - (614) 130 1139</Typography>
              <Typography variant='subtitle2' color='white'>ernesto.gomez@segycom.com.mx</Typography>  
              <Typography variant='subtitle2' color='white'>macario.gomez@segycom.com.mx</Typography>  
            </Grid>
            <Grid item xs={12} sx={{ mb: { xs: 3, md: 0 } }}>
              {/* TODO OnClick para llevar a cada pagina */}
              <NextLink href='/documentos/privacidad' passHref>
                <Link>
                  <Typography variant='subtitle1' color='white'>Políticas de privacidad</Typography>
                </Link>
              </NextLink>
              <NextLink href='/documentos/terminos' passHref>
                <Link>
                  <Typography variant='subtitle1' color='white'>Términos y condiciones</Typography>
                </Link>
              </NextLink>

            </Grid>
          </Grid>

          <Grid container item xs={ 12 } sm={ 6 } md={ 3 } spacing={1}>
            <Grid item xs={12} sx={{ mb: { xs: 3, md: 0 } }}>
              <Typography variant='subtitle1' color='white'>Horario:</Typography>
              <Typography variant='subtitle2' color='white'>Lunes a Viernes de 9 a 18hrs</Typography>
              <Typography variant='subtitle2' color='white'>Sábados a 9 a 12hrs</Typography>  
            </Grid>
            <Grid item xs={12} sx={{ mb: { xs: 3, md: 0 } }}>
              <Typography variant='subtitle1' color='white'>Ubicación:</Typography>
              <Typography variant='subtitle2' color='white'>C. Francisco Pimentel 6502, Lagos,</Typography>
              <Typography variant='subtitle2' color='white'> 31100 Chihuahua, Chih.</Typography>
            </Grid>
          </Grid>

          <Grid container item xs={ 12 } sm={ 6 } md={ 3 } alignItems='center'>
            <Grid item xs={12} >
                {/* TODO asignar url a cada boton */}
                <Typography variant='subtitle1' color='white'>Encuentranos en:</Typography>
                
                <a href='https://api.whatsapp.com/send?phone=5216141690211' target='_blank' rel="noreferrer" style={{ textDecoration: 'none'}}>
                  <Button  sx={{ color: 'white'}} startIcon={<WhatsAppIcon />}>
                      Whatsapp
                  </Button><br />
                </a>
                <a href='https://www.facebook.com/Segycom/' target='_blank' rel="noreferrer" style={{ textDecoration: 'none'}}>
                  <Button sx={{ color: 'white'}} startIcon={<FacebookIcon />}>
                    Facebook
                  </Button><br />
                </a>
                <a href='https://www.instagram.com/segycom_/' target='_blank' rel="noreferrer" style={{ textDecoration: 'none'}}>
                  <Button  sx={{ color: 'white'}} startIcon={<InstagramIcon />}>
                    Instagram
                  </Button>
                </a>
    
            </Grid>
          </Grid>

        </Grid>
      </Container>
    </Box>
  )
}
