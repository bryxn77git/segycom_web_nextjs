import { useState, useEffect, FC } from 'react';
import { AddOutlined, PeopleOutline } from '@mui/icons-material'
import useSWR from 'swr';

import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams, GridToolbar, esES } from '@mui/x-data-grid';
import { Grid, Select, MenuItem, Box, IconButton, Tooltip, Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Backdrop, CircularProgress, Snackbar, Alert, Link } from '@mui/material';

import { AdminLayout } from '../../components/layouts'
import { IUser } from '../../interfaces';
import DeleteIcon from '@mui/icons-material/Delete';
import { segycomWebApi } from '../../api';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { spanishLocaleText } from '../../utils/spanishText';
import NextLiknk from 'next/link';
import { GetServerSideProps } from 'next';
import { dbUsers } from '../../database';

interface Props {
    usersList: IUser[];
}

const UsersPage:FC<Props> = ({ usersList }) => {

    // const { data, error } = useSWR<IUser[]>('/api/admin/users');
    const [rowsSelected, setrowsSelected] = useState([]);
    const [ users, setUsers ] = useState<IUser[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [openAlert, setOpenAlert] = useState(false)


    useEffect(() => {
      if (usersList) {
          setUsers(usersList);
      }
    }, [usersList])
    

    // if ( !data && !error ) return (<></>);

    // const onRoleUpdated = async( userId: string, newRole: string ) => {

    //     const previosUsers = users.map( user => ({ ...user }));
    //     const updatedUsers = users.map( user => ({
    //         ...user,
    //         role: userId === user._id ? newRole : user.role
    //     }));

    //     setUsers(updatedUsers);

    //     try {
            
    //         await segycomWebApi.put('/admin/users', {  userId, role: newRole });

    //     } catch (error) {
    //         setUsers( previosUsers );
    //         console.log(error);
    //         alert('No se pudo actualizar el role del usuario');
    //     }

    // }

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
      };

    const deleteRowsSelected = async() => {

        setOpenDialog(false);
        const previosUsers = users.map( user => ({ ...user }));
        let updatedUsers = users.filter( user => {
            return !rowsSelected.find( userId  => {
                return userId === user._id;
            });
        })

        setIsDeleted(true);

        setUsers(updatedUsers)
        try {
            const resp = await segycomWebApi({
                url: '/admin/users',
                method: 'DELETE',
                data: rowsSelected
            })

            setIsDeleted(false);
            setOpenAlert(true);
            
        } catch (error) {
            setUsers( previosUsers );
            console.log(error);
            setIsDeleted(false);
            
        }
        
    }


    const columns: GridColDef[] = [
        {
            field: 'email',
            width: 300,
            headerName: 'Correo',
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <NextLiknk href={`/admin/users/${ row.id }`}>
                        <Tooltip title='Modificar usuario' placement="top" arrow>
                            <Link underline='always' sx={{ cursor: 'pointer'}}>
                            { row.email }
                            </Link>
                        </Tooltip>
                    </NextLiknk>
                )
            }
        },
        // { field: 'email', headerName: 'Correo', width: 250 },
        { field: 'name', headerName: 'Nombre completo', width: 300 },
        { field: 'role', headerName: 'Acceso', width: 300 },
        // {
        //     field: 'role', 
        //     headerName: 'Rol', 
        //     width: 300,
        //     renderCell: ({row}: GridRenderCellParams) => {
        //         return (
        //             <Select
        //                 value={ row.role }
        //                 label="Rol"
        //                 onChange={ ({ target }) => onRoleUpdated( row.id, target.value ) }
        //                 sx={{ width: '300px' }}
        //             >
        //                 <MenuItem value='admin'> Admin </MenuItem>
        //                 <MenuItem value='clientA'>{`Client A (15%)`}</MenuItem>
        //                 <MenuItem value='clientB'>{`Client B (20%)`}</MenuItem>
        //                 <MenuItem value='clientC'>{`Client C (25%)`}</MenuItem>
        //             </Select>
        //         )
        //     }
        // },
    ];

    const rows = users.map( user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }))


  return (
    <>
    <AdminLayout 
        title={`Usuarios`} 
        subTitle={'Mantenimiento de usuarios'}
        icon={ <PeopleAltIcon /> }
    >

        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
            <Tooltip title='Crear usuario' placement="top" arrow>
                <IconButton href="/admin/users/new">
                    <AddOutlined />
                </IconButton>
            </Tooltip>
            <Tooltip 
                title={ rowsSelected.length === 0 ? 'Seleccione un usuario' : `Eliminar ${ rowsSelected.length > 1 ? 'usuarios seleccionados' : 'usuario seleccionado'}`} 
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
            <Grid item xs={12} >
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    initialState={{
                        pagination: { paginationModel: { pageSize: 25 } },
                    }}
                    pageSizeOptions={[25, 50, 100]}
                    slots={{ toolbar: GridToolbar }}
                    checkboxSelection
                    onRowSelectionModelChange={ (e: any) => setrowsSelected(e)}
                    disableRowSelectionOnClick
                    localeText={{ ...esES.components.MuiDataGrid.defaultProps.localeText, ...spanishLocaleText }}
                    autoHeight
                />

            </Grid>
        </Grid>


    </AdminLayout>
    <Snackbar open={openAlert} onClose={() => setOpenAlert(false)} autoHideDuration={6000} sx={{ pt: { xs: 12, md: 16}}} anchorOrigin={{ vertical: 'top', horizontal: 'right'}} >
            <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: '100%' }}>
                Se elimino correctamente!
            </Alert>
        </Snackbar>
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!usersList}
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
            {`¿Desea eliminar ${ rowsSelected.length === 1 ? 'el usuario seleccionado' : 'los usuarios seleccionados'}?`}
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

    const usersList = await dbUsers.getAllUsers();

    return {
        props: {
         usersList
        }
    }
}

export default UsersPage