import React from 'react';
import { useParams } from 'react-router-dom';

const TelechargerPDF = () => {
  const { inscriptionID } = useParams();

  const handleDownload = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/api/pdf/inscription/${inscriptionID}`, '_blank');
  };

  return (
    <button onClick={handleDownload} className="btn btn-primary">
      Télécharger PDF
    </button>
  );
};

export default TelechargerPDF;
