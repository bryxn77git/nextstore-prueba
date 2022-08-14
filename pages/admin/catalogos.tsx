import { useState, useEffect } from 'react';
import { AddOutlined } from '@mui/icons-material'
import useSWR from 'swr';

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid, Box, IconButton, Tooltip, Link, Alert, Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, CardMedia } from '@mui/material';

import { AdminLayout } from '../../components/layouts'
import nextStoreApi from '../../api/nextStoreApi';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { FullScreenLoading } from '../../components/ui';
import NextLiknk from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import { ICatalogos } from '../../interfaces/catalogos';


const CatalogosPage = () => {

    const { data, error } = useSWR<ICatalogos[]>('/api/admin/catalogos');
    const [ catalogos, setCatalogos ] = useState<ICatalogos[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [openAlert, setOpenAlert] = useState(false)
    const [rowsSelected, setrowsSelected] = useState([]);


    useEffect(() => {
      if (data) {
        setCatalogos(data);
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
        const previosCatalogos = catalogos.map( catalogo => ({ ...catalogo }));
        const updatedCatalogos = catalogos.filter( catalogo => {
            return !rowsSelected.find( catalogoId  => {
                return catalogoId === catalogo._id;
            });
        })

        setIsDeleted(true);

        setCatalogos(updatedCatalogos)
        try {
            const resp = await nextStoreApi({
                url: '/admin/catalogos',
                method: 'DELETE',
                data: rowsSelected
            })

            setIsDeleted(false);
            setOpenAlert(true);
            
        } catch (error) {
            setCatalogos( previosCatalogos );
            console.log(error);
            setIsDeleted(false);
            
        }
        
    }

    const columns: GridColDef[] = [
        { 
            field: 'image',
            headerName: 'Imagen',
            renderCell: ({row}: GridValueGetterParams) => {
                return (
                    <CardMedia 
                        component='img'
                        alt={ row.name }
                        className='fadeIn'
                        image={ row.image }
                        sx={{ width: 50, height: 50}}
                    />
               )
            }
        },
        { 
            field: 'name', 
            headerName: 'Nombre', 
            width: 300,
            renderCell: ({row}: GridValueGetterParams) => { 
                return (
                    <NextLiknk href={`/admin/catalogos/${ row.name }`}>
                        <Tooltip title='Modificar catalogo' placement="top" arrow>
                            <Link underline='always' sx={{ cursor: 'pointer'}}>
                                { row.name }
                            </Link>
                        </Tooltip>
                    </NextLiknk>
                ) 
            }
        },
    ];

    const rows = catalogos.map( catalogo => ({
        id: catalogo._id,
        name: catalogo.name,
        image: catalogo.image,
        url: catalogo.url
    }))


  return (
    <>
    <AdminLayout 
        title={'Catálogos'} 
        subTitle={'Mantenimiento de catálogos'}
        icon={ <LocalOfferIcon /> }
    >


    <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
            <Tooltip title='Crear publicidad' placement="top" arrow>
                <IconButton href="/admin/catalogos/new">
                    <AddOutlined />
                </IconButton>
            </Tooltip>
            <Tooltip 
                title={ rowsSelected.length === 0 ? 'Seleccione un catálogo' : `Eliminar ${ rowsSelected.length > 1 ? 'catálogos seleccionados' : 'catálogo seleccionado'}`} 
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
    <Snackbar open={openAlert} onClose={() => setOpenAlert(false)} autoHideDuration={6000} sx={{ pt: { xs: 13, sm: 16 }}} anchorOrigin={{ vertical: 'top', horizontal: 'right'}} >
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
            {`¿Desea eliminar ${ rowsSelected.length === 1 ? 'el catálogo seleccionado' : 'los catálogos seleccionados'}?`}
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

export default CatalogosPage