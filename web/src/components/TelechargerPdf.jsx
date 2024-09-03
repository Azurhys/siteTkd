import React from 'react';
import { useParams } from 'react-router-dom';

const TelechargerPDF = () => {
  const { inscriptionID } = useParams();

  const handleDownload = () => {
    window.open(`http://localhost:9017/api/pdf/inscription/${inscriptionID}`, '_blank');
  };

  return (
    <button onClick={handleDownload} className="btn btn-primary">
      Télécharger PDF
    </button>
  );
};

export default TelechargerPDF;
