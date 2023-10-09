import NextLink from 'next/link'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { CartContext, UiContext } from '../../context';
import NProgress from 'nprogress';
import Backdrop from '@mui/material/Backdrop';

import Router from 'next/router';

NProgress.configure({ showSpinner: false });

import { Menu, AppBar, Box, Button, CardMedia, Divider, Grid, IconButton, Input, InputAdornment, Link, Toolbar, Tooltip, Container, Typography, LinearProgress, CircularProgress } from '@mui/material';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import RequestPageIcon from '@mui/icons-material/RequestPage';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ClearIcon from '@mui/icons-material/Clear';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ProductsCategories } from './ProductsCategories';
import Badge from '@mui/material/Badge';

// Opciones del menu 
const menuOptions = [
    { 
        nombre: 'Inicio',
        link: '/'
    },
    { 
        nombre: 'Plataforma',
        link: '/plataforma' 
    },
    { 
        nombre: 'App',
        link: '/app' 
    },
    { 
        nombre: 'Sobre nosotros',
        link: '/nosotros' 
    },
    { 
        nombre: 'Noticias',
        link: '/noticias'
    },
    { 
        nombre: 'Productos',
        link: '/productos' 
    },
]

export const Navbar = () => {

    const { asPath, push  } = useRouter();
    const { toggleSideMenu, tipoCambio } = useContext( UiContext );
    const { numberOfItems } = useContext( CartContext );
    // const [categoriesMenu, setCategoriesMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    

    const [searchTerm, setSearchTerm] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const [loading, setLoading] = useState(false);

    // Mostrar barra de loading al cargar cualquier pagina
    useEffect(() => {  
      const start = () => {
        NProgress.start();
        setLoading(true);
      };
      const end = () => {
        NProgress.done();
        setLoading(false);
      };
  
      Router.events.on('routeChangeStart', start);
      Router.events.on('routeChangeComplete', end);
      Router.events.on('routeChangeError', end);
      return () => {
        Router.events.off('routeChangeStart', start);
        Router.events.off('routeChangeComplete', end);
        Router.events.off('routeChangeError', end);
      };
    }, []);


    // Mandar a la pagina de busqueda
    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        push(`/buscar/${ searchTerm }`);
        setSearchTerm('');
        setIsSearchVisible(false);
    }

    // Mostrar el menu de categorias
    const handleShowCategoriesMenu = async(event: React.MouseEvent<HTMLButtonElement>) => {        
        setAnchorEl(event.currentTarget);
    }

    

  return (
    
    <>

    
    <AppBar position="fixed" color='default' >

    <Container maxWidth="xl" disableGutters>
     <Grid container justifyContent='center' display='flex' >
        {/* {
            loading && ( */}
                {/* // <LinearProgress sx={{width: '100%', position: 'fixed'}} color='primary' /> */}
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
                    open={loading}
                    // onClick={handleClose}
                >
                    <CircularProgress />
                </Backdrop>
            {/* )
        } */}

            <Toolbar sx={{ width: '100%' }} >
                <NextLink href="/" passHref>
                    <Link>
                        <CardMedia
                            component='img'
                            className='fadeIn'
                            alt='Logo Next Store Uniforms'
                            image='/assets/home/logoweb2.png'
                            sx={{ width: 170 }}
                        />  
                    </Link>
                </NextLink> 
                 

                <Box flex={ 1 } sx={{ height: 70 }}/>

                

                {/* Pantallas grandes */}
                {
                        isSearchVisible 
                            ? (
                                <>
                                    <Input
                                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                                        className='fadeIn'
                                        autoFocus
                                        value={ searchTerm }
                                        onChange={ (e) => setSearchTerm( e.target.value ) }
                                        onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                                        type='text'
                                        placeholder="Buscar..."
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={ () => setIsSearchVisible(false) }
                                                >
                                                    <ClearIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <IconButton
                                                    onClick={ onSearchTerm }
                                                >
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        
                                    />
                                </>
                            )
                        : 
                        (
                            <>
                                 <Tooltip title="Tipo de cambio" arrow>
                                        <Typography variant='caption' color='#666666' sx={{ mr: 1, display: { xs: 'none', sm: 'flex' }  }} fontWeight={600}>TC: ${ tipoCambio.normal }</Typography>
                                    </Tooltip>  
                                <Tooltip title="Buscar" arrow>
                                    <IconButton 
                                        onClick={ () => setIsSearchVisible(true) }
                                        className="fadeIn"
                                        sx={{ display: { xs: 'none', sm: 'flex' } }}
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </Tooltip>
                            </>

                        )
                    }

                    
                    {/* Pantallas pequeñas */}
                    <Tooltip title="Buscar" arrow>
                        <IconButton
                            sx={{ display: { xs: 'flex', sm: 'none' } }}
                            onClick={ toggleSideMenu }
                        >
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>

                    <NextLink href="/cotizacion" passHref>
                        <Link>
                            <Tooltip title="Cotización" arrow>
                                <IconButton>
                                    <Badge badgeContent={ numberOfItems } color="secondary">
                                        {/* <ShoppingCartOutlinedIcon /> */}
                                        <RequestQuoteIcon />
                                    </Badge>
                                </IconButton>
                            </Tooltip>
                        </Link>
                    </NextLink>

                    
                    <Tooltip title="Menú" arrow>
                        <IconButton
                            onClick={ toggleSideMenu }
                        >
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                    

            </Toolbar>
            </Grid>
            



        <Box sx={{ display: { xs: 'none', sm: 'block'} }}>
            <Divider />
            
            <Toolbar variant='dense'>
                {/* <Box flex={ 1 }/> */}
                    <Box sx={{ display: { xs: 'none', sm: 'block'} }}>
                        {
                            menuOptions.map( ({ nombre, link }) => (
                                nombre !== 'Productos' ? (
                                    <NextLink href={ link } passHref key={ nombre }>
                                        <Link sx={{ ml: 0, mr: { sm: 1, md: 3}, fontWeight: 600  }}>
                                            <Button 
                                                variant='text' 
                                                size='small'
                                                sx={{ fontWeight: 600  }}
                                                // onClick={ () => toggleCategoriesMenuClosed() }
                                                color={ asPath === link ? 'secondary' : 'primary'}
                                            >
                                                { nombre }
                                            </Button>
                                        </Link>
                                    </NextLink>

                                ) : (
                                    <span key={ nombre } >
                                    <Button 
                                        
                                        sx={{ ml: 0, mr: { sm: 1, md: 3}, fontWeight: 600 }}
                                        variant='text' 
                                        size='small'
                                        endIcon={<KeyboardArrowDownIcon />}
                                        onClick={ handleShowCategoriesMenu }
                                        color={ asPath === link ? 'secondary' : 'primary'}
                                    >
                                        { nombre }
                                    </Button>

                                    <ProductsCategories anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
                                    
                                    </span>

                                )
                            ))
                        }      
                    </Box>
                <Box flex={ 1 }/>

                
                <a href='https://api.whatsapp.com/send?phone=5216141690211' target='_blank' rel="noreferrer">
                <Tooltip title="Whatsapp" arrow>
                    <IconButton sx={{display: { sm: 'none', md: 'block'}}}><WhatsAppIcon /></IconButton>
                </Tooltip>
                </a>
                <a href='https://www.facebook.com/Segycom/' target='_blank' rel="noreferrer">
                    <Tooltip title="Facebook" arrow>
                        <IconButton sx={{display: { sm: 'none', md: 'block'}}}><FacebookIcon /></IconButton>
                    </Tooltip>
                </a>
                <a href='https://www.instagram.com/segycom_/' target='_blank' rel="noreferrer">
                    <Tooltip title="Instagram" arrow>
                        <IconButton sx={{display: { sm: 'none', md: 'block'}}}><InstagramIcon /></IconButton>
                    </Tooltip>
                </a>
                <a href='https://goo.gl/maps/g6aNUUNqPmDsWaW9A' target='_blank' rel="noreferrer">
                    <Tooltip title="Ubicación" arrow>
                        <IconButton sx={{display: { sm: 'none', md: 'block'}}}><LocationOnIcon /></IconButton>
                    </Tooltip>
                
                </a>

            <NextLink href={ '/contacto' } passHref >
                <Link>
                    <Button variant="contained" sx={{ ml: 3}} size='small' >
                        CONTACTO
                    </Button>
                </Link>
            </NextLink>
            </Toolbar>
        </Box>
        </Container>

    </AppBar>

    {/* <Grid item xs={12}>
        {
            isCategoriesMenuOpen && ( <ProductCategories /> )
        }

    </Grid> */}
    </>

  )
}
