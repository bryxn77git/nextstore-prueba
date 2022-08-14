import NextLink from 'next/link';
import { Alert, Box, Button, CardMedia, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Snackbar, TextField, Typography, Divider } from '@mui/material';
import { AuthLayout } from '../../components/layouts'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/auth/AuthContext';
import { useForm } from 'react-hook-form';
import { validations } from '../../utils';
import { GetServerSideProps } from 'next';
import { getProviders, getSession, signIn } from 'next-auth/react';

interface State {
    password: string;
    showPassword: boolean;
}

type FormData = {
    name    : string;
    email   : string;
    password: string;
};

const RegisterPage = () => {

    const router = useRouter();
    const { registerUser } = useContext( AuthContext );

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');
    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
        getProviders().then( prov => {
          setProviders(prov);
        })
      }, [])

    const onRegisterForm = async( {  name, email, password }: FormData ) => {
        
        setShowError(false);
        const { hasError, message } = await registerUser(name, email, password);

        if ( hasError ) {
            setShowError(true);
            setErrorMessage( message! );
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        
        // Todo: navegar a la pantalla que el usuario estaba
        // const destination = router.query.p?.toString() || '/'
        // router.replace(destination);
        await signIn('credentials', { email, password })

    }

    const [values, setValues] = useState<State>({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };

  return (
    <AuthLayout title={'Ingresar'}>
        <form onSubmit={ handleSubmit(onRegisterForm) } noValidate>
        <Box sx={{ width: '100%', maxWidth: 450, p: 4, backgroundColor: '#f2f2f2', borderRadius: 3 }} >
            <Grid container  sx={{ p: 3, backgroundColor: '#ffffff', borderRadius: 3 }} >
               
                <Grid item xs={12}>
                    <CardMedia
                        component='img'
                        alt='Logo Next Store Uniforms'
                        image='/assets/nextstorelogoborde.png'
                        sx={{ width: '90%' }}
                    />  
                </Grid>

                <Grid item xs={12} sx={{ mb: 2 }}>
                    <Typography color='text.secondary' variant='h1' component="h1" fontSize={20} fontWeight={600}>Crear cuenta</Typography>
                </Grid>

                <Grid item xs={12} sx={{ mb: 1 }}>
                    <TextField 
                        label="Nombre completo" 
                        fullWidth 
                        { ...register('name', {
                            required: true,
                            minLength: { value: 3, message: 'Mínimo 3 caracteres' }
                        })}
                        error={ !!errors.name }
                        helperText={ errors.name?.message }
                    />
                </Grid>
                <Grid item xs={12} sx={{ mb: 1 }}>
                    <TextField 
                        label="Correo" 
                        type="email"
                        fullWidth 
                        { ...register('email', {
                            required: true,
                            validate: validations.isEmail
                            
                        })}
                        error={ !!errors.email }
                        helperText={ errors.email?.message }
                    />
                </Grid>
                <Grid item xs={12} sx={{ mb: 2 }}>
                    {/* <TextField label="Contraseña" type='password' fullWidth /> */}
                    <FormControl sx={{ width: '100%' }} variant="outlined" >
                        <InputLabel >Contraseña</InputLabel>
                        <OutlinedInput
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            { ...register('password', {
                                required: true,
                                // minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                            })}
                            error={ !!errors.password }
                            onChange={handleChange('password')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12}sx={{ mb: 1 }}>
                    <Button  variant='contained' size='large' fullWidth type="submit">
                        Crear
                    </Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink 
                        href={ router.query.p ? `/auth/login?p=${ router.query.p }` : '/auth/login'} 
                        passHref
                    >
                        <Link underline='always'>
                            ¿Ya tienes cuenta?
                        </Link>
                    </NextLink>
                </Grid>

                <Grid item xs={12} flexDirection='column' display='flex' justifyContent='end'>
                    <Divider sx={{ width:'100%', mb: 2, mt: 1 }} />
                    {
                        Object.values( providers ).map(( provider: any ) => {
                            if( provider.id === 'credentials') return (<div key='credentials'></div>)
                            return (
                            <Button
                                key={ provider.id }
                                variant='outlined'
                                fullWidth
                            
                                color='primary'
                                sx={{ mb: 1 }}
                                onClick={ () => signIn( provider.id ) }
                            >
                                Ingresar con { provider.name }
                            </Button>)
                        })
                    }
                </Grid>

            </Grid>
        </Box>
        </form>

        <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={true}
            className="fadeIn"
            sx={{ display: showError ? 'flex': 'none' }}
        >
            <Alert severity="error">Error al crear la cuenta</Alert>
        </Snackbar>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    
    const session = await getSession({ req });

    const { p = '/' } = query; 

    if( session ){
        return {
            redirect: {
                destination: p.toString(),
                permanent: false,
            }
        }
    }

    return {
        props: {
            
        }
    }
}

export default RegisterPage