// PetSection.tsx

import React, { FC } from 'react';
import styles from './ShelterSection.module.css'; // Importe seus estilos aqui

interface Shelter {
  id: number;
  image: string;
  name: string;
}

const shelters: Shelter[] = [
  {
    id: 1,
    image: 'https://static.vecteezy.com/ti/vetor-gratis/p1/4510645-animal-shelter-logo-safe-pet-house-vector-vetor.jpg',
    name: 'Ong das Patinhas',
  },
  {
    id: 2,
    image: 'https://cdn-icons-png.flaticon.com/512/1491/1491099.png',
    name: 'Abrigo do Rapha',
  },
  {
    id: 3,
    image: 'https://static.vecteezy.com/ti/vetor-gratis/p1/4510645-animal-shelter-logo-safe-pet-house-vector-vetor.jpg',
    name: 'Ong das Patinhas',
  },
  {
    id: 4,
    image: 'https://cdn-icons-png.flaticon.com/512/1491/1491099.png',
    name: 'Abrigo do Rapha',
  },
  {
    id: 5,
    image: 'https://cdn-icons-png.flaticon.com/512/1491/1491099.png',
    name: 'Abrigo do Rapha',
  }
];

const ShelterSection: FC = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Nossos abrigos</h2>
      <div className={styles.shelterList}>
        {shelters.map((shelter) => (
          <div key={shelter.id} className={styles.shelterCard}>
            <img src={shelter.image} alt={shelter.name} className={styles.animalImage} />
            <p className={styles.shelterName}>{shelter.name}</p>
            <button className={styles.shelterButton}>Conhecer</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShelterSection;
