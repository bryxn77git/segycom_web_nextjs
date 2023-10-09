import { MainLayout } from "../../components/layouts"
import { Grid, Box, Container } from '@mui/material';
import { useMediaQuery, useTheme } from "@mui/material";
import { FormContact, InfoCompany } from "../../components/ui";

const Contacto = () => {

    const theme = useTheme();
    const direccionSize = useMediaQuery(theme.breakpoints.up('md')) ? 'row' : 'column';

  return (

    <MainLayout title={"Contacto"} pageDescription={"Formulario de contacto con la empresa Segycom de Chihuahua"}>
        
        <Container maxWidth="xl">

        <Grid container justifyContent='center' className='main-grid' sx={{ backgroundColor: '#F7F7F7', my: 3}}>

            <Grid
                container
                sx={{ pt: {xs: 1} }} 
                display='flex' 
                justifyContent='center'
                // className="home-grid"
                // minHeight='100vh'
            >

                <Grid item xs={12} >

                    

                    <Grid container spacing={2} direction={direccionSize}>
                        <Grid item xs={12} md={6} >
                            <FormContact />
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <InfoCompany />
                        </Grid>

                    </Grid>
                </Grid>


            </Grid>
        </Grid>
                    
        </Container>

    </MainLayout>

  )
}

export default Contacto