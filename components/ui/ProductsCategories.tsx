import { Menu, Button, Grid, Typography, MenuItem, CircularProgress, LinearProgress, Box, Link } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { UiContext } from '../../context';
import NextLink from 'next/link'
import Skeleton from '@mui/material/Skeleton';

interface Props {
    anchorEl: HTMLElement | null;
    setAnchorEl: any;
}

export const ProductsCategories = ({ anchorEl, setAnchorEl }: Props) => {

    const { categoriesMenu, subCategories, getCategoriesMenu, subCategoriesStartLoading } = useContext( UiContext ); 

    useEffect(() => {
        getCategories()

    }, [])

    const getCategories = async() => {
        if(categoriesMenu.length <= 0){
            await getCategoriesMenu();
        }
    }
 
    const [anchorElSub, setAnchorElSub] = useState<null | HTMLElement>(null);
    const [idCategory , setidCategory ] = useState<number | string>()
    const open = Boolean(anchorEl);
    const openSub = Boolean(anchorElSub);

    // const ITEM_HEIGHT = 100;
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseSub = () => {
        setAnchorElSub(null);
        setAnchorEl(null);
    };

    const handleCloseSubLeave = () => {
        setAnchorElSub(null);
    };

    const handleShowCategoriesMenu = async( id: string|number, event: React.MouseEvent<HTMLButtonElement> ) => {        
        setAnchorElSub(event.currentTarget);
        setidCategory(id)
        // setSubCategoriesState(id);
        if(!subCategories.find(o => o.id == id)){        
            subCategoriesStartLoading(id) 
        }  

        // console.log(subCategories)
    }


  return (
    <Menu
        disableAutoFocusItem={true}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
            'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
            
            elevation: 0,
            sx: {
                width: '100%',
                borderRadius: '0px',
                overflow: 'visible',
                filter: 'drop-shadow(0px 1px 3px rgba(0,0,0,0.1))',
                mt: 1.5,
            },
        }}
            transformOrigin={{ horizontal: 'center', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
    >
        <Grid container justifyContent='center' sx={{ mt: 1.5 }}>
            {
                categoriesMenu.length > 0 ? (
                    <>
                    {
                        categoriesMenu.map( ({ id, nombre }) => (
                            <Grid key={id}>
                                <Grid item >  
                                    <Button 
                                        sx={{ mx: { sm: 1, md: 1}, mb: 1.5 , fontWeight: 600 }}
                                        variant='text' 
                                        size='small'                                        
                                        onClick={  (e: React.MouseEvent<HTMLButtonElement>) => handleShowCategoriesMenu( id, e ) }
                                        // onMouseEnter={ () => { setOpenSubMenu(true) }}
                                        // onMouseLeave={ () => { setOpenSubMenu(false) }}
                                    >
                                        { nombre }
                                    </Button> 
                                </Grid>

                                

                                
                           </Grid>

        
                        ))
                        
                    }
                        <Menu
                            anchorEl={anchorElSub}
                            open={openSub}
                            onClose={handleCloseSubLeave}

                            PaperProps={{
                                
                                elevation: 3,
                                sx: {
                                    maxHeight: '50%',
                                    // width: '100%',
                                    p: 3,
                                    // bgcolor: '#f7f7f7',
                                    borderRadius: '0px',
                                    // overflow: 'visible',
                                    // filter: 'drop-shadow(0px 1px 3px rgba(0,0,0,0.1))',
                                    mt: 0,
                                    
                                },
                                
                            }}
                            transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                            
                        >
                            {
                                
                                subCategories.find(o => o.id === idCategory) != undefined  ? (
                                    
                                    subCategories.find(o => o.id === idCategory)?.subcategorias.map( ({ id, nombre }) => (
                                        <MenuItem onClick={handleCloseSub} key={id}>
                                            <NextLink href={ `/productos/${id}?categoria=${nombre.replaceAll(' ', '_').toLocaleLowerCase()}&id_categoria=${id}&orden=topseller&pagina=1` } passHref key={ id }>
                                                <Link sx={{ ml: 0, mr: { sm: 1, md: 3}, fontWeight: 600  }}>
                                                    <Typography fontWeight={600} variant='caption' sx={{ color: '#666666', fontSize: '13px'}}>{ nombre }</Typography>
                                                </Link>
                                            </NextLink>
                                            
                                        </MenuItem>
                                    ))

                                   
                                ) : (
                                    <Grid container display='flex' justifyContent='center'>
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
                        </Menu>
                                
                    </>
                ) : (
                    <Grid container display='flex' justifyContent='center'>
                        <Typography color='text.secondary' sx={{ ml: 0, mr: { sm: 1, md: 3}, fontWeight: 600, mt: 1 }}>Cargando...</Typography>
                    </Grid>
                )

            }
            
        </Grid>
    </Menu>
  )
}
