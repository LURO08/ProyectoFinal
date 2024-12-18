import React from 'react';
import cruzRojaLogo from '../assets/logosvg.png';

const Home = () => {
  const styles = {
    body: {
      backgroundColor: '#f5f5f5', // Fondo claro
      fontFamily: 'Arial, sans-serif',
      color: '#1877F2', // Color azul del texto
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '93vh',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '5px',
    },
    image: {
      width: '100px', // Ajusta el tamaño de la imagen
      marginBottom: '0px',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        {/* Imagen (logo de la Cruz Roja, por ejemplo) */}
        <img src={cruzRojaLogo} alt="Cruz Roja Logo" style={styles.image} />

        {/* Texto principal */}
        <h1 style={styles.title}>SISTEMA DE ADMINISTRADOR</h1>
        <h2 style={styles.subtitle}>DE LA</h2>
        <h1 style={styles.title}>CRUZ ROJA MEXICANA DELEGACIÓN CHILPANCINGO</h1>
      </div>
    </div>
  );
};

export default Home;
