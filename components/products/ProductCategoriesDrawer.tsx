import NextLink from 'next/link'
import { AppBar, Button, Grid, Link, Toolbar, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { UiContext } from '../../context';




export const ProductCategories = () => {

    // const { toggleCategoriesMenu, categoriesMenu, getCategoriesMenu } = useContext( UiContext );   

    // useEffect(() => {
    
    //     getCategories()
        
    // }, [])
    

    // const getCategories = async() => {
    //     if(categoriesMenu.length < 0){
    //         getCategoriesMenu();
    //     }
    // }



  return (
    <></>
    // <AppBar position="relative" sx={{position: 'fixed', zIndex: 2, backgroundColor: '#f2f2f2', py: 1, width: '100%'}} onMouseLeave={ () => toggleCategoriesMenu() } className={'fadeIn'}>
    //     <Toolbar>
    //         {
    //             categoriesMenu.length > 0 ? (
    //                 <Grid container display='flex' justifyContent='center'>
    //                     {
    //                         categoriesMenu.map( option => (
    //                             <Grid item xs={2} lg={1} key={ option.name } sx={{ p: 1}} display='flex' justifyContent='center' alignItems='center'>
    //                                 <NextLink href={ `/productos/${ option.name.toLocaleLowerCase() }` } passHref >
    //                                     <Link sx={{ ml: { sm: 1, md: 3}, mr: { sm: 1, md: 3} }}>
    //                                         <Button 
    //                                             variant='text' 
    //                                             size='small'
    //                                             onClick={ () => toggleCategoriesMenu() }
    //                                         >
    //                                             { option.name.charAt(0).toLocaleUpperCase() + option.name.slice(1) }
    //                                         </Button>
    //                                     </Link>
    //                                 </NextLink>

    //                             </Grid>
    //                         ))
    //                     }

    //                 </Grid>
    //             ) : (
    //                 <Grid container display='flex' justifyContent='center'>
    //                     <Typography color='text.secondary' >Cargando...</Typography>
    //                 </Grid>
    //             )
    //         }
    //     </Toolbar>
    //   </AppBar>
  )
}
