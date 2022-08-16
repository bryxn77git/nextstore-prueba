import { useState, useEffect, useContext, ChangeEvent } from 'react';
import { useRouter } from "next/router";
import { LinearProgress, useMediaQuery, useTheme, Pagination } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Tooltip, Typography, CircularProgress } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';

import { ShopLayout } from "../../components/layouts"
import { ProductList } from "../../components/products"
import { useProducts } from "../../hooks";
import { ProductContext } from '../../context/product/ProductContext';


const Categoria = () => {

  const router = useRouter();
  const url = router.asPath.split('/')[2].split('?');
  const category = url[0].replace('%20', ' ').toLocaleUpperCase();
  
  const { products, productsCount, isLoading } = useProducts(`/products?categorias=${router.asPath.split('/')[2]}`);
  const { changeProducts, producstList, categoryList } = useContext(ProductContext);

  const theme = useTheme();
  const winsowsSize = useMediaQuery(theme.breakpoints.up('sm')) ? 'h6' : 'subtitle1';

  const count = Math.ceil(productsCount.length / 15)
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('a-z');
  const [brands, setBrands] = useState<string[]>([]);
  const [brandsSelected, setBrandsSelected] = useState<string[]>([])
  const [sizes, setSizes] = useState<string[]>([]);
  const [sizesSelected, setSizesSelected] = useState<string[]>([])
  const [colors, setColors] = useState<{ 
    nombre: string, 
    color: string 
  }[]>([]);
  const [colorSelected, setColorSelected] = useState<string[]>([]);

  
  useEffect(() => {

    const urlSearchParams = new URLSearchParams(window.location.search)
    if( urlSearchParams.get('sort') !== null ){
      setSort(urlSearchParams.get('sort')!)
    }
    if( urlSearchParams.get('brands') !== null ){
      setBrandsSelected( urlSearchParams.get('brands')?.split(',')! )
    }
    if( urlSearchParams.get('sizes') !== null ){
      setSizesSelected( urlSearchParams.get('sizes')?.split(',')! )
    }  
    if( urlSearchParams.get('colors') !== null ){
      setColorSelected( urlSearchParams.get('colors')?.split(',')! )
    }
    if( urlSearchParams.get('page') !== null ){
      setPage( parseInt(urlSearchParams.get('page')!) )
    }


  }, [])

  

  useEffect(() => {
    if( producstList.length !== 0 ){
        if( categoryList !== category ){
            changeProducts( productsCount, category) 
            setPage( 1 )
        }
    }else {
      changeProducts( productsCount, category) 
    }
    

    
    
    let marcas:string[] = [];
    let tallas:string[] = [];
    let colores: { 
      nombre: string, 
      color: string 
    }[] = [];
    
    if( producstList.length !== 0 ){
    producstList.map( product => {
      if( !marcas.includes( product.marca ) ){
        marcas = [ ...marcas, product.marca]
      }
      
      product.tallas.map( talla => {
        if( !tallas.includes( talla ) ){
          tallas = [ ...tallas, talla] 
        } 
      })

      product.colores.map( color => {
        if( !colores.find( c => c.nombre === color.nombre) ){
          colores = [ ...colores, color]
        }
      })

      
    });
    setBrands(marcas);
    setSizes(tallas); 
    setColors(colores);
  }
    
    
  }, [products, producstList]);

  


  useEffect(() => {
    if( router.isReady ){
      router.replace(`${category.toLocaleLowerCase()}?sort=${sort}&brands=${brandsSelected.toString() || 'all'}&sizes=${sizesSelected.toString() || 'all'}&colors=${colorSelected.toString() || 'all'}&page=${page}`);

    }
    
  }, [sort, brandsSelected, sizesSelected, colorSelected, page])

  
  
  

  const handleChange = (event: SelectChangeEvent) => { 

    const sortSelected = event.target.value
 
    setSort( sortSelected );


  };


  const handleShowBrand = (e: any, checked: boolean) => {

    brandsSelected.filter( brand => brand !== 'all')

    if(checked){
        if( !brandsSelected.find(v => v === e.target.labels[0].innerText)){
            setBrandsSelected([...brandsSelected, e.target.labels[0].innerText]);
   
        }
    }else{
        if(brandsSelected.length === 1){
            setBrandsSelected([]);
        }else{
            let arr = brandsSelected.filter(v => v !== e.target.labels[0].innerText)
            setBrandsSelected(arr)
        }         
    }

    // router.push(`${category.toLocaleLowerCase()}?sort=${sort}&brands=${brandsSelected}`);

  }

    const handleShowSize = (e: any, checked: boolean) => {

      sizesSelected.filter( size => size !== 'all')

      const sizeAdded = e.target.labels[0].innerText;

      if(checked){
        if( !sizesSelected.find(v => v === e.target.labels[0].innerText)){
          setSizesSelected([...sizesSelected, e.target.labels[0].innerText]);
        }
      }else{
          if(sizesSelected.length === 1){
            setSizesSelected([]);
          }else{
              let arr = sizesSelected.filter((size: string) => size !== sizeAdded)
              setSizesSelected(arr)
          }         
      }

  }

  const changeStateColor = ( position: number, colorAdded: { 
    nombre: string, 
    color: string 
  }, checked: boolean ) => { 

    colorSelected.filter( color => color !== 'all')

    if(!checked){
        if( !colorSelected.find( color => color === colorAdded.nombre)){
          setColorSelected([...colorSelected, colorAdded.nombre]);
        }
    }else{
        if(colorSelected.length === 1){
            setColorSelected([]);
        }else{
            let arr = colorSelected.filter((color: string) => color !== colorAdded.nombre)
            setColorSelected(arr)
        }         
    }

  }
  


  return (
    <ShopLayout title='Next Store Uniforms - Inicio' pageDescription={'Encuentra los mejores uniformes para tu empresa'} >
      
      <Grid container justifyContent='center' className='main-grid'>

      <Grid
        container
        sx={{ pt: {xs: 1, md: 10} }} 
        display='flex' 
        justifyContent='center'
        className="home-grid"
        minHeight='calc(100vh - 200px)'
      >
        <Grid item xs={12} md={3} sx={{ pl: {xs: 0, md: 5 }, mb: 5}} >
          <Grid sx={{ backgroundColor: '#f2f2f2', p: 2  }} >
            <Box display='flex' justifyContent='center' sx={{ pb: 1 }}>
              <Typography variant={winsowsSize} fontWeight={600} color='text.secondary' >
                { 
                  !isLoading && category 
                }
              </Typography>
            </Box>
            <Box display='flex' justifyContent='center'>
              <Divider sx={{ mt: 1, mb: 2, width: '100%', height: 5 }}/>           
            </Box>

            <FormControl fullWidth size="small">
              <InputLabel >Ordenar</InputLabel>
              <Select
                value={sort}
                defaultValue={sort}
                label="Ordenar"
                onChange={handleChange}
              >
                <MenuItem value={'a-z'} >A-Z</MenuItem>
                <MenuItem value={'z-a'}>Z-A</MenuItem>
                <MenuItem value={'populares'}>Populares</MenuItem>
              </Select>
            </FormControl>

            <Box display='flex' justifyContent='center'>
              <Divider sx={{ mt: 2 , mb: 2, width: '100%' }}/>           
            </Box>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography color='text.secondary'>Marcas</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {
                  
                  producstList.length !== 0 && (
                    brands.length !== 0 && (
                       brands.map( marca => {
                         return <FormControlLabel key={marca} checked={brandsSelected.includes(marca)} control={<Checkbox />} label={ marca.charAt(0).toLocaleUpperCase() + marca.slice(1) } onChange={ handleShowBrand } />
 
                       }
                     ))

                  ) 
                    
                      

                    
                  }
                </FormGroup>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography color='text.secondary'>Tallas</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {
                    sizes.length !== 0 && (
                      sizes.map( size => (
                        <FormControlLabel key={size} checked={sizesSelected.includes(size)} control={<Checkbox />} label={ size } onChange={ handleShowSize } />
                      ))
                    )
                  }
                </FormGroup>
                
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography color='text.secondary'>Colores</Typography>
              </AccordionSummary>
              <AccordionDetails>

                {
                  colors.length !== 0 && (
                    colors.map( (color, index) => (
                      <Tooltip title={ color.nombre } arrow key={color.nombre + color.color} placement="top"> 
                        <IconButton onClick={ () => { changeStateColor(index, color, colorSelected.includes( color.nombre ) ) } } key={index}>
                          <Avatar sx={{ bgcolor: color.color, width: 24, height: 24 }}>
                            { colorSelected.includes( color.nombre ) ? (
                              <CheckIcon />
                              ) : ''
                            }
                          </Avatar>
                        </IconButton>
  
                      </Tooltip>
                    ))

                  )
                }
                
              </AccordionDetails>
            </Accordion>
            

          </Grid>
        </Grid>

        <Grid item xs={12} md={9}  sx={{ pl: {xs: 1, md: 10}, pr: {xs: 1, md: 10}}}>
          {
            !isLoading ? (
              <>
                <Grid 
                container 
                direction='row' 
                display='flex' 
                sx={{ mb: 1 }}
                // justifyContent='center' 
                >
                  <Typography color='text.secondary' variant='caption'>Encontrados: { productsCount.length } {productsCount.length > 1 ? 'productos' : 'producto'}</Typography>
                  <Box flex={1}/>
                  <Typography color='text.secondary' variant='caption'>Página: {page} de { count }</Typography>
                </Grid>
                <ProductList 
                  products={ products as any }
                />
                <Grid 
                container 
                direction='row' 
                display='flex' 
                justifyContent='center' 
                >
                  {
                    count > 1 && (
                      <Pagination count={ count } page={ page } onChange={ (event: ChangeEvent<unknown>, value: number) => setPage(value)  } />
                    )

                  }

                </Grid>
              </>
            ) : (
              <Grid 
                container 
                direction='row' 
                display='flex' 
                justifyContent='center' 
              >
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 10 }}>
                  <CircularProgress />

                </Box>
              </Grid>
            )
          }
          
        </Grid>
      </Grid>

    </Grid>

    </ShopLayout>
  )
}


export default Categoria