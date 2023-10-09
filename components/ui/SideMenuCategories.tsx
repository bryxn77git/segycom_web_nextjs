import { Box, Divider, Drawer, IconButton, Link, List, ListItem, ListItemButton, ListItemText, Typography, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { MouseEventHandler, useContext, useEffect, useState } from 'react';
import { UiContext } from "../../context";
import { useRouter } from "next/router";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import NextLink from 'next/link';
import Skeleton from '@mui/material/Skeleton';


export const SideMenuCategorias = () => {

    const [idCategory , setidCategory ] = useState<number | string>()
    const { isMenuCategoriesOpen, isMenuSubCategoriesOpen, getCategoriesMenu, subCategoriesStartLoading, toggleSideMenuCategories, toggleSideMenuSubCategories, toggleCloseAllMenus, categoriesMenu, subCategories } = useContext( UiContext );

    useEffect(() => {
        getCategories()

    }, [])

    const getCategories = async() => {
        if(categoriesMenu.length <= 0){
            await getCategoriesMenu();
        }
    }

    const handleShowCategoriesMenu = async( id: string|number ) => { 
        setidCategory(id)

        if(!subCategories.find(o => o.id == id)){        
            subCategoriesStartLoading(id) 
        }  
        toggleSideMenuSubCategories()

    }

  return (
    <>
    <Drawer
        open={ isMenuCategoriesOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(1px)', transition: 'all 0.5s ease-out' }}
        onClose={ () => toggleCloseAllMenus() }
    >
        <Box sx={{ width: 270, paddingTop: 1 }}>
            
            <List>
    
                <ListItem>
                    <IconButton onClick={ () => toggleSideMenuCategories() } sx={{ mr: 1}}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Typography color='text.secondary' fontWeight={600}>Categorias</Typography>
                </ListItem> 
                        <Divider sx={{display: { xs: '', sm: 'none' }}} />

                {
                    categoriesMenu.map( ({ id, nombre }) => (
                        <ListItemButton key={id} onClick={  () => handleShowCategoriesMenu( id ) }>
                            <ListItemText secondary={ nombre } />
                            <KeyboardArrowRightIcon sx={{ color: '#666666' }} />
                        </ListItemButton>

    
                    ))
                }
                
            </List>
        </Box>
    </Drawer>

    <Drawer
        open={ isMenuSubCategoriesOpen }
        anchor='right'
        sx={{ backdropFilter: 'blur(1px)', transition: 'all 0.5s ease-out' }}
        onClose={ () => toggleCloseAllMenus() }
    >
        <Box sx={{ width: 270, paddingTop: 1 }}>

        <List>
    
            <ListItem>
                <IconButton onClick={ () => toggleSideMenuSubCategories() } sx={{ mr: 1}}>
                    <ArrowBackIosIcon />
                </IconButton>
                <Typography color='text.secondary' fontWeight={600}>SubCategorias</Typography>
            </ListItem> 

            <Divider sx={{display: { xs: '', sm: 'none' }}} />
                {
                    subCategories.find(o => o.id === idCategory) != undefined  ? (
                        
                        subCategories.find(o => o.id === idCategory)?.subcategorias.map( ({ id, nombre }) => (
                            <ListItemButton onClick={ () => toggleCloseAllMenus() } key={id}>
                                <NextLink href={ `/productos/${id}?categoria=${nombre.replaceAll(' ', '_').toLocaleLowerCase()}&id_categoria=${id}&orden=topseller&pagina=1` } passHref key={ id }>
                                    <Link sx={{ ml: 0, mr: { sm: 1, md: 3}, fontWeight: 600  }}>
                                        <ListItemText secondary={ nombre } />
                                    </Link>
                                </NextLink>

                            </ListItemButton>
                        ))

                        
                    ) : (
                        <Grid container display='flex' justifyContent='center' sx={{ p: 1 }}>
                            {/* <Typography color='text.secondary' >Cargando...</Typography> */}
                            {/* <CircularProgress /> */}
                            <Box sx={{ width: 300 }}>
                                {/* <LinearProgress /> */}
                                <Typography fontWeight={600} variant='caption' sx={{ color: '#666666', fontSize: '13px' }}>
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" />
                                    <Skeleton animation="wave" />
                                </Typography>
                            </Box>
                        </Grid>
                    )
                }
            
            


        </List>

        </Box>
    </Drawer>

    </>
  )
}