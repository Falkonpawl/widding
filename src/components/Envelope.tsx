import React, { useState } from 'react';
import styles from './Envelope.module.css';

import TopEnvelope from '../assets/envelope/photoo2.png.webp';
import BottomEnvelope from '../assets/envelope/photoo2p.png.webp';
import Press from '../assets/envelope/press.png';

export const Envelope: React.FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isRendered, setIsRendered] = useState<boolean>(true);

  const handleOpen = () => {
    setIsOpened(true);
    // Полностью удаляем компонент из DOM через 5 секунд, 
    // чтобы открыть доступ к контенту сайта под ним
    setTimeout(() => {
      setIsRendered(false);
    }, 6000);
  };

  if (!isRendered) return null;

  return (
    <div className={`${styles.envelopeOverlay} ${isOpened ? styles.isOpened : ''}`}>
      {/* Зеленый фон */}
      <div className={styles.background} />

      {/* Половинки конверта */}
      <div className={styles.envelopeBody}>
        <img 
          src={TopEnvelope} 
          className={`${styles.half} ${styles.top}`} 
        />
        <img 
          src={BottomEnvelope} 
          className={`${styles.half} ${styles.bottom}`} 
        />
      </div>

      {/* Кнопка Press */}
      <button className={styles.pressButton} onClick={handleOpen} type="button">
        <img src={Press}  />
      </button>
    </div>
  );
};