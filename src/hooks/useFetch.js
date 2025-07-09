import { useState, useEffect } from 'react';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Erro no fetch:', err);
        setError(err.message || 'Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch; 