import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import customIcon from '../assets/icono.png';

export default function Logo() {
  return (
    <>
        <img src={customIcon} alt="Custom Icon" style={styles.icon} />
        <h3>HassleFreePay</h3>

    </>
  );
}

const styles = {
  
  icon: {
      width: '2vw', // Cambia el tamaño aquí
      minWidth: '24px',   // Tamaño mínimo del icono
      maxWidth: '48px', 

  }
};