import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid, Backdrop, CircularProgress, Tooltip, Link } from '@mui/material';

import { DataGrid, esES, GridColDef, GridRenderCellParams, GridToolbar, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';

import { AdminLayout } from '../../components/layouts'
import { IOrder, IUser } from '../../interfaces';

import { spanishLocaleText } from '../../utils/spanishText';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { dbOrders } from '../../database';
import NextLiknk from 'next/link';


const columns:GridColDef[] = [
    {
        field: 'id',
        width: 250,
        headerName: 'Cotización ID',
        renderCell: ({ row }: GridRenderCellParams) => {
            return (
                <NextLiknk href={`/admin/orders/${ row.id }`}>
                    <Tooltip title='Modificar usuario' placement="top" arrow>
                        <Link underline='always' sx={{ cursor: 'pointer'}}>
                        { row.id }
                        </Link>
                    </Tooltip>
                </NextLiknk>
            )
            // return (
            //     <a href={ `/admin/orders/${ row.id }` } target="_blank" rel="noreferrer" className='orderView' >
            //         { row.id }
            //     </a>
            // )
        }
    },
    // { field: 'id', headerName: 'Cotización ID', width: 250 },
    { field: 'email', headerName: 'Correo', width: 250 },
    { field: 'name', headerName: 'Nombre Completo', width: 250 },
    {
        field: 'status',
        headerName: 'Estatus',
        width: 150,
        renderCell: ({ row }: GridRenderCellParams) => {
            switch ( row.status ) {
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
    { field: 'noProducts', headerName: 'No.Productos', align: 'center', width: 150 },
    // {
    //     field: 'check',
    //     width: 150,
    //     headerName: 'Ver cotización',
    //     renderCell: ({ row }: GridRenderCellParams) => {
    //         return (
    //             <a href={ `/admin/orders/${ row.id }` } target="_blank" rel="noreferrer" className='orderView' >
    //                 Ver cotización...
    //             </a>
    //         )
    //     }
    // },
    { field: 'createdAt', headerName: 'Fecha de creación', width: 200 },

];

interface Props {
    orders: IOrder[];
}

const OrdersPage:FC<Props> = ({orders}) => {

    // const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

    // if ( !data && !error ) return (<></>);
    // console.log(data)
    const rows = orders!.map( order => {

        const date = new Date( order.createdAt! );

        let formatDate = `${date.getDate() < 10 ? '0'+date.getDate() : date.getDate() }-${date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth()}-${date.getFullYear()} ${date.getHours() < 10 ? '0'+date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds()}`
        
        return {
            id    : order._id,
            email : (order.user as IUser).email,
            name  : (order.user as IUser).name,
            status: order.status,
            noProducts: order.numberOfItems,
            createdAt: formatDate,

        }
    });


  return (
    <AdminLayout 
        title={'Cotizaciónes'} 
        subTitle={'Mantenimiento de cotizaciónes'}
        icon={ <ReceiptLongIcon /> }
    >
         <Grid container className='fadeIn' sx={{ mt: 3}}>
            <Grid item xs={12} >
                
                <DataGrid 
                    rows={ rows }   
                    columns={ columns } 
                    initialState={{         
                        pagination: { paginationModel: { pageSize: 25 } },
                    }}
                    pageSizeOptions={[25, 50, 100]}
                    slots={{ toolbar: GridToolbar }}
                    localeText={{ ...esES.components.MuiDataGrid.defaultProps.localeText, ...spanishLocaleText }}
                    autoHeight 
                    
                />
                   

            </Grid>
        </Grid>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
            open={!orders}
            // onClick={handleClose}
        >
            <CircularProgress />
        </Backdrop>
        
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const orders = await dbOrders.getOrders();

    return {
        props: {
            orders
        }
    }
}



export default OrdersPage