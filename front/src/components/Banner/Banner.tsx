import React, { FC } from 'react';
import styles from './Banner.module.css'; // Importe seus estilos aqui

const Banner: FC = () => {
  return (
    <section className={styles.banner}>
      <h1 className={styles.bannerTitle}>AnimalPay</h1>
      <p className={styles.bannerSubtitle}>Plataforma de Doações para Abrigos de Animais</p>
      <a href="#donate" className={styles.bannerButton}>Faça uma Doação</a>
    </section>
  );
};

export default Banner;