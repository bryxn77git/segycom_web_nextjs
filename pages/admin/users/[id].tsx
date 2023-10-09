
import { ChangeEvent, FC, useRef, useState } from 'react';
import { GetServerSideProps } from 'next'
import { AdminLayout } from '../../../components/layouts'
import { IImages, IUser } from '../../../interfaces';
import { DriveFileRenameOutline, SaveOutlined, Upload } from '@mui/icons-material';
import { dbAds, dbUsers } from '../../../database';
import { Box, Button, Card, CardActions, CardMedia, Chip, Grid, TextField, Backdrop, CircularProgress, Alert, Snackbar, FormLabel, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@mui/material';
import { useForm } from 'react-hook-form';

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import { useRouter } from 'next/router';
import AddIcon from '@mui/icons-material/Add';

import { Image, User } from '../../../models';
import { segycomWebApi } from '../../../api';

interface FormData {
    _id?      : string;
    name      : string;
    email     : string;
    role      : string;
    password? : string
}

interface Props {
    user: IUser;
}

const UserPage:FC<Props> = ({ user }) => {

    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [openAlert, setOpenAlert] = useState(false)    
    const [role, setRole] = useState(user.role ? user.role : 'clientA')

    const { register, handleSubmit, formState:{errors}, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: { ...user, password: ''}
    })

    const onSubmit = async( form: FormData ) => {

        // console.log(form)

        form.email = form.email.toLowerCase()
                
        setIsSaving(true);
        
        
        try {
            const resp = await segycomWebApi({
                url: '/admin/users',
                method: form._id ? 'PUT' : 'POST',
                data: form
            })

            if( !form._id ){
                setIsSaving(false);
                setOpenAlert(true);
                router.replace(`/admin/users`);
            }else {
                // router.push(`/admin/products`);
                setIsSaving(false);
                setOpenAlert(true);
                router.replace(`/admin/users`);
            }
        } catch (error) {
            console.log(error);
            setIsSaving(false);
            
        }
    }

    const onStateUpdated = async( newStatus: string ) => {

        setRole( newStatus );
        setValue( 'role', newStatus );

    }

    return (
        <>
        <AdminLayout 
            title={'Usuario'} 
            subTitle={ user.name !== undefined ? `Editando: ${ user.name }`: 'Nuevo usuario'}
            icon={<PeopleAltIcon />}
        >
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        variant='contained'
                        startIcon={ user._id ? <SaveOutlined /> : <AddIcon /> }
                        sx={{ width: '150px' }}
                        type="submit"
                    >
                        {
                            user._id ? 'Guardar' : 'Crear'
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
                            label="Correo"
                            variant="outlined"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('email', {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Correo inválido'
                                  }
                                // minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.email }
                            helperText={ errors.email?.message }
                        />

                      

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }> 

                        <Box display='flex' flexDirection="column" >
                            <FormControl sx={{ mb: 1 }}>
                                <InputLabel id="demo-multiple-name-label">Acceso</InputLabel>
                                <Select
                                    value={role}
                                    onChange={ ({ target }) => onStateUpdated(target.value) }
                                    input={<OutlinedInput label="Acceso" />}
                                    // MenuProps={MenuProps}
                                >
                                
                                <MenuItem value={'admin'}>Administrador</MenuItem>
                                <MenuItem value={'clientA'}>{ `Cliente A (15%)`}</MenuItem>
                                <MenuItem value={'clientB'}>{ `Cliente B (20%)`}</MenuItem>
                                <MenuItem value={'clientC'}>{ `Cliente C (25%)`}</MenuItem>
                        
                                </Select>
                            </FormControl>

                            <TextField
                                label="Contraseña"
                                variant="outlined"
                                fullWidth 
                                sx={{ mb: 1 }}
                                { ...register('password', {
                                    required: user._id ? false : true,
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                })}
                                error={ !!errors.password }
                                helperText={ errors.password?.message }
                            />


                        </Box>

                    </Grid>

                </Grid>
            </form>


        </AdminLayout>
        <Snackbar open={openAlert} onClose={() => setOpenAlert(false)} autoHideDuration={6000} sx={{ pt: { xs: 13, sm: 16 }}} anchorOrigin={{ vertical: 'top', horizontal: 'right'}} >
            <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: '100%' }}>
                { user._id ? 'El usuario se guardó correctamente!' : 'El usuario se creó correctamente!'}
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
    
    const { id = '' } = query;

    let user: IUser | null; 

    if( id === 'new' ){
        const tempUser = JSON.parse( JSON.stringify( new User() ));
        delete tempUser._id;
        user = tempUser;
    } else {
        user = await dbUsers.getUserById(id.toString()); 
    } 


    if ( !user ) {
        return {
            redirect: {
                destination: '/admin/users',
                permanent: false,
            }
        }
    }

    return {
        props: {
            user
        }
    }
}


export default UserPage