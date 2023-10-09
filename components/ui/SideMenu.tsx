import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { AuthContext, UiContext } from '../../context';
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Button, Grid } from '@mui/material';

import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import DevicesIcon from '@mui/icons-material/Devices';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CategoryIcon from '@mui/icons-material/Category';
import SearchIcon from '@mui/icons-material/Search';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { SideMenuCategorias } from './SideMenuCategories';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const navbarOptions = [
    { title: 'Inicio', src: '/', icon: <HomeIcon /> },
    { title: 'Plataforma', src: '/plataforma', icon: <DevicesIcon /> },
    { title: 'App', src: '/app', icon: <PhoneIphoneIcon /> },
    { title: 'Sobre nosotros', src: '/nosotros', icon: <PeopleAltIcon /> },
    { title: 'Noticias', src: '/noticias', icon: <NewspaperIcon /> },
    { title: 'Productos', src: '/', icon: <CategoryIcon /> },

]


export const SideMenu = () => {

    const router = useRouter();
    const { isMenuOpen, toggleSideMenu, toggleSideMenuCategories, toggleSideMenuSubCategories, getCategoriesMenu, categoriesMenu } = useContext( UiContext );
    const { user, isLoggedIn, logout } = useContext( AuthContext )

    const [searchTerm, setSearchTerm] = useState('');

    const onSearchTerm = () => {
        if( searchTerm.trim().length === 0 ) return;
        navigateTo(`/buscar/${ searchTerm }`);
        setSearchTerm('');
    }

    const navigateTo = ( url: string ) => {
        toggleSideMenu();
        router.push(url);
    }

    const textFieldInputFocus = (inputRef: any) => {
        if (inputRef && inputRef.node !== null) {
          setTimeout(() => {
            inputRef.focus()
          }, 100)
        }
        return inputRef
    }
    
    let textFieldProps = { inputRef: textFieldInputFocus } 

    const getCategories = async() => {
      
        if(categoriesMenu.length === 0){

            getCategoriesMenu(  );
        }
        toggleSideMenuCategories()
    }

  return (
    <>
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(1px)', transition: 'all 0.5s ease-out' }}
        onClose={ toggleSideMenu }
    >
        <Box sx={{ width: 250, paddingTop: 1 }}>
            <List>
                <ListItem>
                    <Input
                        {...textFieldProps}
                        value={ searchTerm }
                        onChange={ (e) => setSearchTerm( e.target.value ) }
                        onKeyPress={ (e) => e.key === 'Enter' ? onSearchTerm() : null }
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={ onSearchTerm } > 
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>

                <Grid sx={{ px: 2, pb: 1 , display: { xs: '', sm: 'none' }}}>
                    <Button variant="contained" size='small' fullWidth>
                        CONTACTO
                    </Button>
                </Grid>

                <Box textAlign='center'>
                    <a href='https://api.whatsapp.com/send?phone=5216141690211' target='_blank' rel="noreferrer">
                        <IconButton sx={{display: { xs: '', sm: 'none' }}}><WhatsAppIcon /></IconButton>
                    </a>
                    <a href='https://www.facebook.com/Segycom/' target='_blank' rel="noreferrer">
                        <IconButton sx={{display: { xs: '', sm: 'none' }}}><FacebookIcon /></IconButton>
                    </a>
                    <a href='https://www.instagram.com/segycom_/' target='_blank' rel="noreferrer">
                        <IconButton sx={{display: { xs: '', sm: 'none' }}}><InstagramIcon /></IconButton>
                    </a>
                    <a href='https://goo.gl/maps/g6aNUUNqPmDsWaW9A' target='_blank' rel="noreferrer">
                        <IconButton sx={{display: { xs: '', sm: 'none' }}}><LocationOnIcon /></IconButton>
                    </a>
                    
                    
                    
                </Box>  
                
                

                <Divider sx={{display: { xs: '', sm: 'none' }}} />

                {
                    isLoggedIn && (

                        <ListItemButton 
                            onClick={ () => navigateTo( '/orders/history' )}
                        >
                            <ListItemIcon>
                                <ReceiptLongIcon />
                            </ListItemIcon>
                            <ListItemText secondary={'Mis Cotizaciones'} />
                        </ListItemButton>
                    )
                }
                
                

                {
                    navbarOptions.map( option => {
                        if( option.title !== 'Productos'){
                            return (
                                <ListItemButton sx={{ display: { xs: '', sm: 'none' }}} key={ option.title } onClick={ () => navigateTo( option.src ) }>
                                    <ListItemIcon>
                                        { option.icon }
                                    </ListItemIcon>
                                    <ListItemText secondary={ option.title } />
                                </ListItemButton>

                            )
                        } else {
                            return (
                                <ListItemButton sx={{ display: { xs: '', sm: 'none' }}} key={ option.title } onClick={ getCategories } >
                                    <ListItemIcon>
                                        { option.icon }
                                    </ListItemIcon>
                                    <ListItemText secondary={ option.title } />
                                    <KeyboardArrowRightIcon sx={{ color: '#666666' }} />
                                </ListItemButton>

                            )
                        }
                    })
                }
                
                

                {
                    isLoggedIn ? (
                        <ListItemButton
                        onClick={ logout }
                        >
                            <ListItemIcon>
                                <LogoutIcon/>
                            </ListItemIcon>
                            <ListItemText secondary={'Salir'} />
                        </ListItemButton>
                    ) : (
                        <ListItemButton
                            onClick={ () => navigateTo(`/auth/login?p=${ router.asPath }`) }
                        >
                            <ListItemIcon>
                                <VpnKeyIcon/>
                            </ListItemIcon>
                            <ListItemText secondary={'Ingresar'} />
                        </ListItemButton>
                        

                    )
                }

                

                {/* Admin */}
                {
                    user?.role === 'admin' && (
                        <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>

                            <ListItemButton onClick={ () => navigateTo('/admin')}>
                                <ListItemIcon>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText secondary='Dashboard' />
                            </ListItemButton>
                            <ListItemButton onClick={ () => navigateTo('/admin/orders')}>
                                <ListItemIcon>
                                    <ReceiptLongIcon />
                                </ListItemIcon>
                                <ListItemText secondary={ 'Cotizaciónes' } />
                            </ListItemButton>
                            <ListItemButton onClick={ () => navigateTo('/admin/ads')}>
                                <ListItemIcon>
                                    <ViewCarouselIcon />
                                </ListItemIcon>
                                <ListItemText secondary={ 'Publicidad' } />
                            </ListItemButton>
                            <ListItemButton onClick={ () => navigateTo('/admin/flayers')}>
                                <ListItemIcon>
                                    <LocalOfferIcon />
                                </ListItemIcon>
                                <ListItemText secondary={ 'Flayers' } />
                            </ListItemButton>
                            <ListItemButton onClick={ () => navigateTo('/admin/users')}>
                                <ListItemIcon>
                                    <PeopleAltIcon /> 
                                </ListItemIcon>
                                <ListItemText secondary={ 'Usuarios' } />
                            </ListItemButton>
                            <ListItemButton onClick={ () => navigateTo('/admin/news')}>
                                <ListItemIcon>
                                    <NewspaperIcon />
                                </ListItemIcon>
                                <ListItemText secondary={ 'Noticias' } />
                            </ListItemButton>
                            
                            
                              
                        </>
                    )
                }
            </List>

        </Box>
       
    </Drawer>

    <SideMenuCategorias />
    
    
    </>
  )
}
