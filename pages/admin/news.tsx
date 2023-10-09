import { useState, useEffect, FC } from 'react';
import { AddOutlined } from '@mui/icons-material'
import useSWR from 'swr';

import { DataGrid, GridColDef, GridToolbar, esES, GridRenderCellParams } from '@mui/x-data-grid';
import { Grid, Box, IconButton, Tooltip, Link, Alert, Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, CardMedia } from '@mui/material';

import { AdminLayout } from '../../components/layouts'
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import NextLiknk from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import { segycomWebApi } from '../../api';
import { spanishLocaleText } from '../../utils/spanishText';
import { INoticias } from '../../interfaces';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { GetServerSideProps } from 'next';
import { dbNoticias } from '../../database';

interface Props {
    newsList: INoticias[];
}

const NewsPage:FC<Props> = ({ newsList }) => {

    // const { data, error } = useSWR<INoticias[]>('/api/admin/news');
    const [ news, setNews ] = useState<INoticias[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [openAlert, setOpenAlert] = useState(false)
    const [rowsSelected, setrowsSelected] = useState([]);


    useEffect(() => {
      if (newsList) {
        setNews(newsList);
      }
    }, [newsList])
    

    // if ( !data && !error ) return (<></>);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const deleteRowsSelected = async() => {

        setOpenDialog(false);
        const previosNews = news.map( currentNews => ({ ...currentNews }));
        const updatedNews = news.filter( currentNews => {
            return !rowsSelected.find( newsId  => {
                return newsId === currentNews._id;
            });
        })

        setIsDeleted(true);

        setNews(updatedNews)
        try {
            const resp = await segycomWebApi({
                url: '/admin/news',
                method: 'DELETE',
                data: rowsSelected
            })

            setIsDeleted(false);
            setOpenAlert(true);
            
        } catch (error) {
            setNews( previosNews );
            console.log(error);
            setIsDeleted(false);
            
        }
        
    }

    const columns: GridColDef[] = [
        { 
            field: 'img',
            headerName: 'Imagen',
            width: 150,
            renderCell: ({row}: GridRenderCellParams) => {
                return (
                    <CardMedia 
                        component='img'
                        alt={ row.title }
                        className='fadeIn'
                        image={ row.img }
                        sx={{ height: 50}}
                    />
               )
            }
        },
        { 
            field: 'title', 
            headerName: 'Titulo', 
            width: 300,
            renderCell: ({row}: GridRenderCellParams) => { 
                return (
                    <NextLiknk href={`/admin/news/${ row.id }`}>
                        <Tooltip title='Modificar noticia' placement="top" arrow>
                            <Link underline='always' sx={{ cursor: 'pointer'}}>
                            { row.title }
                            </Link>
                        </Tooltip>
                    </NextLiknk>
                ) 
            }
        },
        { field: 'date', headerName: 'Fecha', width: 250 },
    ];

    const rows = news.map( currentNew => {

        const date = new Date(currentNew.date);
        let formatDate = `${date.getDate() < 10 ? '0'+date.getDate() : date.getDate() }-${(date.getMonth()+1) < 10 ? '0'+(date.getMonth()+1) : (date.getMonth()+1)}-${date.getFullYear()}`

        return {
            id: currentNew._id, 
            title: currentNew.title,
            img: currentNew.img,
            date: formatDate
        }
    })
        


  return (
    <>
    <AdminLayout 
        title={'Noticias'} 
        subTitle={'Mantenimiento de noticias'}
        icon={ <NewspaperIcon /> }
    >


    <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
            <Tooltip title='Crear noticia' placement="top" arrow>
                <IconButton href="/admin/news/new">
                    <AddOutlined />
                </IconButton>
            </Tooltip>
            <Tooltip 
                title={ rowsSelected.length === 0 ? 'Seleccione una noticia' : `Eliminar ${ rowsSelected.length > 1 ? 'noticias seleccionadas' : 'noticia seleccionada'}`} 
                placement="top" 
                arrow
            >
                <span>
                    <IconButton onClick={ handleClickOpenDialog } disabled={ rowsSelected.length === 0 }>
                        <DeleteIcon />
                    </IconButton>
                </span>
            </Tooltip>
        </Box>
        <Grid container className='fadeIn'>
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
                    checkboxSelection
                    onRowSelectionModelChange={ (e: any) => setrowsSelected(e)}
                    disableRowSelectionOnClick
                />

                    

            </Grid>
        </Grid>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
            open={!newsList}
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
            {`¿Desea eliminar ${ rowsSelected.length === 1 ? 'la noticia seleccionada' : 'las noticias seleccionadas'}?`}
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

    const newsList = await dbNoticias.getAllNoticias();

    return {
        props: {
            newsList
        }
    }
}

export default NewsPage