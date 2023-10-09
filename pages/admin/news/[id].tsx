import { GetServerSideProps, NextPage } from 'next';
import moment from 'moment';

import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { Box, Card, CardContent, Divider, Grid, Typography, Chip, FormControl, InputLabel, Select, MenuItem, OutlinedInput, Container, IconButton, Button, TextField, FormLabel, CardMedia, CardActions, Snackbar, Alert, Backdrop, CircularProgress } from '@mui/material';
import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditScoreOutlined, SaveOutlined, Upload } from '@mui/icons-material';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { CartList, OrderSummary } from '../../../components/cotizacion';

import { dbNoticias, dbOrders } from '../../../database';
import { INoticias } from '../../../interfaces';
import { AdminLayout } from '../../../components/layouts';
import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { segycomWebApi } from '../../../api';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import NewspaperIcon from '@mui/icons-material/Newspaper';

import { currency } from '../../../utils';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';

import { LocalizationProvider, DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { Noticia } from '../../../models';
 
interface FormData {
    _id?    : string;
    slug    : string;
    date    : string;
    title   : string;
    details : string;
    img     : string;
}

interface Props {
    news: INoticias;
}

const OrderPage: NextPage<Props> = ({ news }) => {
    
    // console.log(news.date)
 
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isSaving, setIsSaving] = useState(false);
    const [openAlert, setOpenAlert] = useState(false)   
    const [fecha, setfecha] = useState( news.date ? moment(news.date) : null ) 

    // console.log(fecha)

    const { register, handleSubmit, formState:{errors}, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: news
    })    

    useEffect(() => {
        const subscription = watch(( value, { name, type } ) => {
            if ( name === 'title' ) {
                const newSlug = value.title?.trim()
                        .replaceAll(' ', '_')
                        .replaceAll("'", '')
                        .toLocaleLowerCase() || '';

                    setValue('slug', newSlug);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, setValue])

    const handleDateChange: DatePickerProps<FormData['date']>['onChange'] = (date: any, event) => {
        // Update the form value
        if( date ){
            const newdate = date.format('YYYY-MM-DDTHH:mm:ss.SSSZ')

            setfecha(date)
            setValue('date', newdate);
        }


        
    };

    const onFileSelected = async( { target }: ChangeEvent<HTMLInputElement> ) => {

        if( !target.files || target.isDefaultNamespace.length === 0 ){
            return;
        }

        try {

            // for( const file of target.files ) {
            const formData = new FormData();
            formData.append('file', target.files[0]);
            const { data } = await segycomWebApi.post<{ message: string, public_id: string }>('/admin/upload', formData);

            setValue('img', data.message , { shouldValidate: true })
            // }

            
            
        } catch (error) {
            console.log({error})
            
        }
    }

    const onDeleteImage = async( image: string ) => {
        try {
            await segycomWebApi({
                url: '/admin/delete',
                method: 'DELETE',
                data: image
            })
            setValue(
                'img',
                '',
                { shouldValidate: true }
            )
            fileInputRef.current!.value = ''
           
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async( form: FormData ) => {

        // form.title = form.title.toLowerCase()
        
        if( !form.img ) return alert('Mínimo una imagen para la publicidad');

        setIsSaving(true);

        try {
            const resp = await segycomWebApi({
                url: '/admin/news',
                method: form._id ? 'PUT' : 'POST',
                data: form
            })

            if( !form._id ){
                setIsSaving(false);
                setOpenAlert(true);
                router.replace(`/admin/news`);
            }else {
                // router.push(`/admin/products`);
                setIsSaving(false);
                setOpenAlert(true);
                router.replace(`/admin/news`);
            }
        } catch (error) {
            console.log(error);
            setIsSaving(false);
            
        }
    }
   


  return (
    <>
    <AdminLayout 
        title={`Noticia` }
        subTitle={ news.title !== undefined ? `Editando: ${ news.title }`: 'Nueva noticia'}
        icon={ <NewspaperIcon /> }
    >

        <form onSubmit={ handleSubmit( onSubmit ) }>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        variant='contained'
                        startIcon={ news._id ? <SaveOutlined /> : <AddIcon /> }
                        sx={{ width: '150px' }}
                        type="submit"
                    >
                        {
                            news._id ? 'Guardar' : 'Crear'
                        }
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Titulo"
                            variant="outlined"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('title', {
                                required: true,
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.title }
                            helperText={ errors.title?.message }
                        />

                        <TextField
                            label="Descripción"
                             variant="outlined"
                            fullWidth 
                            multiline
                            rows={6}
                            sx={{ mb: 1 }}
                            { ...register('details', {
                                required: true,
                            })}
                            error={ !!errors.details }
                            helperText={ errors.details?.message }
                            />

                        <TextField
                            label="Slug - URL"
                            variant="outlined"
                            fullWidth 
                            // value={getValues('slug')}
                            sx={{ mb: 1 }}
                            { ...register('slug', {
                                required: true,
                                validate: (val) => val.trim().includes(' ') ? 'No puede tener espacios en blanco':undefined
                            })}
                            error={ !!errors.slug }
                            helperText={ errors.slug?.message }
                        />       


                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }> 
                        <LocalizationProvider dateAdapter={AdapterMoment} locale="es" >
                            
                            <DatePicker 
                                // defaultValue={fecha}
                                value={fecha as any}
                                // { ...register('date', {
                                //     required: true,
                                // })}
                                onChange={handleDateChange}
                            />
                           
                        </LocalizationProvider>   

                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Imagen de la noticia</FormLabel>
                            <Button
                                variant='contained'
                                fullWidth
                                disabled={ !!getValues('img') }
                                startIcon={ <Upload /> }
                                sx={{ mb: 3 }}
                                onClick={ () => fileInputRef.current?.click() }
                            >
                                Cargar imagen
                            </Button>
                            <input 
                                ref={ fileInputRef }
                                type='file'
                                // multiple
                                accept='image/png image/gif image/jpeg image/webp image/jpg'
                                style={{ display: 'none'}}
                                onChange={ onFileSelected }
                            />

                            <Chip 
                                label="Es necesario 1 imagen para la noticia"
                                color='error'
                                variant='filled'
                                sx={{ display: !getValues('img') ? 'flex': 'none' }}
                            />

                            <Grid container spacing={2}>
                                {
                                   getValues('img') && (
                                       
                                       <Grid item xs={4} sm={3}>
                                        <Card>
                                            <CardMedia 
                                                component='img'
                                                className='fadeIn'
                                                image={ getValues('img') }
                                                alt={ getValues('img') }
                                            />
                                            <CardActions>
                                                <Button 
                                                    fullWidth 
                                                    color="error"
                                                    variant='contained'
                                                    onClick={ () => onDeleteImage( getValues('img') ) }
                                                >
                                                    Borrar
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    )
                                }
                                
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>     

    </AdminLayout>
    <Snackbar open={openAlert} onClose={() => setOpenAlert(false)} autoHideDuration={6000} sx={{ pt: { xs: 13, sm: 16 }}} anchorOrigin={{ vertical: 'top', horizontal: 'right'}} >
        <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: '100%' }}>
            { news._id ? 'La noticia se guardó correctamente!' : 'La noticia se creó correctamente!'}
        </Alert>
    </Snackbar>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
        open={isSaving}
    >
        <CircularProgress />
    </Backdrop>
    </>
  )
}


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const { id = '' } = query;
    let news: INoticias | null;
    
    if( id === 'new' ){
        const tempNews = JSON.parse( JSON.stringify( new Noticia() ));
        delete tempNews._id;
        news = tempNews;
    } else {
        news = await dbNoticias.getNewsById( id.toString() );
    } 

    if ( !news ) {
        return {
            redirect: {
                destination: '/admin/news',
                permanent: false,
            }
        }
    }


    return {
        props: {
            news
        }
    }
}


export default OrderPage;