import React from 'react';
import { Grip } from 'lucide-react'
import styles from './styles.module.css'
import Image from 'next/image';

export default function HeaderHome() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <b>Agile Content</b>Frontend test
      </div>
      <div className={styles.options}>
        <button className={styles.button}>
          <Grip className={styles.svg}/>
        </button>
        <Image className={styles.imageUser} src="/myimage.png" width={25} height={23} alt="imagem_do_usuário" />
      </div>
    </div>
  )
}