import NextLink from 'next/link';
import { GetServerSideProps, NextPage } from 'next';

import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layouts';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';
import { TitleUi } from '../../components/ui/TitleUi';



const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 250 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
    { field: 'quantity', headerName: 'Cantidad', width: 100 },

    {
        field: 'status',
        headerName: 'Estatus',
        description: 'Muestra información del estatus de la cotización',
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
            switch ( params.row.status ) {
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
    {
        field: 'Cotización',
        headerName: 'Ver cotización',
        width: 200,
        sortable: false,
        renderCell: (params: GridValueGetterParams) => {
            return (
               <NextLink href={`/orders/${ params.row.orderId }`} passHref>
                    <Link underline='always'>
                        Ver cotización
                    </Link>
               </NextLink>
            )
        }
    },
    { field: 'date', headerName: 'Fecha de creación', width: 300 },
];

//19
interface Props {
    orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {

    const rows = orders.map( (order, idx) => {
        const date = new Date( order.createdAt! );

        let formatDate = `${date.getDate() < 10 ? '0'+date.getDate() : date.getDate() }-${date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth()}-${date.getFullYear()} ${date.getHours() < 10 ? '0'+date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds()}`

        return {
            id: order._id,
            status: order.status,
            fullname: `${ order.shippingAddress.name } ${ order.shippingAddress.lastname }`,
            quantity: order.numberOfItems,
            orderId: order._id,
            date: formatDate,

        }
    });

  return (
    <ShopLayout title={'Historial de cotizaciónes'} pageDescription={'Historial de cotizaciónes del cliente'}>
        
        <Grid sx={{ pt: 3, pb: 3, textAlign:'center'}}>
            <TitleUi title='Historial de cotizaciónes'/>

        </Grid>

        <Grid container className='fadeIn'>
            <Grid item xs={12} sx={{ minHeight:'calc(100vh - 250px)', width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                />

            </Grid>
        </Grid>

    </ShopLayout>
  )
}

//19
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    
    const session: any = await getSession({ req });

    if( !session ){
        return {
            redirect: {
                destination: '/auth/login?/orders/history',
                permanent: false,
            }
        }
    }

    const orders = await dbOrders.getOrdersByUser( session.user._id );


    return {
        props: {
            orders
        }
    }
}

export default HistoryPage