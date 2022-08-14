import NextLink from 'next/link';
import { Alert, Box, Button, CardMedia, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Snackbar, TextField, Typography, Divider } from '@mui/material';
import { AuthLayout } from '../../components/layouts'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { validations } from '../../utils';
import { getProviders, getSession, signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';

interface State {
    password: string;
    showPassword: boolean;
  }

type FormData = {
    email   : string,
    password: string,
};

const LoginPage = () => {

    const router = useRouter();
    const { asPath } = useRouter();
    

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);

    const [providers, setProviders] = useState<any>({});

    useEffect(() => {
      getProviders().then( prov => {
        setProviders(prov);
      })
    }, [])

    useEffect(() => {

        const isValidLogin = asPath.includes('error')

        if ( isValidLogin ) {
            setShowError(true);
            setTimeout(() => setShowError(false), 5000);
            return;
        }
    }, [asPath])
    

    const onLoginUser = async( { email, password }: FormData ) => {

        setShowError(false);

        // const isValidLogin = await loginUser( email, password );

        // if ( !isValidLogin ) {
        //     setShowError(true);
        //     setTimeout(() => setShowError(false), 5000);
        //     return;
        // }

        // // // Todo: navegar a la pantalla que el usuario estaba
        

        await signIn('credentials', { email, password })

        const destination = router.query.p?.toString() || '/'
        router.replace(destination);

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
        <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
        <Box sx={{ width: '100%', maxWidth: 450, p: 4, backgroundColor: '#f2f2f2', borderRadius: 3 }} >
            <Grid container  sx={{ p: 3, backgroundColor: '#ffffff', borderRadius: 3 }} >

                <Grid item xs={12} display='flex' justifyContent='center'>
                    <CardMedia
                        component='img'
                        alt='Logo Next Store Uniforms'
                        image='/assets/nextstorelogoborde.png'
                        sx={{ width: '90%' }}
                    />  
                </Grid>

                <Grid item xs={12} sx={{ mb: 2 }}>
                    <Typography color='text.secondary' variant='h1' component="h1" fontSize={20} fontWeight={600}>Iniciar Sesión</Typography>
                </Grid>

                <Grid item xs={12} sx={{ mb: 2 }}>
                    <TextField 
                        type="email"
                        label="Correo" 
                        fullWidth 
                        size='small'
                        { ...register('email', {
                            required: true,
                            validate: validations.isEmail
                            
                        })}
                        error={ !!errors.email }
                        helperText={ errors.email?.message }
                    />
                </Grid>
                <Grid item xs={12} sx={{ mb: 2 }} display='flex' alignItems='center'>
                    {/* <TextField label="Contraseña" type='password' fullWidth /> */}
                                    
                    
                    <FormControl sx={{ width: '100%' }} variant="outlined" >
                        <InputLabel size='small'>Contraseña</InputLabel>
                        <OutlinedInput
                            size='small'
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            { ...register('password', {
                                required: true,
                                // minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                            })}
                            error={ !!errors.password }
                            // helperText={ errors.password?.message }
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

                <Grid item xs={12} sx={{ mb: 2 }}>
                    <Button  
                        type="submit"
                        variant='contained' 
                         
                        fullWidth
                    >
                        Ingresar
                    </Button>
                </Grid>

                <Grid item xs={12} display='flex' justifyContent='end'>
                    <NextLink 
                        href={ router.query.p ? `/auth/register?p=${ router.query.p }` : '/auth/register'} 
                        passHref
                    >
                        <Link underline='always'>
                            ¿No tienes cuenta?
                        </Link>
                    </NextLink>
                </Grid>

                <Grid item xs={12} flexDirection='column' display='flex' justifyContent='end'>
                            <Divider sx={{ width:'100%', mb: 2, mt: 1 }} />
                            {
                                providers && ( 
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
                                )
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
            <Alert severity="error">Usuario / contraseña incorrectos</Alert>
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

export default LoginPage