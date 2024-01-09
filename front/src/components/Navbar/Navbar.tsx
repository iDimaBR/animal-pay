import React, { FC } from 'react';
import styles from './Navbar.module.css'; // Importe seus estilos aqui

const Navbar: FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h1>AnimalPay</h1>
      </div>
      <ul className={styles.navLinks}>
        <li><a href="#animals">Animais</a></li>
        <li><a href="#shelters">Abrigos</a></li>
        <li><a href="#about">Sobre Nós</a></li>
        <li><a href="#how-it-works">Funcionamento</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;