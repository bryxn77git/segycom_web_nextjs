
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import { Box, Link, Typography } from "@mui/material"
import { MainLayout } from "../../components/layouts"
import { LinkButton } from '../../components/ui'


const EmptyPage = () => {
  return (
    <MainLayout title='Cotización vacia' pageDescription={'No hay articulos en la cotización'} >
    

        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100vh - 200px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row'}, }}
        >
            <RequestQuoteOutlinedIcon sx={{ fontSize: 100 }} color='primary' />
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Typography color='text.secondary' fontWeight={500}>Su cotización esta vacia</Typography>
                
                    <LinkButton href={'/'} title={'Regresar'} size={25} />

            </Box>
        </Box>
    </MainLayout>

  )
}

export default EmptyPage