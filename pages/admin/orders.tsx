import { ConfirmationNumberOutlined } from '@mui/icons-material'
import { Chip, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import useSWR from 'swr';

import { AdminLayout } from '../../components/layouts'
import { FullScreenLoading } from '../../components/ui';
import { IOrder, IUser } from '../../interfaces';


const columns:GridColDef[] = [
    { field: 'id', headerName: 'Cotización ID', width: 250 },
    { field: 'email', headerName: 'Correo', width: 250 },
    { field: 'name', headerName: 'Nombre Completo', width: 250 },
    {
        field: 'status',
        headerName: 'Estatus',
        width: 150,
        renderCell: ({ row }: GridValueGetterParams) => {
            switch ( row.status ) {
                case 'pendiente':
                    
                    return ( <Chip variant='outlined' label="Pendiente" color="error" /> )
                case 'en proceso':
                    
                    return ( <Chip variant='outlined' label="En proceso" color="warning" /> )
                case 'finalizado':
                    
                    return ( <Chip variant='outlined' label="Finalizado" color="success" /> )
            
                default:
                    return (<></>);
            }
        }
    },
    { field: 'noProducts', headerName: 'No.Productos', align: 'center', width: 150 },
    {
        field: 'check',
        headerName: 'Ver cotización',
        renderCell: ({ row }: GridValueGetterParams) => {
            return (
                <a href={ `/admin/orders/${ row.id }` } target="_blank" rel="noreferrer" >
                    Ver cotización
                </a>
            )
        }
    },
    { field: 'createdAt', headerName: 'Fecha de creación', width: 300 },

];




const OrdersPage = () => {

    const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

    if ( !data && !error ) return (<></>);
    console.log(data)
    const rows = data!.map( order => {

        const date = new Date( order.createdAt! );

        let formatDate = `${date.getDate() < 10 ? '0'+date.getDate() : date.getDate() }-${date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth()}-${date.getFullYear()} ${date.getHours() < 10 ? '0'+date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds()}`
        console.log(order)
        return {
            id    : order._id,
            email : (order.user as IUser).email,
            name  : (order.user as IUser).name,
            status: order.status,
            noProducts: order.numberOfItems,
            createdAt: formatDate,

        }
    });


  return (
    <AdminLayout 
        title={'Cotizaciónes'} 
        subTitle={'Mantenimiento de cotizaciónes'}
        icon={ <ConfirmationNumberOutlined /> }
    >
         <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ minHeight:'calc(100vh - 250px)', width: '100%' }}>
                {
                    data ? (
                        <DataGrid 
                            rows={ rows }
                            columns={ columns }
                            pageSize={ 10 }
                            rowsPerPageOptions={ [10] }
                        />
                        
                    ) : (
                        <FullScreenLoading />
                    )
                }

            </Grid>
        </Grid>
        
    </AdminLayout>
  )
}

export default OrdersPage