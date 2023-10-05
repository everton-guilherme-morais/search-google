import React, { useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import styles from './styles.module.css';
const { faker } = require('@faker-js/faker');
import router from 'next/router';

export default function HomeGoogle() {
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const cachedError = localStorage.getItem('error');
      if (cachedError) {
        setError(JSON.parse(cachedError));
      }
    }
  }, []);
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('search', search);
    localStorage.setItem('searchResults', JSON.stringify(searchResults));
  }

  const handleClearInput = () => {
    setSearch('');
    setSearchResults([]);
  };

  const generateFakeData = (term) => {
    let hasError = false;

    if (typeof faker.animal[term] !== 'function') {
      setError(true);
      hasError = true;
    } else {
      setError(false);
    }
    
    const results = [];
    if (!hasError) {
      for (let i = 0; i < 10; i++) {
        const route = faker.internet.url();
        const title = faker.animal[term]();
        const description = faker.lorem.paragraph();

        if (title.toLowerCase().includes(term.toLowerCase())) {
          results.push({ route, title, description });
        }
      }
    }

    setSearchResults(hasError ? [] : results)
    localStorage.setItem('search', term);
    localStorage.setItem('searchResults', JSON.stringify(hasError ? [] : results));

    if (hasError) {
      return results;
    }

    return results;
  };

  const handleSearchClick = () => {
    const results = generateFakeData(search);
    setSearchResults(results);

    localStorage.setItem('search', search);
    localStorage.setItem('searchResults', JSON.stringify(results));

    router.push(`/results`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value);
      handleSearchClick();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image src="/Google-Logo.png" width={250} height={130} alt="google" />
        <div className={styles.form}>
          <div className={styles.searchContainer}>
            <Search className={styles.svg} />
            <input
              type="text"
              id="searchGoogle"
              className={styles.search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              value={search}
            />
            {search && (
              <X className={styles.clearInput} onClick={handleClearInput} />
            )}
          </div>
          <button
            className={styles.sendSearch}
            disabled={search === ''}
            onClick={handleSearchClick}
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  );
}
