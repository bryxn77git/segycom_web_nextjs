import { createTheme } from '@mui/material/styles';

export const mainTheme = createTheme({
    typography: {
        fontFamily: 'Montserrat, Roboto',      
    },
    palette: {
        background: {
            default: '#F2F2F2'
        },
        mode: 'light',
        primary: {
            main: '#8C0712'
        },
        secondary: {
            main: '#8C0712'
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
       
        MuiIconButton: {
            styleOverrides: {
                root: {
                    color: '#666666',
                    ":hover": {
                        backgroundColor: 'rgba(13,13,13,0.0)',
                        transition: 'all 0.3s ease-in-out',
                        color: '#8C0712'
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
        MuiFormControlLabel: {
            styleOverrides: {
                label: {
                    fontWeight: 600,
                    fontSize: 14,
                    color: '#666666'
                }
            }
        },
        MuiCheckbox: {
            styleOverrides: {
                colorPrimary: {
                    color: '#666666'
                }
            }
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontWeight: 600,
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    color: '#666666'
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    fontWeight: 600,
                    color: '#666666'
                }
            }
        },
        
        // MuiListItemIcon: {
        //     styleOverrides: {
        //         root: {
        //             color: '#666666',
        //         }
        //     }
        // },
        // MuiListItemButton: {
        //     styleOverrides: {
        //         root: {
        //             ":hover": {
        //                 backgroundColor: 'rgba(13,13,13,0.05)',
        //                 transition: 'all 0.3s ease-in-out',
        //                 color: '#C2BB4F',
        //               },
        //         }
        //     }
        // },
        // MuiChip: {
   
        // },
        
        MuiButton: {
            defaultProps: {
            //   variant: 'contained',
            //   size: 'small',
              disableElevation: true,
              
            },
            styleOverrides: {
            //   containedPrimary: {
            //     color: '#FFFFFF',
            //     textTransform: 'none',
            //     borderRadius: 5,
            //     ":hover": {
            //       backgroundColor: 'rgba(194,187,79,0.7)',
            //       transition: 'all 0.3s ease-in-out',
            //     }
            //   },
            //   outlinedPrimary: {
            //     textTransform: 'none',
            //     borderRadius: 5,
               
            //   },
              textSecondary:{
                color: '#8C0712',
                textTransform: 'none',
                // boxShadow: 'none',
                 borderRadius: 5,
                ":hover": {
                  backgroundColor: 'rgba(13,13,13,0.0)',
                  transition: 'all 0.3s ease-in-out',
                  color: '#8C0712'
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
                  color: '#8C0712'
                },
              }
            }
        },
        
        
    }
});