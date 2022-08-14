import { useState, useEffect } from 'react';
import { AddOutlined, PeopleOutline } from '@mui/icons-material'
import useSWR from 'swr';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid, Select, MenuItem, Box, IconButton, Tooltip, Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle, Backdrop, CircularProgress, Snackbar, Alert } from '@mui/material';

import { AdminLayout } from '../../components/layouts'
import { IUser } from '../../interfaces';
import nextStoreApi from '../../api/nextStoreApi';
import DeleteIcon from '@mui/icons-material/Delete';


const UsersPage = () => {

    const { data, error } = useSWR<IUser[]>('/api/admin/users');
    const [rowsSelected, setrowsSelected] = useState([]);
    const [ users, setUsers ] = useState<IUser[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [openAlert, setOpenAlert] = useState(false)


    useEffect(() => {
      if (data) {
          setUsers(data);
      }
    }, [data])
    

    if ( !data && !error ) return (<></>);

    const onRoleUpdated = async( userId: string, newRole: string ) => {

        const previosUsers = users.map( user => ({ ...user }));
        const updatedUsers = users.map( user => ({
            ...user,
            role: userId === user._id ? newRole : user.role
        }));

        setUsers(updatedUsers);

        try {
            
            await nextStoreApi.put('/admin/users', {  userId, role: newRole });

        } catch (error) {
            setUsers( previosUsers );
            console.log(error);
            alert('No se pudo actualizar el role del usuario');
        }

    }

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
            const resp = await nextStoreApi({
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
        { field: 'email', headerName: 'Correo', width: 250 },
        { field: 'name', headerName: 'Nombre completo', width: 300 },
        {
            field: 'role', 
            headerName: 'Rol', 
            width: 300,
            renderCell: ({row}: GridValueGetterParams) => {
                return (
                    <Select
                        value={ row.role }
                        label="Rol"
                        onChange={ ({ target }) => onRoleUpdated( row.id, target.value ) }
                        sx={{ width: '300px' }}
                    >
                        <MenuItem value='admin'> Admin </MenuItem>
                        <MenuItem value='client'> Client </MenuItem>
                    </Select>
                )
            }
        },
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
        icon={ <PeopleOutline /> }
    >

        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
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
            <Grid item xs={12} sx={{ minHeight:'calc(100vh - 250px)', width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                    checkboxSelection
                    onSelectionModelChange={ (e: any) => setrowsSelected(e)}
                    disableSelectionOnClick
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

export default UsersPage