import { Box, Divider, Typography, Container } from '@mui/material'
import { MainLayout } from '../components/layouts';


const Custom404 = () => {
  return (
    <MainLayout title='Página no encontrada' pageDescription='No hay nada que mostrar aqui'>

    
        <Container maxWidth="lg">
            <Box 
                display='flex' 
                justifyContent='center' 
                alignItems='center' 
                minHeight='calc(100vh - 200px)'
                sx={{ flexDirection: { xs: 'column', sm: 'row'}, }}
            >
                <Typography color='primary' variant='h1' component='h1' fontSize={90} fontWeight={400}>404 |</Typography>
                <Typography marginLeft={ 2 } color='text.secondary' >La página no se encuentra o fue removida de www.segycom.mx</Typography>
            </Box>
        </Container>
    </MainLayout>
  )
}

export default Custom404