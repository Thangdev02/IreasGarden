import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './plantGallery.css';
import AlboG from '../../assets/images/galllery/AlboG.png';
import { Typography } from '@mui/material';

const plants = [
  { id: 1, name: 'Monstera Albo', imageUrl: AlboG },
  { id: 2, name: 'Anthurium Cystal', imageUrl: 'https://www.soiled.in/cdn/shop/files/Photoroom-20240808-192541_713x.png?v=1723127917' },
  { id: 3, name: 'Anthurium Clarinervium', imageUrl: 'https://photo.floraccess.com/r7nvtsqni218ou08r0bbi2rlc8kvpqn2j5un69gg_Preview480.jpg' },
  { id: 4, name: 'Monstera Thaicon', imageUrl: 'https://jiffyplants.com/wp-content/uploads/2022/11/ezgif.com-resize-2023-03-12T131425.325.webp' },
  { id: 5, name: 'Monstera Esqueleto', imageUrl: 'https://greenboog.com/wp-content/uploads/2023/02/Monstera-Esqueleto.jpeg' },
  { id: 6, name: 'Monstera Deliciosa', imageUrl: 'https://png.pngtree.com/png-vector/20240125/ourlarge/pngtree-monstera-deliciosa-monstera-giant-leaf-on-white-pot-air-purification-planthouse-png-image_11494519.png' },
  { id: 7, name: 'Philodendron Caramel', imageUrl: 'https://me-greeneryexport.com/wp-content/uploads/2021/05/001-13.jpg' },
  { id: 8, name: 'Philodendron Bipinnatifidum', imageUrl: 'https://hortology.co.uk/cdn/shop/files/Philodendron-selloum-Tree-Philodendron-24x100cm_1200x.jpg?v=1714036782' },
  { id: 9, name: 'Alocasia Frydek', imageUrl: 'https://foliagedreams.com/cdn/shop/products/alocasia-micholitziana-frydek-plant-alocasia-l-42539209752843.jpg?v=1677776163' },
  { id: 10, name: 'Terminalia Catappa', imageUrl: 'https://mowgarden.com/wp-content/uploads/2021/04/cay-bang-singapore-mot-than-chau-xi-mang.jpg' },
];

const PlantGallery = () => {
  const [selectedPlant, setSelectedPlant] = useState(0);

  const handleClick = (index) => {
    setSelectedPlant(index);
  };

  const visiblePlants = [
    ...plants.slice(selectedPlant, selectedPlant + 5),
    ...plants.slice(0, Math.max(0, selectedPlant + 5 - plants.length)),
  ];

  return (
    <div>
      <Typography variant='h2' sx={{fontFamily:'Quicksand', textAlign:'center',marginTop:'3%'}}>Best Plant</Typography>
    <div className="carousel-container">
      {visiblePlants.map((plant, index) => (
        <motion.div
          key={plant.id}
          className={`carousel-item ${index === 0 ? 'selected' : ''}`}
          onClick={() => handleClick((selectedPlant + index) % plants.length)}
          whileHover={{ scale: index === 0 ? 1 : 1.1 }}
          initial={{ opacity: 0, x: index * 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 120, 
            damping: 14, 
            duration: 0.5 
          }}
        >
          <img src={plant.imageUrl} alt={plant.name} />
          <h2>{plant.name}</h2>
        </motion.div>
      ))}
      </div>
    </div>
  );
};

export default PlantGallery;
