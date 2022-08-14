import { createTheme } from '@mui/material/styles';

export const mainTheme = createTheme({
    typography: {
        fontFamily: 'Lato, Roboto',      
    },

    palette: {
        mode: 'light',
        primary: {
            main: '#C2BB4F'
        },
        secondary: {
            main: '#F2F089'
        },
        info:{
            main: '#666666'
        },
        text: {
            primary: '#0D0D0D',
            secondary: '#666666'
            
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFFFFF'
                }
            }
        },
        MuiLink: {
            defaultProps: {
                underline: 'none',
                color: '#666666'
            }
        },
        MuiDivider: {
            defaultProps: {
                color: '#C2BB4F',
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#666666',
                    ":hover": {
                        backgroundColor: 'rgba(13,13,13,0.0)',
                        transition: 'all 0.3s ease-in-out',
                        color: '#C2BB4F'
                      },
                }
            }
        },
        MuiIcon: {
            styleOverrides: {
                root: {
                    color: '#666666',
                }
            }

        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: '#666666',
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    ":hover": {
                        backgroundColor: 'rgba(13,13,13,0.05)',
                        transition: 'all 0.3s ease-in-out',
                        color: '#C2BB4F',
                      },
                }
            }
        },
        MuiChip: {
   
        },
        MuiButton: {
            defaultProps: {
            //   variant: 'contained',
            //   size: 'small',
              disableElevation: true,
              
            },
            styleOverrides: {
              containedPrimary: {
                color: '#FFFFFF',
                textTransform: 'none',
                borderRadius: 5,
                ":hover": {
                  backgroundColor: 'rgba(194,187,79,0.7)',
                  transition: 'all 0.3s ease-in-out',
                }
              },
              outlinedPrimary: {
                textTransform: 'none',
                borderRadius: 5,
               
              },
              textSecondary:{
                color: '#C2BB4F',
                textTransform: 'none',
                // boxShadow: 'none',
                 borderRadius: 5,
                ":hover": {
                  backgroundColor: 'rgba(13,13,13,0.0)',
                  transition: 'all 0.3s ease-in-out',
                  color: '#C2BB4F'
                },
              },
              textPrimary: {
                // backgroundColor: 'white',
                color: '#666666',
                textTransform: 'none',
                // boxShadow: 'none',
                 borderRadius: 5,
                ":hover": {
                  backgroundColor: 'rgba(13,13,13,0.0)',
                  transition: 'all 0.3s ease-in-out',
                  color: '#C2BB4F'
                },
              }
            }
        },
        MuiTypography: {
            styleOverrides: {
                subtitle1: {
                    fontWeight: 600,
                    color: '#ffffff'
                },
                subtitle2: {
                    fontWeight: 600,
                    color: '#f2f2f2'
                }
            }
        }
        
    }
});