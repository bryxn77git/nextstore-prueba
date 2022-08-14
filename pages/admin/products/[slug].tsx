
import { ChangeEvent, FC, useEffect, useRef, useState} from 'react';
import { GetServerSideProps } from 'next'
import { AdminLayout } from '../../../components/layouts'
import { IProduct, IMarcas, ICategorias } from '../../../interfaces';
import { DriveFileRenameOutline, SaveOutlined, UploadOutlined, AddOutlined, ColorLens, Upload } from '@mui/icons-material';
import { dbProducts } from '../../../database';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField, MenuItem, Select, InputLabel, Tooltip, IconButton, OutlinedInput, Typography, SelectChangeEvent, Backdrop, CircularProgress, Alert, Snackbar } from '@mui/material';
import { useForm } from 'react-hook-form';

import Product from '../../../models/Products';
import { useRouter } from 'next/router';
import { nextStoreApi } from '../../../api';
import { colorValidation } from '../../../utils';
import AddIcon from '@mui/icons-material/Add';

import { ChromePicker  } from 'react-color'
import { getAllBrands } from '../../../database/dbMarcas';
import { getAllCategoies } from '../../../database/dbCategories';

// const validSizes = ['XS','S','M','L','XL','2XL','3XL','28', '29' , '30' , '31' , '32' , '33' , '34'];
// const validSizesPants = ['28/32','30/32','32/32','33/32','XL','2XL','3XL','28', '29' , '30' , '31' , '32' , '33' , '34'];

interface FormData {
    _id?       : string;
    title      : string;
    marca      : string;
    img        : string[];
    categorias : string[];
    descripcion: string;
    colores    : { 
                    nombre: string, 
                    color: string 
                }[];
    tallas     : string[];
    slug       : string;
    tags       : string[];
    visitas    : number;
    guiaTallas : string;
    codigo     : string;
}

interface Props {
    product: IProduct;
    marcas: IMarcas[];
    // categorias: ICategorias[]
}

