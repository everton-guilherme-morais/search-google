import React, { useEffect, useState } from 'react';
import styles from './styles.module.css'
import SkeletonResults from '../SkeletonResults'
import ModalResult from '../ModalResult';
import { Results } from '../../../types/results';

interface IPropsResults {
  results?: Results[];
  error?: boolean;
  search?: string;
}

export default function ContentResults(props: IPropsResults) {
  const [loading, setLoading] = useState<boolean>(true)
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState<Results | null>(null)
  const [cachedResults, setCachedResults] = useState<Results[]>([]);
  const [searchResult, setSearchResult] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchResultFromStorage = localStorage.getItem('search');
      setSearchResult(searchResultFromStorage);

      const cachedResultsString = localStorage.getItem('searchResults');
      if (cachedResultsString) {
        try {
          const parsedCachedResults = JSON.parse(cachedResultsString);
          setCachedResults(parsedCachedResults);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        } catch (error) {
          console.error('Erro ao analisar JSON:', error);
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (props.results.length > 0) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      setCachedResults([...props.results]);
    } else if (props.error || localStorage.getItem('search') === undefined) {
      setLoading(false);
    }
  }, [props.results, props.error]);

  const handleResultClick = (index) => {
    setShowModal(true);
    setModalContent(cachedResults[index]);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  console.log(searchResult, 'searchResult')

  return (
    <div className={styles.container}>
      {loading ? (
        Array.from(Array(6).keys()).map(index => (
          <SkeletonResults key={index} />
        ))
      ) : cachedResults.length > 0 ? (
        cachedResults.map((result, index) => (
          <div className={styles.result} key={index} onClick={() => handleResultClick(index)}>
            <div className={styles.routeResult}>{result.route}</div>
            <div className={styles.titleResult}>{result.title}</div>
            <div className={styles.textResult}>{result.description}</div>
          </div>
        ))
      ) : (
        <div>
          {searchResult && searchResult.length === 0 ? (
            <div>Try looking for: <b>insect, fish, horse, crocodilia, bear, cetacean, cow, lion, rabbit, cat, snake, dog, bird.</b></div>
          ) : (
            <div className={styles.errorMessage}>
              <div>No results found for <b>'{localStorage.getItem('search')}'</b>.</div>
              <div>Try looking for: <b>insect, fish, horse, crocodilia, bear, cetacean, cow, lion, rabbit, cat, snake, dog, bird.</b></div>
            </div>
          )}
        </div>
      )}
      {showModal && modalContent && (
        <ModalResult content={modalContent} closeModal={closeModal} />
      )}
    </div>
  )
}