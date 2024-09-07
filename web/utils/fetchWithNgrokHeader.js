// utils/fetchWithNgrokHeader.js
export const fetchWithNgrokHeader = (url, options = {}) => {
    // Ajouter l'en-tête personnalisé à toutes les requêtes
    const headers = new Headers(options.headers || {});
    headers.append('ngrok-skip-browser-warning', '69420');
  
    // Appeler fetch avec les options mises à jour
    return fetch(url, {
      ...options,
      headers,
    });
  };
  