const ProductAdminPage:FC<Props> = ({ product, marcas }) => {


    const router = useRouter();
    const dragItem = useRef<any>(null);
    const dragOverItem = useRef<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null)
    const fileInputRefGuia = useRef<HTMLInputElement>(null)
    const [newTagValue, setNewTagValue] = useState('');
    const [newSizeValue, setNewSizeValue] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [sizeType, setSizeType] = useState('numerico');
    const [colorPicker, setColorPicker] = useState(false)
    const [colorPickerGet, setColorPickerGet] = useState('#ffffff')
    const [colorNameText, setColorNameText] = useState('')
    const [openAlert, setOpenAlert] = useState(false)
    const [categorias, setCategorias] = useState<string[]>([])
    

    const { register, handleSubmit, formState:{errors}, getValues, setValue, watch } = useForm<FormData>({
        defaultValues: product
    })

    useEffect(() => {
        const brand = getValues('marca');
        if( brand !== '' ){
            marcas.map( marca => marca.name === brand && (
                marca.categories.length > 0 && setCategorias(marca.categories)
            ) )
        }

    }, [])

    useEffect(() => {
        const subscription = watch(( value, { name, type } ) => {
            if ( name === 'title' ) {
                const newSlug = value.title?.trim()
                        .replaceAll(' ', '_')
                        .replaceAll("'", '')
                        .toLocaleLowerCase() || '';

                    setValue('slug', newSlug);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, setValue])
    

    const onNewTag = () => {
        const newTag = newTagValue.trim().toLocaleLowerCase();
        setNewTagValue('');
        const currentTags = getValues('tags');

        if( currentTags.includes( newTag ) ) {
            return;
        }

        currentTags.push( newTag );
    }

    const onNewSize = () => {
        const newSize = newSizeValue.trim().toLocaleUpperCase();
        setNewSizeValue('');
        const currentSize = getValues('tallas');

        if( currentSize.includes( newSize ) ) {
            return;
        }

        currentSize.push( newSize );
    }

    const dragStart = (e: any, position: any) => {
        dragItem.current = position;
    };
     
    const dragEnter = (e: any, position: any) => {
        dragOverItem.current = position;
    };

    const drop = (e: any) => {
        const copyListItems = [...getValues('tallas')];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setValue('tallas', copyListItems, { shouldValidate: true });
      };

    const onChangeSize = ( size: string ) => {
        const currentSizes = getValues('tallas');
        if( currentSizes.includes(size) ){
            return setValue('tallas', currentSizes.filter( s => s !== size ), { shouldValidate: true })
        }

        setValue('tallas', [ ...currentSizes, size ], { shouldValidate: true });
    }


    const onDeleteTag = ( tag: string ) => {
        const updateTags = getValues('tags').filter( t => t !== tag );
        setValue('tags', updateTags, { shouldValidate: true })

    }

    const onDeleteSize = ( tag: string ) => {
        const updateSize = getValues('tallas').filter( t => t !== tag );
        setValue('tallas', updateSize, { shouldValidate: true })

    }

    const onDeleteColor = ( color: string ) => {
        const updateColor = getValues('colores').filter( t => t.color !== color );
        setValue('colores', updateColor, { shouldValidate: true })
    }

    const handleCategoryUpdate = ( event: any ) => {
        
        const { target: {value } } = event;

        setValue('categorias', typeof value === 'string' ? value.split(',') : value, { shouldValidate: true });
    }

    const handleSizeUpdate = ( event: any ) => {
        
        const { target: {value } } = event;

        setValue('tallas', typeof value === 'string' ? value.split(',') : value, { shouldValidate: true });
    }

    const handleChangeMarca = ( event: any ) => {

        setValue('categorias', [], { shouldValidate: true })
        
        marcas.map( marca => marca.name === event.target.value && (
                marca.categories.length > 0 && setCategorias(marca.categories)
        ))
         
        
        setValue('marca', event.target.value, { shouldValidate: true })
    }

    const handleSelectedColor = () => {
        setColorNameText('');
        setColorPicker(false);
        const newColor = {
            color: colorPickerGet,
            nombre: colorNameText
        }
        setValue('colores', [...getValues('colores'), newColor], { shouldValidate: true })

    }

    const onFileSelected = async( { target }: ChangeEvent<HTMLInputElement> ) => {

        if( !target.files || target.isDefaultNamespace.length === 0 ){
            return;
        }

        try {
            for( const file of target.files ) {
                const formData = new FormData();
                formData.append('file', file);
                const { data } = await nextStoreApi.post<{ message: string }>('/admin/upload', formData);
                setValue('img', [ ...getValues('img'), data.message ], { shouldValidate: true })
            }
        } catch (error) {
            console.log({error})
            
        }
    }

    const onFileSelectedGuia = async( { target }: ChangeEvent<HTMLInputElement> ) => {

        if( !target.files || target.isDefaultNamespace.length === 0 ){
            return;
        }

        try {
            for( const file of target.files ) {
                const formData = new FormData();
                formData.append('file', file);
                const { data } = await nextStoreApi.post<{ message: string }>('/admin/upload', formData);
                setValue('guiaTallas', data.message , { shouldValidate: true })
            }
        } catch (error) {
            console.log({error})
            
        }
    }

    const onDeleteImage = ( image: string ) => {
        setValue(
            'img',
            getValues('img').filter( img => img !== image ),
            { shouldValidate: true }
        )
    }

    const onDeleteImageGuia = ( image: string ) => {
        setValue(
            'guiaTallas',
            '',
            { shouldValidate: true }
        )
    }

    const onSubmit = async( form: FormData ) => {

        form.title = form.title.toLowerCase()
        
        if( form.img.length < 1 ) return alert('Mínimo una imagen');
        setIsSaving(true);

        try {
            const resp = await nextStoreApi({
                url: '/admin/products',
                method: form._id ? 'PUT' : 'POST',
                data: form
            })

            if( !form._id ){
                router.replace(`/admin/products`);
                setIsSaving(false);
                setOpenAlert(true);
            }else {
                // router.push(`/admin/products`);
                setIsSaving(false);
                setOpenAlert(true);
            }
        } catch (error) {
            console.log(error);
            setIsSaving(false);
            
        }
    }

    return (
        <>
        <AdminLayout 
            title={'Producto'} 
            subTitle={ product.title !== undefined ? `Editando: ${ product.title }`: 'Nuevo producto'}
            icon={<DriveFileRenameOutline />}
        >
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        variant='contained'
                        startIcon={ product._id ? <SaveOutlined /> : <AddIcon /> }
                        sx={{ width: '150px' }}
                        type="submit"
                    >
                        {
                            product._id ? 'Guardar' : 'Crear'
                        }
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Nombre"
                            variant="outlined"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('title', {
                                required: true,
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.title }
                            helperText={ errors.title?.message }
                        />

                        <Grid container sx={{ mb: 1 }}>
                            <Grid item xs={11}>
                                <FormControl fullWidth>
                                    <InputLabel>Marca</InputLabel>
                                    <Select
                                        value={getValues('marca') || ''}
                                        label="Marca"
                                        
                                        // size='small'
                                        { ...register('marca', {required: true })}
                                        error={ !!errors.marca }
                                        onChange={ handleChangeMarca }
                                        >
                                        {
                                            marcas.map( brand => (
                                                <MenuItem key={brand.name} value={brand.name}>{ brand.name[0].toUpperCase() + brand.name.slice(1) }</MenuItem>
                                            ))
                                        }

                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={1} display='flex' alignItems='center' justifyContent='center'>
                                <Tooltip title='Agregar marca' placement="top" arrow>
                                    <IconButton size='large' href='/admin/brands/new'>
                                        <AddOutlined />
                                    </IconButton>
                                </Tooltip>
                            </Grid>

                        </Grid>

                        <Grid container sx={{ mb: 1 }}>
                            <Grid item xs={11}>
                                <FormControl fullWidth>
                                    <InputLabel>Categorias</InputLabel>
                                    <Select
                                        multiple
                                        label='Categorias'
                                        value={getValues('categorias')}
                                        // input={<OutlinedInput  />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} color='primary' sx={{ color: '#ffffff'}}/>
                                            ))}
                                            </Box>
                                        )}
                                        { ...register('categorias', {required: true })}
                                        disabled={ getValues('marca') === '' } 
                                        onChange={ handleCategoryUpdate }

                                        error={ !!errors.categorias }
                                    >
                                    {
                                        categorias.length > 0 && (
                                            categorias.map((category) => (
                                                <MenuItem
                                                    key={category}
                                                    value={category}
                                                >
                                                    {
                                                        category[0].toUpperCase() + category.slice(1)
                                                    }
                                                </MenuItem>
                                            ))

                                        ) 
                                    }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={1} display='flex' alignItems='center' justifyContent='center'>
                                <Tooltip title='Agregar categoria' placement="top" arrow>
                                    <IconButton size='large' href='/admin/categories/new'>
                                        <AddOutlined />
                                    </IconButton>
                                </Tooltip>
                            </Grid>

                        </Grid>
                        

                        <TextField
                            label="Descripción"
                             variant="outlined"
                            fullWidth 
                            multiline
                            rows={6}
                            sx={{ mb: 1 }}
                            { ...register('descripcion', {
                                required: true,
                            })}
                            error={ !!errors.descripcion }
                            helperText={ errors.descripcion?.message }
                        />

                        <TextField
                            label="Slug - URL"
                            variant="outlined"
                            fullWidth 
                            // value={getValues('slug')}
                            sx={{ mb: 1 }}
                            { ...register('slug', {
                                required: true,
                                validate: (val) => val.trim().includes(' ') ? 'No puede tener espacios en blanco':undefined
                            })}
                            error={ !!errors.slug }
                            helperText={ errors.slug?.message }
                        />

                        <TextField
                            label="Etiquetas"
                             variant="outlined"
                            fullWidth 
                            sx={{ mb: 1 }}
                            helperText="Presiona [spacebar] para agregar"
                            value={ newTagValue }
                            onChange={ ({target}) => setNewTagValue(target.value) }
                            onKeyUp={ ({ code })=> code === 'Space' ? onNewTag() : undefined }
                        />
                        
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                        component="ul">
                            {
                                getValues('tags').map((tag) => {

                                return (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={ () => onDeleteTag(tag)}
                                        color="primary"
                                        
                                        sx={{ ml: 1, mt: 1, color: '#ffffff'}}
                                    />
                                );
                            })}
                        </Box>

                        

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }> 

                        <TextField
                            label="Codigo"
                            variant="outlined"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('codigo', {required: true })}
                            error={ !!errors.codigo }
                        />

                        <Grid container sx={{ mb: 1 }}  display='flex' justifyContent='end'>
                            <Grid item xs={11}>
                                <TextField
                                    label="Nombre del color"
                                    variant="outlined"
                                    fullWidth 
                                    value={ colorNameText }
                                    onChange={ (e) => setColorNameText(e.target.value)}
                                    // { ...register('colores', {required: true })}
                                    // error={ !!errors.colores }
                                />
                            </Grid>
                            <Grid item xs={1} display='flex' alignItems='center' justifyContent='center'>
                                <Tooltip title='Seleccionar color' placement="top" arrow>
                                    <span>
                                        <IconButton size='large' onClick={ () => setColorPicker(true) } disabled={ colorNameText.length === 0 ? true : false}>
                                            <ColorLens />
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Grid>
                            {
                                colorPicker && (
                                    <div style={{
                                        position: 'absolute',
                                        zIndex: '2',
                                        
                                    }}>

                                        <div style={{
                                            position: 'fixed',
                                            top: '0px',
                                            right: '0px',
                                            bottom: '0px',
                                            left: '0px',
                                        }} onClick={ handleSelectedColor }/>
                                        <ChromePicker color={ colorPickerGet } onChangeComplete={ (color) => setColorPickerGet(color.hex) } />
                                        
                                    </div>

                                )
                            }
                            

                        </Grid>

                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                            
                        }}
                        component="ul">
                            {
                                getValues('colores').map((color) => {

                                return (
                                    <Chip
                                        key={color.color+color.nombre}
                                        label={color.nombre}
                                        onDelete={ () => onDeleteColor(color.color)}
                                        
                                        sx={{ 
                                            border: '1px solid #666666',
                                            ml: 1, 

                                            mb: 1,
                                            color: colorValidation.colorLuma(color.color) < 60 ? '#ffffff' : '#000000', 
                                            backgroundColor: color.color,
                                            '.MuiChip-deleteIcon': {
                                                color: colorValidation.colorLuma(color.color) < 60 ? '#ffffff' : '#000000',
                                                ":hover": {
                                                    backgroundColor: 'rgba(13,13,13,0.0)',
                                                    transition: 'all 0.3s ease-in-out',
                                                    color: '#C2BB4F'
                                                },
                                            },
                                            
                                        }}
                                    />
                                );
                            })}
                        </Box>

                        
                        {/* <FormControl sx={{ my: 1 }}>
                            <FormLabel>Tipo de medida:</FormLabel>
                            <RadioGroup
                                row
                                value={ sizeType }
                                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => { setSizeType((e.target as HTMLInputElement).value); } }
                            >
                                <FormControlLabel value="numerico" control={<Radio />} label="Numérico" />
                                <FormControlLabel value="alfanumerico" control={<Radio />} label="Alfanumérico" />
                            </RadioGroup>
                        </FormControl> */}

                        <Grid container sx={{ mb: 1}}>
                            <Grid item xs={12}>
                            <TextField
                            label="Tallas"
                            variant="outlined"
                            fullWidth 
                            sx={{ mb: 1 }}
                            helperText="Presiona [spacebar] para agregar"
                            value={ newSizeValue }
                            onChange={ ({target}) => setNewSizeValue(target.value) }
                            onKeyUp={ ({ code })=> code === 'Space' ? onNewSize() : undefined }
                        />
                        
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                        component="ul">
                            {
                                getValues('tallas').map((tag, index) => {

                                return (
                                    <div
                                        key={index}
                                        onDragStart={(e) => dragStart(e, index)}
                                        onDragEnter={(e) => dragEnter(e, index)}
                                        onDragEnd={drop}
                                        draggable
                                    >
                                    <Chip
                                        
                                        label={tag}
                                        onDelete={ () => onDeleteSize(tag)}
                                        color="primary"
                                        
                                        sx={{ ml: 1, mt: 1, color: '#ffffff'}}
                                    />
                                    </div>
                                );
                            })}
                        </Box>
                                {/* <FormControl fullWidth>
                                    <InputLabel>Tallas</InputLabel>
                                    <Select
                                        multiple
                                        label='Tallas'
                                        value={getValues('tallas')}
                                        // onChange={handleChange}
                                        // input={<OutlinedInput  />}
                                        renderValue={(selected) => (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} color='primary' sx={{ color: '#ffffff'}}/>
                                            ))}
                                            </Box>
                                        )}
                                        { ...register('tallas', {required: true })}
                                        error={ !!errors.tallas }
                                        onChange={ handleSizeUpdate }
                                    >
                                    {
                                        validSizes.map((type, index) => (
                                            <MenuItem
                                                key={index}
                                                value={type}
                                            >
                                                {type}
                                            </MenuItem>
                                        ))
                                    }
                                    </Select>
                                </FormControl> */}
                            </Grid>

                        </Grid>

                        
                        <Box display='flex' flexDirection="column" sx={{ mb: 1 }}>
                            <FormLabel sx={{ mb:1}}>Guia de tallas</FormLabel>
                            <Button
                                variant='contained'
                                fullWidth
                                startIcon={ <Upload /> }
                                sx={{ mb: 3 }}
                                onClick={ () => fileInputRefGuia.current?.click() }
                            >
                                Cargar imagen
                            </Button>
                            <input 
                                ref={ fileInputRefGuia }
                                type='file'
                                accept='image/png image/gif image/jpeg image/webp'
                                style={{ display: 'none'}}
                                onChange={ onFileSelectedGuia }
                            />

                            {/* <Chip 
                                label="Es necesario al menos 1 imagen"
                                color='error'
                                variant='outlined'
                                sx={{ display: getValues('img').length < 1 ? 'flex': 'none' }}
                            /> */}

                            <Grid container spacing={2}>
                                
                                {
                                    getValues('guiaTallas') && (

                                    <Grid item xs={4} sm={3}>
                                        <Card>
                                            <CardMedia 
                                                component='img'
                                                className='fadeIn'
                                                image={ getValues('guiaTallas') }
                                                alt={ getValues('guiaTallas') }
                                            />
                                            <CardActions>
                                                <Button 
                                                    fullWidth 
                                                    color="error"
                                                    variant='contained'
                                                    onClick={ () => onDeleteImageGuia( getValues('guiaTallas') ) }
                                                >
                                                    Borrar
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                    )
                                }
                                    
                                
                            </Grid>

                        </Box>

                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Imágenes</FormLabel>
                            <Button
                                // color="secondary"
                                variant='contained'
                                fullWidth
                                startIcon={ <Upload /> }
                                sx={{ mb: 3 }}
                                onClick={ () => fileInputRef.current?.click() }
                            >
                                Cargar imagen
                            </Button>
                            <input 
                                ref={ fileInputRef }
                                type='file'
                                multiple
                                accept='image/png image/gif image/jpeg image/webp'
                                style={{ display: 'none'}}
                                onChange={ onFileSelected }
                            />

                            <Chip 
                                label="Es necesario al menos 1 imagen del producto"
                                color='error'
                                variant='filled'
                                sx={{ display: getValues('img').length < 1 ? 'flex': 'none' }}
                            />

                            <Grid container spacing={2}>
                                {
                                    getValues('img').map( img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ img }
                                                    alt={ img }
                                                />
                                                <CardActions>
                                                    <Button 
                                                        fullWidth 
                                                        color="error"
                                                        onClick={ () => onDeleteImage(img) }
                                                        variant='contained'
                                                    >
                                                        Borrar
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>


        </AdminLayout>
        <Snackbar open={openAlert} onClose={() => setOpenAlert(false)} autoHideDuration={6000} sx={{ pt: { xs: 13, sm: 16 }}} anchorOrigin={{ vertical: 'top', horizontal: 'right'}} >
            <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: '100%' }}>
                { product._id ? 'El producto se guardó correctamente!' : 'El producto se creó correctamente!'}
            </Alert>
        </Snackbar>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isSaving}
        >
            <CircularProgress />
        </Backdrop>
        </>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    
    const { slug = '' } = query;

    let product: IProduct | null; 
    const marcas = await getAllBrands();

    if( slug === 'new' ){
        const tempProduct = JSON.parse( JSON.stringify( new Product() ));
        delete tempProduct._id;
        tempProduct.slug = ' '
        // tempProduct.img = ['img1.jpg', 'img2.jpg'];
        product = tempProduct;
    } else {
        product = await dbProducts.getProductBySlug(slug.toString()); 
    } 

    if ( !product ) {
        return {
            redirect: {
                destination: '/admin/products',
                permanent: false,
            }
        }
    }
    

    return {
        props: {
            product,
            marcas,
        }
    }
}


export default ProductAdminPage