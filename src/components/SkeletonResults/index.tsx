import React from 'react';
import styles from './styles.module.css'

export default function SkeletonResults() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonFirst} />
      <div className={styles.skeletonSecond} />
      <div className={styles.skeletonThird} />
    </div>
  )
}