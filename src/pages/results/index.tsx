import React, { useEffect, useState } from 'react';
import HeaderResults from '../../components/HeaderResults';
import ContentResults from '../../components/ContentResults';
import { useRouter } from 'next/router';
const { faker } = require('@faker-js/faker');
import Footer from '../../components/FooterHome';
import styles from '../styles.module.css';

const IndexResults = () => {
  const router = useRouter();
  const { results } = router.query;
  const [parsedResults, setParsedResults] = useState([]);
  const [error, setError] = useState(false);
  let hasError = false;

  const generateFakeData = (term: string) => {
    
    let errorMessage = '';
    
    if (term === undefined) {
      hasError = true;
      localStorage.setItem('searchResults', JSON.stringify([]))
      localStorage.setItem('search', term);
    } else if (!['bear', 'bird', 'cat', 'cetacean', 'cow', 'crocodilia', 'dog', 'fish', 'horse', 'insect', 'lion', 'rabbit', 'rodent', 'snake', 'type'].includes(term)) {
      hasError = true;
      localStorage.setItem('searchResults', JSON.stringify([]))
    } else if (typeof faker.animal[term] !== 'function') {
      hasError = true;
      localStorage.setItem('searchResults', JSON.stringify([]))
    } else if (['bear', 'bird', 'cat', 'cetacean', 'cow', 'crocodilia', 'dog', 'fish', 'horse', 'insect', 'lion', 'rabbit', 'rodent', 'snake', 'type'].includes(term)) {
      hasError = false;
    }

    setError(hasError);
    localStorage.setItem('error', JSON.stringify(error));
    localStorage.setItem('search', term);

    if (!hasError) {
      const generatedResults = [];
      
      for (let i = 0; i < 10; i++) {
        const route = faker.internet.url();
        const title = faker.animal[term]();
        const description = faker.lorem.paragraph();

        if (title.toLowerCase().includes(term.toLowerCase())) {
          generatedResults.push({ route, title, description });
        }
      }

      localStorage.setItem('search', term);
      localStorage.setItem('searchResults', JSON.stringify(generatedResults));
    } else {
        setParsedResults([]);
        console.error(errorMessage);
      }
  };

  useEffect(() => {
    if (typeof results === 'string' && results.trim() !== '') {
      try {
        setParsedResults(JSON.parse(decodeURIComponent(results)));
      } catch (error) {
        setParsedResults([]);
      }
    }
    setError(hasError);
    localStorage.setItem('error', JSON.stringify(hasError));
  }, [results]);
  

  return (
    <div className={styles.container}>
      <HeaderResults
        handleSearchClick={generateFakeData}
      />
      <main className={styles.main}>
        <ContentResults results={parsedResults} error={error} />
      </main>
      <Footer />
    </div>
  )
}

export default IndexResults