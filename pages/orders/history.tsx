import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next';

import { Typography, Grid, Chip, Link, Container } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams, GridToolbar, GridValueGetterParams, esES } from '@mui/x-data-grid';

import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import * as cookie from 'cookie'
import jwt from 'jsonwebtoken';
import * as jose from 'jose';
import { MainLayout } from '../../components/layouts';
import { getSession } from 'next-auth/react';
import { spanishLocaleText } from '../../utils/spanishText';



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
    { field: 'quantity', headerName: 'Cantidad', width: 100 },

    {
        field: 'status',
        headerName: 'Estatus',
        description: 'Muestra información del estatus de la cotización',
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            switch ( params.row.status ) {
                case 'pendiente':
                    
                    return ( <Chip variant='outlined' label="Pendiente" color="error" /> )
                case 'en proceso':
                    
                    return ( <Chip variant='outlined' label="En proceso" color="warning" /> )
                case 'finalizado':
                    
                    return ( <Chip variant='outlined' label="Finalizado" color="success" /> )
            
                default:
                    return (<></>);
            }
        }
    },
    {
        field: 'Cotización',
        headerName: 'Ver cotización',
        width: 200,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
               <NextLink href={`/orders/${ params.row.orderId }`} passHref>
                    <Link underline='always'>
                        Ver cotización
                    </Link>
               </NextLink>
            )
        }
    },
    { field: 'date', headerName: 'Fecha de creación', width: 300 },
];

//19
interface Props {
    orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {

    const rows = orders.map( (order, idx) => {
        const date = new Date( order.createdAt! );

        let formatDate = `${date.getDate() < 10 ? '0'+date.getDate() : date.getDate() }-${date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth()}-${date.getFullYear()} ${date.getHours() < 10 ? '0'+date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds()}`
        
        return {
            id: order._id,
            status: order.status,
            fullname: `${ order.shippingAddress.name } ${ order.shippingAddress.lastname }`,
            quantity: order.numberOfItems,
            orderId: order._id,
            date: formatDate,

        }
    });

  return (
    <MainLayout title={'Historial de cotizaciónes'} pageDescription={'Historial de cotizaciónes del cliente'}>

        <Container maxWidth='xl' >
                <Grid minHeight='calc(100vh - 200px)' sx={{ mb: 3 }} >
                    <Grid container sx={{ bgcolor:'#F7F7F7', py: 5, px: { xs: 1, md: 3 } }} >
        
                        <Grid item xs={12} sx={{ mb: 4 }}>
                            {/* <TitleUi title='Historial de cotizaciónes'/> */}
                            <Typography variant='h5' component='h5' color='#666666' fontWeight={600} >Mis cotizaciónes</Typography>
                        </Grid>

                        <Grid container className='fadeIn'>
                            <Grid item xs={12} sx={{ minHeight:'calc(100vh - 250px)', width: '100%' }}>
                                <DataGrid 
                                    rows={ rows }
                                    columns={ columns }
                                    initialState={{         
                                        pagination: { paginationModel: { pageSize: 25 } },
                                    }}
                                    pageSizeOptions={[25, 50, 100]}
                                    localeText={{ ...esES.components.MuiDataGrid.defaultProps.localeText, ...spanishLocaleText }}
                                    slots={{ toolbar: GridToolbar }}
                                />

                            </Grid>
                        </Grid>

                </Grid>
            </Grid>

        </Container>

    </MainLayout>
  )
}

//19
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    
    const session: any = await getSession({ req });

    if( !session ){
        return {
            redirect: {
                destination: '/auth/login?/orders/history',
                permanent: false,
            }
        }
    }

    const orders = await dbOrders.getOrdersByUser( session.user._id );


    return {
        props: {
            orders
        }
    }
}

export default HistoryPage