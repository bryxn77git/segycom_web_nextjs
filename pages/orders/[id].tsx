import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next'

import { Link, Box, Card, CardContent, Divider, Grid, Typography, Chip, Container } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import { useMediaQuery, useTheme } from "@mui/material";

import { CartList, OrderSummary } from '../../components/cotizacion';
import { getSession } from 'next-auth/react';
import { IOrder } from '../../interfaces/order';
import { dbOrders } from '../../database';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import ErrorIcon from '@mui/icons-material/Error';
import { MainLayout } from '../../components/layouts';
import * as cookie from 'cookie'
import jwt from 'jsonwebtoken';
import * as jose from 'jose';

//19
interface Props {
    order: IOrder;
}
//19
const OrderPage: NextPage<Props> = ({ order }) => {

    const { shippingAddress } = order;
    const theme = useTheme();
    const subTitleSize = useMediaQuery(theme.breakpoints.up('sm')) ? 'h6' : 'subtitle2';

    const statusChip = ( status: string ) => {

        switch (status) {
            case 'pendiente':
                return (
                    <Chip 
                        sx={{ my: 2 }}
                        label="Cotización pendiente"
                        variant='outlined'
                        color="error"
                        icon={ <ErrorIcon /> }
                    />
                )
            case 'en proceso':
                return (
                    <Chip 
                        sx={{ my: 2 }}
                        label="Cotización en proseso"
                        variant='outlined'
                        color="warning"
                        icon={ <PendingIcon /> }
                    />
                )
            case 'finalizado':
                return (
                    <Chip 
                        sx={{ my: 2 }}
                        label="Cotización finalizada"
                        variant='outlined'
                        color="success"
                        icon={ <CheckCircleIcon /> }
                    />
                )
        
            default:
                return (<></>);
        }
    }

    
  return (
    <MainLayout title={`Resumen de la cotización ${order._id}`} pageDescription={'Resumen de la cotización'} >


            <Container maxWidth='xl' >
                <Grid minHeight='calc(100vh - 200px)' sx={{ mb: 3 }} >
                    <Grid container sx={{ bgcolor:'#F7F7F7', py: 5, px: { xs: 1, md: 3 } }} >
                        <Grid item xs={12} sx={{ mb: 4 }}>
                            <Typography variant='h5' component='h5' color='#666666' fontWeight={600} >Cotización: { order._id }</Typography>
                            {
                                statusChip(order.status) 
                            }
                        </Grid>

                        <Grid item xs={12} md={9} sx={{ mb: { xs: 3, md: 0 }}} className='fadeIn'>
                            {/* CartList */}
                            <CartList products={ order.orderItems }/>
                        </Grid>

                        <Grid item xs={12} md={3}>
                                
                            <Card elevation={0}>
                                <CardContent>
                                    <Typography variant='subtitle1' color='#666666' fontWeight={700}>RESUMEN</Typography>
                                   
                                    <Divider sx={{ my:1 }} />

                                    <Box display='flex' justifyContent='space-between'>
                                        <Typography color='text.secondary' fontWeight={600} variant='body1' >Información del cliente</Typography>
                                    </Box>

                                    
                                    <Typography color='text.secondary' fontWeight={500} variant='body2'>{ shippingAddress.name } { shippingAddress.lastname }</Typography>
                                    <Typography color='text.secondary' fontWeight={500} variant='body2'>{ shippingAddress.address }</Typography>
                                    <Typography color='text.secondary' fontWeight={500} variant='body2'>{ shippingAddress.city }, { shippingAddress.zip }</Typography>
                                    <Typography color='text.secondary' fontWeight={500} variant='body2'>{ shippingAddress.state }</Typography>
                                    <Typography color='text.secondary' fontWeight={500} variant='body2'>{ shippingAddress.phone }</Typography>
                                    <Typography color='text.secondary' fontWeight={500} variant='body2'>{ shippingAddress.company }</Typography>
                                    <Typography color='text.secondary' fontWeight={500} variant='body2'>{ shippingAddress.commnets }</Typography>

                                    <Divider sx={{ mt: 2, mb: 1 }} />

                                    <Box display='flex' justifyContent='space-between' sx={{ mb: 0.5 }}>
                                        <Typography color='text.secondary' fontWeight={600} variant='body1'>Productos</Typography>
                                    </Box>

                                    <OrderSummary orderValues={{
                                        numberOfItems: order.numberOfItems,
                                        subTotal: order.subTotal,
                                        total: order.total,
                                        tax: order.tax,
                                    }}/>

                                    {/* <Divider sx={{ mt: 2, mb: 0 }} /> */}
                                    

                                </CardContent>
                            </Card>
                            
                        </Grid>

                    </Grid>
                </Grid>

            </Container>

        </MainLayout>
  )
}


//19
export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const { id = '' } = query;

    const session:any = await getSession({ req });

    // if( req.headers.cookie ){
    //     const parsedCookies = cookie.parse(req.headers.cookie);
    //     try {
    //       await jose.jwtVerify(parsedCookies.token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));
    //       const decoded = jwt.decode(parsedCookies.token) as { _id: string };
    //       session = decoded._id;
    //     } catch (error) {
          
    //       console.log(error)
    //     }
    
    //   }

    if ( !session ) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${ id }`,
                permanent: false,
            }
        }
    }

    const order = await dbOrders.getOrderById( id.toString() );

    if ( !order ) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            }
        }
    }

    if ( order.user !== session.user._id ) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false,
            }
        }
    }


    return {
        props: {
            order
        }
    }
}

export default OrderPage;