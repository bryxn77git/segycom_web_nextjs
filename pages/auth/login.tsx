import NextLink from 'next/link';
import { Alert, Box, Button, CardMedia, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Snackbar, TextField, Typography, Divider, Tooltip, Chip, Backdrop, CircularProgress } from '@mui/material';
import { AuthLayout } from '../../components/layouts'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { validations } from '../../utils';
import { GetServerSideProps } from 'next';
import { segycomWebApi } from '../../api';
import { AuthContext } from '../../context';
import Cookies from 'js-cookie';
import { CartContext } from '../../context/cart/CartContext';
import { getSession, signIn } from 'next-auth/react';

interface State {
    password: string;
    showPassword: boolean;
  }

type FormData = {
    email   : string,
    password: string,
};

const LoginPage = () => {

    const router = useRouter();
    const { asPath } = useRouter();
    
    const { loginUser } = useContext(AuthContext)
    const { updateProductsToCart, cart } = useContext( CartContext )
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);

    useEffect(() => {

        const isValidLogin = asPath.includes('error')

        if ( isValidLogin ) {
            setShowError(true);
            setTimeout(() => setShowError(false), 5000);
            return;
        }
    }, [asPath])
    

    const onLoginUser = async( { email, password }: FormData ) => {

        setIsLoading(true);
        setShowError(false);

        // const isValidLogin = await loginUser( email, password );

        // if ( !isValidLogin ) {
        //     setShowError(true);
        //     setIsLoading(false);
        //     setTimeout(() => setShowError(false), 5000);
        //     return;
        // }

        const resp = await signIn('credentials', { email, password, redirect: false, })

        // // // Todo: navegar a la pantalla que el usuario estaba
        if (resp?.ok) {
            if( router.asPath.includes('productos')){
                const str =  router.asPath;
    
                const index = str.indexOf('?');
                const result = index !== -1 ? [str.slice(0, index), str.slice(index+1)] : [str];
    
                const index2 = result[1].indexOf('=')
                const destination = index2 !== -1 ? [result[1].slice(0, index2), result[1].slice(index2+1)] : [result[1]] || '/'
                // console.log('entro en producto url')
                router.replace(destination[1]);
                setIsLoading(false);
            } else {
                
                const destination = router.query.p?.toString() || '/'
                // console.log('entro en url normal')
                router.replace(destination);
                setIsLoading(false);
            }
           } else {
            setShowError(true);
            setIsLoading(false);
            setTimeout(() => setShowError(false), 5000);
            return;
           }
        
        // if( cart.length > 0 ){
        //     console.log('hay productos en el carrito ') 
            
        //     updateProductsToCart( cart )
        // } 



    }

    const [values, setValues] = useState<State>({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };


  return (
    <AuthLayout title={'Ingresar'}>
        <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
        <Box sx={{ width: '100%', maxWidth: 450, p: 4, borderRadius: 3 }} >
            <Grid container sx={{ p: 3, backgroundColor: '#ffffff', borderRadius: 3 }} >

                <Grid item xs={12} display='flex' justifyContent='center'>
                    <CardMedia
                        component='img'
                        alt='Logo Next Store Uniforms'
                        image='/assets/home/logo-footer.webp'
                        sx={{ width: '80%' }}
                    />  
                </Grid>

                <Grid item xs={12} sx={{ mb: 2 }}>
                    <Typography color='#666666' variant='body1' fontWeight={700}>Iniciar Sesión</Typography>
                    {/* <Chip 
                        label="Usuario / contraseña incorrectos"
                        color="error"
                        className='fadeIn'
                        sx={{ display: showError ? 'flex' : 'none' }}
                    /> */}
                </Grid>

                <Grid item xs={12} sx={{ mb: 2 }}>
                    <TextField 
                        type="email"
                        label="Correo" 
                        fullWidth 
                        size='small' 
                        { ...register('email', {
                            required: true,
                            validate: validations.isEmail
                            
                        })}
                        error={ !!errors.email }
                        helperText={ errors.email?.message }
                    />
                </Grid>
                <Grid item xs={12} sx={{ mb: 2 }} display='flex' alignItems='center'>
                    {/* <TextField label="Contraseña" type='password' fullWidth /> */}
                                    
                    
                    <FormControl sx={{ width: '100%' }} variant="outlined" >
                        <InputLabel size='small'>Contraseña</InputLabel>
                        <OutlinedInput
                            size='small'
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            { ...register('password', {
                                required: 'Este campo es obligatorio',
                                // minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                            })}
                            error={ !!errors.password }
                            // helperText={ errors.password?.message }
                            onChange={handleChange('password')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Contraseña"
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12} sx={{ mb: 2 }}>
                    <Button  
                        type="submit"
                        variant='contained' 
                        // disabled={ isLoading ? true : false}
                        fullWidth
                    >
                        Ingresar
                    </Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='end'>
                        <NextLink 
                            href={ `/contacto`} 
                            passHref
                        >
                            <Tooltip title={ 'Contacte con nosotros si usted no cuenta con su número de cuenta o password para acceder' } arrow placement="top">
                            <Link underline='always'>
                                ¿No tienes cuenta?
                            </Link>
                            </Tooltip>
                        </NextLink>

                </Grid>

                {/* <Grid item xs={12} flexDirection='column' display='flex' justifyContent='end'>
                    <Divider sx={{ width:'100%', mb: 2, mt: 1 }} />
                    {
                        providers && ( 
                            Object.values( providers ).map(( provider: any ) => {
                                if( provider.id === 'credentials') return (<div key='credentials'></div>)
                                return (
                                <Button
                                    key={ provider.id }
                                    variant='outlined'
                                    fullWidth
                                    color='primary'
                                    sx={{ mb: 1 }}
                                    onClick={ () => signIn( provider.id ) }
                                >
                                    Ingresar con { provider.name }
                                </Button>)
                            })
                        )
                    }
                </Grid> */}
            </Grid>
        </Box>
        </form>

        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={true}
            className="fadeIn"
            sx={{ display: showError ? 'flex': 'none' }}
        >
            <Alert severity="error">Usuario / contraseña incorrectos</Alert>
        </Snackbar>

        <Backdrop
            sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
            open={ isLoading }
            // onClick={handleClose}
        >
            <CircularProgress />
        </Backdrop>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const session = await getSession({ req });

    const { p = '/' } = query; 

    if( session ){
        return {
            redirect: {
                destination: p.toString(),
                permanent: false,
            }
        }
    }

    return {
        props: {
            
        }
    }
}



export default LoginPage