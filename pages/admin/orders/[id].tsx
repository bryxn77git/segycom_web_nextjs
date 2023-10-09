import { GetServerSideProps, NextPage } from 'next';

import { Box, Card, CardContent, Divider, Grid, Typography, Chip, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Container, IconButton } from '@mui/material';
import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { CartList, OrderSummary } from '../../../components/cotizacion';

import { dbOrders } from '../../../database';
import { ICategorias, IOrder } from '../../../interfaces';
import { AdminLayout } from '../../../components/layouts';
import { useState, useEffect } from 'react';
import { segycomWebApi } from '../../../api';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

import { currency } from '../../../utils';



interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {


    const { shippingAddress } = order;
    const [ orderState, setOrderState ] = useState<string>('');

    useEffect(() => {
        if (order.status) {
            setOrderState(order.status);
        }
      }, [order])

    const statusChip = ( status: string ) => {

        switch (status) {
            case 'pendiente':
                return (
                    <Chip 
                        sx={{ mt: 1 }}
                        label="Cotización pendiente"
                        variant='outlined'
                        color="error"
                        icon={ <ErrorIcon /> }
                    />
                )
            case 'en proceso':
                return (
                    <Chip 
                        sx={{ mt: 1 }}
                        label="Cotización en proseso"
                        variant='outlined'
                        color="warning"
                        icon={ <PendingIcon /> }
                    />
                )
            case 'finalizado':
                return (
                    <Chip 
                        sx={{ mt: 1 }}
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

    const onStateUpdated = async( newStatus: string ) => {

        setOrderState(newStatus);

        try {
            
            await segycomWebApi.put('/admin/orders', {  orderId: order._id , status: newStatus });

        } catch (error) {
            setOrderState( order.status );
            console.log(error);
            alert('No se pudo actualizar el estatus de la cotización');
        }

    }

    // async function generatePdfFromHtml(html: any) {
    //     // Create a new PDFDocument
    //     const pdfDoc = await PDFDocument.create();
      
    //     // Add a page to the PDF document
    //     const page = pdfDoc.addPage();
      
    //     // Embed the StandardFonts Helvetica and Times Roman
    //     const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    //     const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      
    //     // Set the font and font size
    //     const fontSize = 12;
    //     page.setFont(helveticaFont);
    //     page.setFontSize(fontSize);
      
    //     // Set the line height
    //     const lineHeight = fontSize * 1.2;
      
    //     // Set the x and y position of the text
    //     let x = 50;
    //     let y = page.getHeight() - 50;
      
    //     // Split the HTML into lines
    //     const lines = html.split('\n');
      
    //     // Iterate over the lines and add them to the PDF
    //     for (const line of lines) {
    //       // Check if the line fits on the current page
    //       const textWidth = helveticaFont.widthOfTextAtSize(line, fontSize);
    //       if (y < 50 + lineHeight) {
    //         // Add a new page to the PDF document if there is not enough space for the text
    //         let page = pdfDoc.addPage();
    //         y = page.getHeight() - 50;
    //       }
      
    //       // Add the text to the PDF page
    //       page.drawText(line, { x, y, font: helveticaFont, size: fontSize, color: rgb(0, 0, 0) });
    //       y -= lineHeight;
    //     }
      
    //     // Save the PDF document to a Uint8Array buffer
    //     const pdfBytes = await pdfDoc.save();
      
    //     // Convert the Uint8Array buffer to a Buffer and return it
    //     return Buffer.from(pdfBytes);
    //   }

    // const generatePDF = async() => {
    //    // Get the HTML element that you want to convert to PDF
    //     const element =`<!DOCTYPE html>
    //     <html>
    //     <head>
    //         <meta charset="UTF-8">
    //         <title>Cotización</title>
    //         <style>
    //             body {
    //                 font-family: Arial, sans-serif;
    //                 margin: 0;
    //                 padding: 0;
    //             }
    //             table {
    //                 border-collapse: collapse;
    //                 margin: 20px 0;
    //                 width: 100%;
    //             }
    //             th, td {
    //                 padding: 10px;
    //                 text-align: left;
    //                 border: 1px solid #ccc;
    //             }
    //             th {
    //                 background-color: #f2f2f2;
    //             }
    //             img {
    //                 max-width: 100%;
    //                 height: auto;
    //             }
    //         </style>
    //     </head>
    //     <body>
    //         <h1>Cotización</h1>
            
    //         <h2>Datos del cliente</h2>
    //         <table>
    //             <tr>
    //                 <th>Nombre completo:</th>
    //                 <td>${ order.shippingAddress.name } ${ order.shippingAddress.lastname }</td>
    //             </tr>
    //             <tr>
    //                 <th>Dirección:</th>
    //                 <td>${ order.shippingAddress.address } - ${ order.shippingAddress.zip }</td>
    //             </tr>
    //             <tr>
    //                 <th>Estado:</th>
    //                 <td>${ order.shippingAddress.state }</td>
    //             </tr>
    //             <tr>
    //                 <th>Ciudad:</th>
    //                 <td>${ order.shippingAddress.city }</td>
    //             </tr>
    //         </table>
            
    //         <h2>Productos</h2>
    //         <table>
    //             <tr>
    //                 <th>Imagen</th>
    //                 <th>Modelo</th>
    //                 <th>Marca</th>
    //                 <th>Cantidad</th>
    //                 <th>Precio unitario</th>
    //             </tr>
    //             ${ order.orderItems.map( product => (
    //                 `<tr>
    //                     <td><img src="${ product.img_portada }" alt="Imagen del producto"></td>
    //                     <td>${ product.modelo }</td>
    //                     <td>${ product.marca }</td>
    //                     <td>${ product.quantity }</td>
    //                     <td>${ currency.format(Number(product.precio)) }</td>
    //                  </tr>`  
    //             )) }
    //             <!-- Agregar más filas si se requiere -->
    //         </table>
            
    //         <h2>Resumen del costo</h2>
    //         <table>
    //             <tr>
    //                 <th>Subtotal:</th>
    //                 <td>${ currency.format(order.subTotal) }</td>
    //             </tr>
    //             <tr>
    //                 <th>IVA 16%:</th>
    //                 <td>${ currency.format(order.tax) }</td>
    //             </tr>
    //             <tr>
    //                 <th>Total:</th>
    //                 <td>${ currency.format(order.total) }</td>
    //             </tr>
    //         </table>
    //     </body>
    //     </html>`;

    //     const pdfBuffer = await generatePdfFromHtml(element);

    //     fs.writeFileSync('my-pdf.pdf', pdfBuffer);  
       
    // }


  return (
    <AdminLayout 
        title='Resumen de la cotización' 
        subTitle={ `Cotización Id: ${ order._id }`}
        icon={ <AirplaneTicketOutlined /> }
    >

         <Grid container className='fadeIn' id='pdfHtml' sx={{ mt: 0, minHeight:'calc(100vh - 370px)' }}>


            <Grid item xs={12} >
                    <Grid item xs={12} sx={{ mb: 0 }}>
                        {
                            statusChip(orderState)    
                        }
                    </Grid>
                </Grid>


                <Grid item xs={12} md={9} sx={{ mb: { xs: 3, md: 0 }}} className='fadeIn'>
                    {/* CartList */}
                    <CartList products={ order.orderItems }/>
                </Grid>

                <Grid item xs={12} md={3}>
                        
                    <Card elevation={0}>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={8} display='flex' alignItems='center'>
                                    <Typography variant='subtitle1' color='#666666' fontWeight={700}>RESUMEN</Typography>
                                </Grid>
                                {/* <Grid item xs={4} justifyContent='flex-end' display='flex'>
                                    <IconButton onClick={ generatePDF } color='secondary'>
                                        <PictureAsPdfIcon />
                                    </IconButton>
                                </Grid> */}
                            </Grid>

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

                            <Divider sx={{ mt: 2, mb: 0 }} />

                            <Box sx={{ mt: 3 }} display="flex" flexDirection='column'>
                            {/* TODO actualizar el estatus de la Cotización con el select */}

                                <FormControl>
                                    <InputLabel id="demo-multiple-name-label">Estatus</InputLabel>
                                    <Select
                                        value={orderState}
                                        onChange={ ({ target }) => onStateUpdated( target.value ) }
                                        input={<OutlinedInput label="Name" />}
                                        // MenuProps={MenuProps}
                                    >
                                    
                                    <MenuItem value={'pendiente'}>Pendiente</MenuItem>
                                    <MenuItem value={'en proceso'}>En proseso</MenuItem>
                                    <MenuItem value={'finalizado'}>Finalizado</MenuItem>
                            
                                    </Select>
                                </FormControl>


                            </Box>

                        </CardContent>
                    </Card>
                    
                </Grid> 
        </Grid>

    </AdminLayout>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const { id = '' } = query;
    const order = await dbOrders.getOrderById( id.toString() );

    if ( !order ) {
        return {
            redirect: {
                destination: '/admin/orders',
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