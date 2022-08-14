import { useState, useEffect } from 'react';
import { AddOutlined } from '@mui/icons-material'
import useSWR from 'swr';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid, Box, IconButton, Tooltip, Link, Alert, Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';

import { AdminLayout } from '../../components/layouts'
import nextStoreApi from '../../api/nextStoreApi';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { FullScreenLoading } from '../../components/ui';
import { ICategorias } from '../../interfaces/categories';
import NextLiknk from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';


const CategoriesPage = () => {

    const { data, error } = useSWR<{category: ICategorias, cantidad: number}[]>('/api/admin/categories');
    const [ categories, setCategories ] = useState<{category: ICategorias, cantidad: number}[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [openAlert, setOpenAlert] = useState(false)
    const [rowsSelected, setrowsSelected] = useState([]);


    useEffect(() => {
      if (data) {
        setCategories(data);
      }
    }, [data])
    

    if ( !data && !error ) return (<></>);

    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const deleteRowsSelected = async() => {

        setOpenDialog(false);
        const previosCategorias = categories.map( category => ({ ...category }));
        const updatedCategorias = categories.filter( category => {
            return !rowsSelected.find( categoryId  => {
                return categoryId === category.category._id;
            });
        })

        setIsDeleted(true);

        setCategories(updatedCategorias)
        try {
            const resp = await nextStoreApi({
                url: '/admin/categories',
                method: 'DELETE',
                data: rowsSelected
            })

            setIsDeleted(false);
            setOpenAlert(true);
            
        } catch (error) {
            setCategories( previosCategorias );
            console.log(error);
            setIsDeleted(false);
            
        }
        
    }

    const columns: GridColDef[] = [
        { 
            field: 'name', 
            headerName: 'Nombre', 
            width: 300,
            renderCell: ({row}: GridValueGetterParams) => { 
                return (
                    <NextLiknk href={`/admin/categories/${ row.name }`}>
                        <Tooltip title='Modificar marca' placement="top" arrow>
                            <Link underline='always' sx={{ cursor: 'pointer'}}>
                                { row.name }
                            </Link>
                        </Tooltip>
                    </NextLiknk>
                ) 
            }
        },
        { field: 'cantidad', headerName: 'Numero de productos', width: 300 },
    ];

    const rows = categories.map( category => ({
        id: category.category._id,
        name: category.category.name,
        cantidad: category.cantidad
    }))


  return (
    <>
    <AdminLayout 
        title={'Categorias'} 
        subTitle={'Mantenimiento de categorias'}
        icon={ <LocalOfferIcon /> }
    >


    <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
            <Tooltip title='Crear producto' placement="top" arrow>
                <IconButton href="/admin/categories/new">
                    <AddOutlined />
                </IconButton>
            </Tooltip>
            <Tooltip 
                title={ rowsSelected.length === 0 ? 'Seleccione una marca' : `Eliminar ${ rowsSelected.length > 1 ? 'marcas seleccionados' : 'marca seleccionado'}`} 
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
            {
                    data ? (
                        <DataGrid 
                            rows={ rows }
                            columns={ columns }
                            pageSize={ 10 }
                            rowsPerPageOptions={ [10] }
                            checkboxSelection
                            onSelectionModelChange={ (e: any) => setrowsSelected(e)}
                            disableSelectionOnClick
                        />

                    ) : (
                        <FullScreenLoading />
                    )
                }

            </Grid>
        </Grid>


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
            {`¿Desea eliminar ${ rowsSelected.length === 1 ? 'la categoria seleccionada' : 'las categorias seleccionada'}?`}
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

export default CategoriesPage