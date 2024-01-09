// PetSection.tsx

import React, { FC } from 'react';
import styles from './PetSection.module.css'; // Importe seus estilos aqui

interface Pet {
  id: number;
  name: string;
  species: string;
  imageUrl: string;
  shelter: string;
}

const pets: Pet[] = [
  {
    id: 1,
    name: 'Laica',
    species: 'Cachorro(a)',
    imageUrl: 'https://love.doghero.com.br/wp-content/uploads/2018/12/golden-retriever-1.png',
    shelter: 'Ong das Patinhas',
  },
  {
    id: 2,
    name: 'Pepê',
    species: 'Gato(a)',
    imageUrl: 'https://s2.glbimg.com/kmbgBzKPL0URISIQenPiAKo4ORI=/e.glbimg.com/og/ed/f/original/2017/08/23/5c147f01-dff6-4952-98a0-9394c88361c2.jpg',
    shelter: 'Abrigo do Rapha',
  },
  {
    id: 3,
    name: 'Pepê',
    species: 'Gato(a)',
    imageUrl: 'https://s2.glbimg.com/kmbgBzKPL0URISIQenPiAKo4ORI=/e.glbimg.com/og/ed/f/original/2017/08/23/5c147f01-dff6-4952-98a0-9394c88361c2.jpg',
    shelter: 'Abrigo do Rapha',
  },
  {
    id: 4,
    name: 'Pepê',
    species: 'Gato(a)',
    imageUrl: 'https://s2.glbimg.com/kmbgBzKPL0URISIQenPiAKo4ORI=/e.glbimg.com/og/ed/f/original/2017/08/23/5c147f01-dff6-4952-98a0-9394c88361c2.jpg',
    shelter: 'Abrigo do Rapha',
  },
  {
    id: 5,
    name: 'Pepê',
    species: 'Gato(a)',
    imageUrl: 'https://s2.glbimg.com/kmbgBzKPL0URISIQenPiAKo4ORI=/e.glbimg.com/og/ed/f/original/2017/08/23/5c147f01-dff6-4952-98a0-9394c88361c2.jpg',
    shelter: 'Abrigo do Rapha',
  }
];

const PetSection: FC = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>Destaque de animais</h2>
      <div className={styles.animalList}>
        {pets.map((pet) => (
          <div key={pet.id} className={styles.animalCard}>
            <img src={pet.imageUrl} alt={pet.name} className={styles.animalImage} />
            <div className={styles.animalGroup}>
                <p className={styles.animalSpecies}>{pet.species}</p>
                <h3 className={styles.animalName}>{pet.name}</h3>
            </div>
            <p className={styles.animalShelter}>{pet.shelter}</p>
            <button className={styles.animalButton}>Ver mais</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PetSection;
