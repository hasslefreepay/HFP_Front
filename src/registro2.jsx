import React, { useState } from 'react';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import getCheckoutTheme from './theme/getCheckoutTheme';
import CssBaseline from '@mui/material/CssBaseline';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import './css/registro.css'; 
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { Button } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';


const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));


export default function Registro() {

  const [mode, setMode] = React.useState('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const checkoutTheme = createTheme(getCheckoutTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: '',
    lname: '',
    email: '',
    password: '',
    rpassword: '',
    number: '',
    country: '',
    department: '',
    city: '',
    zip: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (event) => {
    setFormData({
      ...formData,
      country: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log()
    if (data.get('password') !== data.get('rpassword')) {
      alert('Las contraseñas no coinciden');
      return;
    }
    
    console.log({email:data.get('email')},'yo');
    const { rpassword, ...dataToSend } = data;
    dataToSend.number = parseInt(dataToSend.number, 10) || 0;
    dataToSend.postalCode = parseInt(dataToSend.postalCode, 10) || 0;

    const formattedData = {
      nombre: data.get('name'),
      apellidos: data.get('lname'),
      correo: data.get('email'),
      contraseña: data.get('password'),
      telefono: parseInt(data.get('number'), 10) || 0, // Convertir a entero
      pais: data.get('country'),
      departamento: data.get('department'),
      ciudad: data.get('city'),
      codp: data.get('zip'),
    };

    console.log(formattedData)


    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }

      const result = await response.json();
      console.log('Respuesta de la API:', result);
      if(response.ok){
        navigate('/Inicio');
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <>
     <ThemeProvider theme={showCustomTheme ? checkoutTheme : defaultTheme}>
     <CssBaseline enableColorScheme />
     <Grid
            size={{ sm: 12, md: 7, lg: 8 }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '100%',
              width: '100%',
              backgroundColor: { xs: 'transparent', sm: 'background.default' },
              alignItems: 'center',
              pt: { xs: 6, sm: 16 },
              px: { xs: 2, sm: 10 },
              gap: { xs: 4, md: 8 },
            }}
          >
          <form onSubmit={handleSubmit}>
            <div className='se'>
            <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="name" required>
          Nombres
        </FormLabel>
        <OutlinedInput
          id="name"
          name="name"
          type="name"
          placeholder="Nombre"
          autoComplete="first name"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="lname" required>
          Apellidos
        </FormLabel>
        <OutlinedInput
          id="lname"
          name="lname"
          type="last-name"
          placeholder="Apelldio"
          autoComplete="last name"
          required
          size="small"
        />
      </FormGrid>
            </div>
            <br />
            <br />
        <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="email" required>
          Correo
        </FormLabel>
        <OutlinedInput
          id="email"
          name="email"
          placeholder="Correo"
          autoComplete="Correo"
          type="email"
          required
          size="small"
        />
      </FormGrid>

            <br />
            <br />
            <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="password" required>
          Contraseña
        </FormLabel>
        <OutlinedInput
          id="password"
          name="password"
          type="password"
          placeholder="Contraseña"
          autoComplete="Contraseña"
          required
          size="small"
        />
      </FormGrid>

            <br />
            <br />
            <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="rpassword" required>
         Repita Contraseña
        </FormLabel>
        <OutlinedInput
          id="rpassword"
          name="rpassword"
          type="password"
          placeholder="Repita Contraseña"
          autoComplete="Contraseña"
          required
          size="small"
        />
      </FormGrid>

            <br />
            <br />
            <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="number" required>
         Telefono
        </FormLabel>
        <OutlinedInput
          id="number"
          name="number"
          type="number"
          placeholder="telefono"
          autoComplete="telefono"
          required
          size="small"
        />
      </FormGrid>

            <br />
            <br />
            <label htmlFor="" className='tt3'>Pais</label>
            <br />            
            <select
        id="country"
        className='input2'
        name="country"
        value={formData.country}
        onChange={handleSelectChange}
      >
            <option value="">Selecciona un país</option>
            <option value="USA">Estados Unidos</option>
            <option value="CAN">Canadá</option>
            <option value="MEX">México</option>
            </select>
            <br />
            <br />
            <div className='se2'>
                <div className='lt3'>
                <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="department" required>
          Departamento
        </FormLabel>
        <OutlinedInput
          id="department"
          name="department"
          type="state"
          placeholder="Bolivar"
          autoComplete="State"
          required
          size="small"
        />
      </FormGrid>

                </div>

                <div className='ct3'>
                <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="city" required>
          Ciudad
        </FormLabel>
        <OutlinedInput
          id="city"
          name="city"
          type="cidad"
          placeholder="Cartagena"
          autoComplete="City"
          required
          size="small"
        />
      </FormGrid>
                </div>

                <div className='rt3'>
                <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="zip" required>
          Zip / Postal code
        </FormLabel>
        <OutlinedInput
          id="zip"
          name="zip"
          type="zip"
          placeholder="12345"
          autoComplete="shipping postal-code"
          required
          size="small"
        />
      </FormGrid>
                </div>
            </div>
            <br />
            <hr />
            <br />
            <FormGrid size={{ xs: 12 }}>
        <FormControlLabel
          control={<Checkbox name="saveAddress" value="yes" />}
          label=""
        />
      </FormGrid>
      
       <label htmlFor="" className='p'> Acepto </label>
            <a href="" className='ln'>Terminos y condiciones</a>

            <br />
            
            <Button
            type="submit"
                      variant="contained"
                      endIcon={<ChevronRightRoundedIcon />}
                    >
                      Registrar
                    </Button>
                    <br />
                    <br />
                    <br />
                    <br />


        </form>

          </Grid>

    
    
    
    </ThemeProvider>
     
    </>
    
  );
}

const styles = {
  
  icon: {
      width: '4vw', // Cambia el tamaño aquí

  }
};
