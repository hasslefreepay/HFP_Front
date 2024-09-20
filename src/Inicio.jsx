import  React, { useContext, useEffect } from 'react';
import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './componentsi/AppNavbar';
import Header from './componentsi/parte_superior';
import MainGrid from './componentsi/grid_pagina';
import SideMenu from './componentsI/grid_menu';
import getDashboardTheme from './theme/getDashboardTheme';
import { UserContext } from './provider/global.jsx';

export default function Inicio() {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const dashboardTheme = createTheme(getDashboardTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const { userId,  } = useContext(UserContext);
  const token = sessionStorage.getItem('userToken');
  const id = sessionStorage.getItem('user');
  const correo = sessionStorage.getItem('user');

  console.log(id);
  console.log(token);
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token || !id) return; // Asegúrate de que el token y el ID existan

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${id}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener los datos del usuario');
        }else{
          console.log(response)
          console.log('devuelve')
        }

        const data = await response.json();
        setUserData(data); // Almacena la respuesta en el estado
      } catch (err) {
        setError(err.message);
        console.error('Error:', err);
      }
    };

    fetchUserData();
  }, []); // Dependencias para el useEffect


  // This code only runs on the client side, to determine the system color preference
  React.useEffect(() => {
    // Check if there is a preferred mode in localStorage
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    } else {
      // If no preference is found, it uses system preference
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };



  return (
    
      <ThemeProvider theme={showCustomTheme ? dashboardTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <Box sx={{ display: 'flex' }}>
          <SideMenu />
          <AppNavbar />
          {/* Main content */}
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              backgroundColor: alpha(theme.palette.background.default, 1),
              overflow: 'auto',
            })}
          >
            <Stack
              spacing={2}
              sx={{
                alignItems: 'center',
                mx: 3,
                pb: 10,
                mt: { xs: 8, md: 0 },
              }}
            >
              <Header />
              <MainGrid />
            </Stack>
          </Box>
        </Box>
      </ThemeProvider>
  );
}
