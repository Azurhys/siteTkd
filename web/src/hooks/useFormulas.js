import { useState, useEffect } from 'react';

const useFormulas = (federation) => {
  const [formulas, setFormulas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormulas = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/formules?federation=${federation}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des formules');
        }
        const data = await response.json();
        setFormulas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFormulas();
  }, [federation]);

  return { formulas, loading, error };
}

export default useFormulas;
