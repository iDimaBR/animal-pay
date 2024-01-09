import React, { FC } from 'react';
import styles from './About.module.css'; // Importe seus estilos aqui
import imagem from '../../public/banner.jpg'; // Importe a imagem aqui

const AboutSection: FC = () => {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.content}>
        <div className={styles.text}>
          <h2 className={styles.sectionTitle}>Sobre Nós</h2>
          <p className={styles.description}>
            Bem-vindo ao AnimalPay! Somos uma plataforma dedicada a conectar amantes de animais a abrigos
            que precisam de apoio financeito. Nossa missão é facilitar o processo de doação e ajudar a encontrar
            lares amorosos para animais em necessidade.
          </p>
        </div>
        <div className={styles.image}>
          <img src={imagem} alt="Imagem de Exemplo" className={styles.aboutImage} />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
