import NextLiknk from 'next/link';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Grid, CardMedia, Link, Box, Button, Typography, Avatar, Tooltip, IconButton, Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';
import { IProduct } from '../../interfaces/';

import { AdminLayout } from '../../components/layouts'
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect } from 'react';
import nextStoreApi from '../../api/nextStoreApi';
import { FullScreenLoading } from '../../components/ui/FullScreenLoading';


const columns:GridColDef[] = [
    { 
        field: 'img',
        headerName: 'Imagen',
        renderCell: ({row}: GridValueGetterParams) => {
            return (
                <a href={ `/producto/${ row.slug }` } target="_blank" rel="noreferrer">
                    <Tooltip title='Ver Producto' placement="top" arrow>
                        <CardMedia 
                            component='img'
                            alt={ row.title }
                            className='fadeIn'
                            image={ row.img }
                            sx={{ height: 50}}
                        />
                    </Tooltip>
                </a>
            )
        }
    },
    { 
        field: 'title', 
        headerName: 'Nombre', 
        width: 300,
        renderCell: ({row}: GridValueGetterParams) => { 
            return (
                <NextLiknk href={`/admin/products/${ row.slug }`}>
                    <Tooltip title='Modificar producto' placement="top" arrow>
                        <Link underline='always' sx={{ cursor: 'pointer'}}>
                            { row.title }
                        </Link>
                    </Tooltip>
                </NextLiknk>
            ) 
        }
     },
    { field: 'marca', headerName: 'Marca' },
    // { field: 'categorias', headerName: 'Categorias' },
    { 
        field: 'colores', 
        headerName: 'Colores', 
        width: 300,
        renderCell: ({row}: GridValueGetterParams) => { 
            return (
                row.colores.map( (c: any) => (
                    <Tooltip key={c.color+c.nombre} title={c.nombre} placement="top" arrow>
                        <Avatar sx={{ bgcolor: c.color, width: 20, height: 20, border: '2px solid #666666', ml: 1 }}>
                            {''}
                        </Avatar>
                    </Tooltip>

                ) )
            ) 
        }
    },
    { field: 'tallas', headerName: 'Tallas', width: 250  },
    { field: 'visitas', headerName: 'Visitas', width: 250 },
    
];




const ProductsPage = () => {

    const [rowsSelected, setrowsSelected] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);
    const { data, error } = useSWR<IProduct[]>('/api/admin/products');
    const [ products, setProducts ] = useState<IProduct[]>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openAlert, setOpenAlert] = useState(false)

    useEffect(() => {
      if(data){
        setProducts(data)
      }
    }, [data])


    const handleClickOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
      };

    const deleteRowsSelected = async() => {

        setOpenDialog(false);
        const previosProducts = products.map( product => ({ ...product }));
        let updatedProducts = products.filter( product => {
            return !rowsSelected.find( productId  => {
                return productId === product._id;
            });
        })

        setIsDeleted(true);

        setProducts(updatedProducts)
        try {
            const resp = await nextStoreApi({
                url: '/admin/products',
                method: 'DELETE',
                data: rowsSelected
            })

            setIsDeleted(false);
            setOpenAlert(true);
            
        } catch (error) {
            setProducts( previosProducts );
            console.log(error);
            setIsDeleted(false);
            
        }
        
    }



    if ( !products && !error ) return (<></>);
    
    const rows = products!.map( product => ({
        id: product._id,
        title: product.title,
        img: product.img[0],
        marca: product.marca,
        categorias: product.categorias,
        descripcion: product.descripcion,
        colores: product.colores,
        tallas: product.tallas.join(', '),
        slug: product.slug,
        tags: product.tags,
        visitas: product.visitas,
        guiaTallas: product.guiaTallas
    }));


  return (
    <>
    <AdminLayout 
        title={`Productos`} 
        subTitle={'Mantenimiento de productos'}
        icon={ <CategoryOutlined /> }
    >
        

        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
            <Tooltip title='Crear producto' placement="top" arrow>
                <IconButton href="/admin/products/new">
                    <AddOutlined />
                </IconButton>
            </Tooltip>
            <Tooltip 
                title={ rowsSelected.length === 0 ? 'Seleccione un producto' : `Eliminar ${ rowsSelected.length > 1 ? 'productos seleccionados' : 'producto seleccionado'}`} 
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
            <Grid item xs={12} sx={{ minHeight:'calc(100vh - 200px)', width: '100%' }}>

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
            {`¿Desea eliminar ${ rowsSelected.length === 1 ? 'el producto seleccionado' : 'los productos seleccionados'}?`}
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

export default ProductsPage;