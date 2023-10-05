import React, { useState } from 'react';
import styles from './styles.module.css'
import Image from 'next/image';
import { X } from 'lucide-react';
import { Results } from '../../../types/results';

interface ModalResultProps {
  content: Results;
  closeModal: () => void;
}

export default function ModalResult({ content, closeModal }: ModalResultProps) {

  return (
    <div className={styles.modalBackdrop} onClick={closeModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <X className={styles.closeModalBtn} onClick={closeModal} />
        <div style={{ textAlign: 'left' }}>
          <Image src="/bird.png" width={290} height={200} alt="Imagem do Modal" className={styles.modalImage} />
        </div>
        
        <div className={styles.modalBody}>
          <div className={styles.result}>
            <div className={styles.routeResult}>{content.route}</div>
            <div className={styles.titleResult}>{content.title}</div>
            <div className={styles.textResult}>{content.description}</div>
          </div>
        </div>
      </div>
    </div>
  )
}