import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { AttachMoneyOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, CategoryOutlined, CancelPresentationOutlined, ProductionQuantityLimitsOutlined, AccessTimeOutlined } from '@mui/icons-material';
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CategoryIcon from '@mui/icons-material/Category';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { AdminLayout } from '../../components/layouts'
import { Grid, Typography, Box, Card } from '@mui/material';
import { SummaryTile } from '../../components/admin'
import { DashboardSummaryResponse } from '../../interfaces';
import { Chart } from "react-google-charts";


const DashboardPage = () => {

    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000 // 30 segundos
    });

    const [refreshIn, setRefreshIn] = useState(30);

    useEffect(() => {
      const interval = setInterval(()=>{
        // console.log('Tick');
        setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn - 1: 30 );
      }, 1000 );

      return () => clearInterval(interval)
    }, []);

    // useEffect(() => {
    //     const getProductByBrand = () => {

    //         let arr: any[] = [];
    //         data?.productosMarcas.map( (product) => {
    //             if(arr.length < 1){
    //                 arr.push([product.marca, 1])
    //             }else{
                    

    //             }
                
              
    //         })




    //     }

    //     // // getProductByBrand()

    // }, [data])
    

   



    if ( !error && !data ) {
         return <></>
    }

    if ( error ){

        return <Typography>Error al cargar la información</Typography>
    }


    const {
        numeroOrdenes,     
        ordenesPendientes, 
        ordenesEnProceso,  
        ordenesFinalizadas,
        clientes,          
        productos,         
        categorias,        
        marcas,            
        numeroVisitas,     
        productosMarcas,
    } = data!;

  return (
    <AdminLayout
        title='Dashboard'
        subTitle='Estadisticas generales'
        icon={ <DashboardOutlined /> }
    >
        <Grid item xs={12} display='flex'>
            <Typography color='text.secondary'>Actualización en: {refreshIn} </Typography>
            <Box flex={ 1 }/>
            <Typography color='text.secondary'>Numero de visitas: { numeroVisitas[0].numero } </Typography>

        </Grid>
        
        <Grid container spacing={2} display='flex' justifyContent='center'>
            
        
        <Grid container spacing={2} item xs={12}>
            
            <SummaryTile 
                title={ numeroOrdenes }
                subTitle="Cotizaciónes totales"
                icon={ <ReceiptLongIcon color="primary" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ ordenesPendientes }
                subTitle="Cotizaciónes pendientes"
                icon={ <ErrorIcon color="primary" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ ordenesEnProceso }
                subTitle="Cotizaciónes en proceso"
                icon={ <PendingIcon color="primary" sx={{ fontSize: 40 }} /> }
            />
            
            <SummaryTile 
                title={ ordenesFinalizadas }
                subTitle="Cotizaciónes finalizadas"
                icon={ <CheckCircleIcon color="primary" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ clientes }
                subTitle="Clientes"
                icon={ <PeopleAltIcon color="primary" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ productos }
                subTitle="Productos"
                icon={ <Inventory2Icon color="primary" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ categorias }
                subTitle="Categorias"
                icon={ <CategoryIcon color="primary" sx={{ fontSize: 40 }} /> }
            />

            <SummaryTile 
                title={ marcas }
                subTitle="Marcas"
                icon={ <LocalOfferIcon color="primary" sx={{ fontSize: 40 }} /> }
            />


        </Grid>

        <Grid item xs={12} md={8} display='flex' justifyContent='center'>
            <Card sx={{ width: '100%'}} elevation={0}>
                <Chart
                    chartType="PieChart"
                    data={[ ['Nombre', 'Cantidad'] , ...productosMarcas]}
                    width="100%"
                    height='calc(100vh - 200px)'  
                    options={{title: "Productos por marca"}}             
                />

            </Card>

        </Grid>
        </Grid>
    </AdminLayout>
  )
}

export default DashboardPage