import React, { FC } from 'react';
import styles from './WorkSection.module.css'; 
import imagem from '../../public/banner5.jpg';

const WorkSection: FC = () => {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.content}>
        <div className={styles.image}>
          <img src={imagem} alt="Imagem de Exemplo" className={styles.aboutImage} />
        </div>
        <div className={styles.text}>
          <h2 className={styles.sectionTitle}>Como funciona</h2>
          <p className={styles.description}>
          Nossa plataforma AnimalPay simplifica o processo de doação para abrigos de animais.
        Os usuários podem explorar abrigos, ver animais disponíveis para adoção, fazer doações
        e ajudar a fazer a diferença na vida desses animais.
          </p>
        </div>
      </div>
    </section>
  );
};


export default WorkSection;
