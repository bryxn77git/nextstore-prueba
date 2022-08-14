import { useState, useEffect } from 'react';
import NextLiknk from 'next/link';
import { AddOutlined, PeopleOutline } from '@mui/icons-material'
import useSWR from 'swr';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid, Select, MenuItem, Tooltip, CardMedia, Chip, Snackbar, Alert, Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, IconButton, Link } from '@mui/material';

import { AdminLayout } from '../../components/layouts'
import nextStoreApi from '../../api/nextStoreApi';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { IMarcas } from '../../interfaces/marcas';
import DeleteIcon from '@mui/icons-material/Delete';
import { FullScreenLoading } from '../../components/ui/FullScreenLoading';


const BrandsPage = () => {

    const { data, error } = useSWR<IMarcas[]>('/api/admin/marcas');
    const [ marcas, setMarcas ] = useState<IMarcas[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [openAlert, setOpenAlert] = useState(false)
    const [rowsSelected, setrowsSelected] = useState([]);



    useEffect(() => {
      if (data) {
        setMarcas(data);
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
        const previosMarcas = marcas.map( marca => ({ ...marca }));
        const updatedMarcas = marcas.filter( marca => {
            return !rowsSelected.find( marcaId  => {
                return marcaId === marca._id;
            });
        })

        setIsDeleted(true);

        setMarcas(updatedMarcas)
        try {
            const resp = await nextStoreApi({
                url: '/admin/marcas',
                method: 'DELETE',
                data: rowsSelected
            })

            setIsDeleted(false);
            setOpenAlert(true);
            
        } catch (error) {
            setMarcas( previosMarcas );
            console.log(error);
            setIsDeleted(false);
            
        }
        
    }



    const columns: GridColDef[] = [
        { 
            field: 'logo',
            headerName: 'Logo',
            renderCell: ({row}: GridValueGetterParams) => {
                return (
                    <a href={ `/marca/${ row.name }` } target="_blank" rel="noreferrer">
                        <Tooltip title='Ver marca' placement="top" arrow>
                            <CardMedia 
                                component='img'
                                alt={ row.name }
                                className='fadeIn'
                                image={ row.logo.url }
                                sx={{ height: 50 }}
                            />
                        </Tooltip>
                    </a>
                )
            }
        },
        { 
            field: 'name', 
            headerName: 'Nombre', 
            width: 300,
            renderCell: ({row}: GridValueGetterParams) => { 
                return (
                    <NextLiknk href={`/admin/brands/${ row.name }`}>
                        <Tooltip title='Modificar marca' placement="top" arrow>
                            <Link underline='always' sx={{ cursor: 'pointer'}}>
                                { row.name }
                            </Link>
                        </Tooltip>
                    </NextLiknk>
                ) 
            }
        },
        { 
            field: 'categories', 
            headerName: 'Categorias', 
            width: 500,
            renderCell: ({row}: GridValueGetterParams) => { 
                return (
                    row.categories.map( (c: any) => (
                        <Chip
                            key={c}
                            label={c}
                            color="primary"
                            sx={{ ml: 1, mt: 1, color: '#ffffff'}}
                        />
    
                    ) )
                ) 
            }
        },
    ];

    const rows = marcas.map( marca => ({
        id: marca._id,
        logo: marca.logo,
        name: marca.name,
        categories: marca.categories,
    }))


  return (
    <>
    <AdminLayout 
        title={`Marcas`} 
        subTitle={'Mantenimiento de marcas'}
        icon={ <LocalOfferIcon /> }
    >

        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
            <Tooltip title='Crear producto' placement="top" arrow>
                <IconButton href="/admin/brands/new">
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

export default BrandsPage