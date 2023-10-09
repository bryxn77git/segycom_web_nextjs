import { useState, useEffect, FC } from 'react';
import { AddOutlined } from '@mui/icons-material'
import useSWR from 'swr';

import { DataGrid, GridColDef, GridToolbar, esES, GridRenderCellParams } from '@mui/x-data-grid';
import { Grid, Box, IconButton, Tooltip, Link, Alert, Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, CardMedia } from '@mui/material';

import { AdminLayout } from '../../components/layouts'
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import NextLiknk from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import { IImages } from '../../interfaces/images';
import { segycomWebApi } from '../../api';
import { spanishLocaleText } from '../../utils/spanishText';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { GetServerSideProps } from 'next';
import { dbPublicidad } from '../../database';

interface Props {
    adsList: IImages[];
}

const FlayersPage:FC<Props> = ({ adsList }) => {

    // const { data, error } = useSWR<IImages[]>('/api/admin/flayers');
    const [ ads, setAds ] = useState<IImages[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [openAlert, setOpenAlert] = useState(false)
    const [rowsSelected, setrowsSelected] = useState([]);


    useEffect(() => {
      if (adsList) {
        setAds(adsList);
      }
    }, [adsList])
    

    // if ( !data && !error ) return (<></>);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const deleteRowsSelected = async() => {

        setOpenDialog(false);
        const previosAds = ads.map( ad => ({ ...ad }));
        const updatedAds = ads.filter( ad => {
            return !rowsSelected.find( adId  => {
                return adId === ad._id;
            });
        })

        setIsDeleted(true);

        setAds(updatedAds)
        try {
            const resp = await segycomWebApi({
                url: '/admin/flayers',
                method: 'DELETE',
                data: rowsSelected
            })

            setIsDeleted(false);
            setOpenAlert(true);
            
        } catch (error) {
            setAds( previosAds );
            console.log(error);
            setIsDeleted(false);
            
        }
        
    }

    const columns: GridColDef[] = [
        { 
            field: 'image',
            headerName: 'Imagen',
            width: 150,
            renderCell: ({row}: GridRenderCellParams) => {
                return (
                    <CardMedia 
                        component='img'
                        alt={ row.name }
                        className='fadeIn'
                        image={ row.image }
                        sx={{ height: 50}}
                    />
               )
            }
        },
        { 
            field: 'name', 
            headerName: 'Nombre', 
            width: 300,
            renderCell: ({row}: GridRenderCellParams) => { 
                return (
                    <NextLiknk href={`/admin/flayers/${ row.name }`}>
                        <Tooltip title='Modificar flayer' placement="top" arrow>
                            <Link underline='always' sx={{ cursor: 'pointer'}}>
                                { row.name }
                            </Link>
                        </Tooltip>
                    </NextLiknk>
                ) 
            }
        },
    ];

    const rows = ads.map( ad => ({
        id: ad._id,
        name: ad.name,
        image: ad.url
    }))


  return (
    <>
    <AdminLayout 
        title={'Flayers'} 
        subTitle={'Mantenimiento de flayers'}
        icon={ <LocalOfferIcon /> }
    >


    {/* <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
            <Tooltip title='Crear flayers' placement="top" arrow>
                <IconButton href="/admin/flayers/new">
                    <AddOutlined />
                </IconButton>
            </Tooltip>
            <Tooltip 
                title={ rowsSelected.length === 0 ? 'Seleccione un flayer' : `Eliminar ${ rowsSelected.length > 1 ? 'flayers seleccionados' : 'flayer seleccionado'}`} 
                placement="top" 
                arrow
            >
                <span>
                    <IconButton onClick={ handleClickOpenDialog } disabled={ rowsSelected.length === 0 }>
                        <DeleteIcon />
                    </IconButton>
                </span>
            </Tooltip>
        </Box> */}
        <Grid container className='fadeIn' sx={{ mt: 3 }}>
            <Grid item xs={12}>
            
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    initialState={{         
                        pagination: { paginationModel: { pageSize: 25 } },
                    }}
                    pageSizeOptions={[25, 50, 100]}
                    slots={{ toolbar: GridToolbar }}
                    localeText={{ ...esES.components.MuiDataGrid.defaultProps.localeText, ...spanishLocaleText }}
                    autoHeight 
                    // checkboxSelection
                    onRowSelectionModelChange={ (e: any) => setrowsSelected(e)}
                    disableRowSelectionOnClick
                />

                    

            </Grid>
        </Grid>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
            open={!adsList}
            // onClick={handleClose}
        >
            <CircularProgress />
        </Backdrop>


    </AdminLayout>
    <Snackbar open={openAlert} onClose={() => setOpenAlert(false)} autoHideDuration={6000} sx={{ pt: { xs: 15, md: 16}}} anchorOrigin={{ vertical: 'top', horizontal: 'right'}} >
    <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: '100%' }}>
        Se elimino correctamente!
    </Alert>
    </Snackbar> 
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isDeleted}
    >
        <CircularProgress />
    </Backdrop>
    <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
    >
        <DialogTitle>
        {"Alerta"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText>
            {`¿Desea eliminar ${ rowsSelected.length === 1 ? 'el flayer seleccionado' : 'los flayers seleccionados'}?`}
        </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleCloseDialog}>Cancelar</Button>
        <Button onClick={ deleteRowsSelected } autoFocus>
            Eliminar
        </Button>
    </DialogActions>
    </Dialog>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const adsList = await dbPublicidad.getAllPublicidad();

    return {
        props: {
            adsList
        }
    }
}

export default FlayersPage