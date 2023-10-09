import { useState, useEffect } from 'react';
import useSWR from 'swr';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { AdminLayout } from '../../components/layouts'
import { Grid, Typography, Box, Backdrop, CircularProgress } from '@mui/material';
import { DashboardSummaryResponse } from '../../interfaces';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { SummaryTile } from '../../components/admin';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


const DashboardPage = () => {

    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000 // 30 segundos
    });

    const [refreshIn, setRefreshIn] = useState(30);

    useEffect(() => {
      const interval = setInterval(()=>{
        // console.log('Tick');
        setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn - 1: 30 );
      }, 1000 );

      return () => clearInterval(interval)
    }, []); 

    if ( !error && !data ) {
         return <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
                open={true}
                // onClick={handleClose}
            >
                <CircularProgress />
            </Backdrop>
         </>
    }

    if ( error ){
        return (
            <Backdrop
            sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
            open={true}
            // onClick={handleClose}
        >
            <CircularProgress />
        </Backdrop>
        )
    }


    const {
        numeroOrdenes,     
        ordenesPendientes, 
        ordenesEnProceso,  
        ordenesFinalizadas,
        clientes,                   
        numeroVisitas,     
    } = data!;

  return (
    <AdminLayout
        title='Dashboard'
        subTitle='Estadisticas generales'
        icon={ <DashboardIcon /> }
    >


         {/* <Grid item xs={12} display='flex'>
            <Typography color='text.secondary'>Actualización en: {refreshIn} </Typography>
            <Box flex={ 1 }/>
            <Typography color='text.secondary'>Numero de visitas: { numeroVisitas[0].numero } </Typography>

        </Grid> */}
        
        <Box minHeight='calc(100vh - 400px)' sx={{ mt: 3 }}>
            
        
        <Grid container spacing={2} item xs={12}>
            
            <SummaryTile 
                title={ numeroOrdenes }
                subTitle="Cotizaciónes totales"
                icon={ <ReceiptLongIcon color="primary" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ ordenesPendientes }
                subTitle="Cotizaciónes pendientes"
                icon={ <ErrorIcon color="error" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ ordenesEnProceso }
                subTitle="Cotizaciónes en proceso"
                icon={ <PendingIcon color="warning" sx={{ fontSize: 40 }} /> }
            />
            
            <SummaryTile
                title={ ordenesFinalizadas }
                subTitle="Cotizaciónes finalizadas"
                icon={ <CheckCircleIcon color="success" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile
                title={ clientes }
                subTitle="Clientes"
                icon={ <PeopleAltIcon color="primary" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile
                title={ numeroVisitas[0].numero }
                subTitle="Visitas"
                icon={ <VisibilityIcon color="primary" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile

                title={ refreshIn }
                subTitle="Actualización en:"
                icon={ <AccessTimeIcon color="primary" sx={{ fontSize: 40 }} /> }
            />



        </Grid>

        </Box>
    </AdminLayout>
  )
}

export default DashboardPage