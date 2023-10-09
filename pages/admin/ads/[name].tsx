
import { ChangeEvent, FC, useRef, useState } from 'react';
import { GetServerSideProps } from 'next'
import { AdminLayout } from '../../../components/layouts'
import { IImages } from '../../../interfaces';
import { DriveFileRenameOutline, SaveOutlined, Upload } from '@mui/icons-material';
import { dbAds } from '../../../database';
import { Box, Button, Card, CardActions, CardMedia, Chip, Grid, TextField, Backdrop, CircularProgress, Alert, Snackbar, FormLabel } from '@mui/material';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';

import { Image } from '../../../models';
import { segycomWebApi } from '../../../api';



interface FormData {
    _id?  : string;
    name  : string;
    url   : string;
    link  : string;
}

interface Props {
    ad: IImages;
}

const AdPage:FC<Props> = ({ ad }) => {

    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isSaving, setIsSaving] = useState(false);
    const [openAlert, setOpenAlert] = useState(false)    

    const { register, handleSubmit, formState:{errors}, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: ad
    })

    const onFileSelected = async( { target }: ChangeEvent<HTMLInputElement> ) => {

        if( !target.files || target.isDefaultNamespace.length === 0 ){
            return;
        }

        try {

            // console.log(target.files[0])
            // for( const file of target.files ) {
            const formData = new FormData();
            formData.append('file', target.files[0]);
            const { data } = await segycomWebApi.post<{ message: string, public_id: string }>('/admin/upload', formData);

            setValue('url', data.message , { shouldValidate: true })
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
                'url',
                '',
                { shouldValidate: true }
            )
            fileInputRef.current!.value = ''
           
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async( form: FormData ) => {

        form.name = form.name.toLowerCase()
        
        if( !form.url ) return alert('Mínimo una imagen para la publicidad');
        
        setIsSaving(true);
        
        
        try {
            const resp = await segycomWebApi({
                url: '/admin/ads',
                method: form._id ? 'PUT' : 'POST',
                data: form
            })

            if( !form._id ){
                setIsSaving(false);
                setOpenAlert(true);
                router.replace(`/admin/ads`);
            }else {
                // router.push(`/admin/products`);
                setIsSaving(false);
                setOpenAlert(true);
                router.replace(`/admin/ads`);
            }
        } catch (error) {
            console.log(error);
            setIsSaving(false);
            
        }
    }

    return (
        <>
        <AdminLayout 
            title={'Publicidad'} 
            subTitle={ ad.name !== undefined ? `Editando: ${ ad.name }`: 'Nueva publicidad'}
            icon={<DriveFileRenameOutline />}
        >
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        variant='contained'
                        startIcon={ ad._id ? <SaveOutlined /> : <AddIcon /> }
                        sx={{ width: '150px' }}
                        type="submit"
                    >
                        {
                            ad._id ? 'Guardar' : 'Crear'
                        }
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Nombre"
                            variant="outlined"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('name', {
                                required: true,
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.name }
                            helperText={ errors.name?.message }
                        />
                        <TextField
                            label="Url"
                            variant="outlined"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('link', {
                                required: true,
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.link }
                            helperText={ errors.link?.message }
                        />

                      

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }> 

                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Imágen de publicidad</FormLabel>
                            <Button
                                variant='contained'
                                fullWidth
                                disabled={ !!getValues('url') }
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
                                label="Es necesario 1 imagen de publicidad"
                                color='error'
                                variant='filled'
                                sx={{ display: !getValues('url') ? 'flex': 'none' }}
                            />

                            <Grid container spacing={2}>
                                {
                                   getValues('url') && (

                                    <Grid item xs={4} sm={3}>
                                        <Card>
                                            <CardMedia 
                                                component='img'
                                                className='fadeIn'
                                                image={ getValues('url') }
                                                alt={ getValues('url') }
                                            />
                                            <CardActions>
                                                <Button 
                                                    fullWidth 
                                                    color="error"
                                                    variant='contained'
                                                    onClick={ () => onDeleteImage( getValues('url') ) }
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
                { ad._id ? 'La publicidad se guardó correctamente!' : 'La publicidad se creó correctamente!'}
            </Alert>
        </Snackbar>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isSaving}
        >
            <CircularProgress />
        </Backdrop>
        </>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    
    const { name = '' } = query;

    let ad: IImages | null; 

    if( name === 'new' ){
        const tempAd = JSON.parse( JSON.stringify( new Image() ));
        delete tempAd._id;
        ad = tempAd;
    } else {
        ad = await dbAds.getAdByName(name.toString()); 
    } 


    if ( !ad ) {
        return {
            redirect: {
                destination: '/admin/ads',
                permanent: false,
            }
        }
    }

    return {
        props: {
            ad
        }
    }
}


export default AdPage