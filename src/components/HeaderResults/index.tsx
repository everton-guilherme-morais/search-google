import React, { useEffect, useState } from 'react';
import { Grip, Search, X } from 'lucide-react'
import styles from './styles.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
  handleSearchClick?(type: string): void;
}

export default function HeaderResults(props: Props) {
  const [cachedSearchTerm, setCachedSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCachedSearchTerm(localStorage.getItem('search') || '');
    }
  }, []);

  const handleClearInput = () => {
    setCachedSearchTerm('');
    localStorage.setItem('search', '');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.handleSearchClick(cachedSearchTerm);
      router.reload();
    }
  };

  return (
    <header className={styles.container}>
      <div className={styles.imageAndSearch}>
        <Link href="/" passHref={true}>
          <Image className={styles.imageUser} src="/google-new-logo.jpg" width={90} height={40} alt="google" />
        </Link>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            id="searchGoogle"
            aria-label="Search Google"
            className={styles.search}
            value={cachedSearchTerm}
            onChange={(e) => setCachedSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {cachedSearchTerm && (
            <X className={styles.clearInput} onClick={handleClearInput} />
          )}
        </div>
      </div>
      <div className={styles.wrapper}>
        <button className={styles.button}>
          <Grip className={styles.svg}/>
        </button>
        <Image className={styles.imageUser} src="/myimage.png" width={28} height={26} alt="teste" />
      </div>
    </header>
  )
}