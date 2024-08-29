import React from "react";
import useFormulas from "../hooks/useFormulas";

const Accueil = () => {
    const federationFFST = 'FFST';
    const federationFFTDA = 'FFTDA';

    const { formulas: formulasFFST, loading: loadingFFST, error: errorFFST } = useFormulas(federationFFST);
    const { formulas: formulasFFTDA, loading: loadingFFTDA, error: errorFFTDA } = useFormulas(federationFFTDA);

    const renderFormulas = (formulas) => {
        return formulas.map((formula, index) => (
          <div className="col-4 mb-4 card-group" key={index}>
            <div className="card mx-5">
            <ul class="list-group list-group-flush">
                <li class="list-group-item fs-3 text-center font-weight-bold text-primary fw-bolder">{formula.Nom}</li>
                <li class="list-group-item fs-3 text-center bg-danger text-white fw-bolder">{formula.CoutTotal} €</li>
                <li class="list-group-item text-center">
                    <p className="mx-5 fs-5">{formula.TrancheAge}</p>
                    <p className="p-0 m-0 fw-bold">{formula.Creneau_1}</p>
                    <p className="p-0 m-0 fw-bold">{formula.Creneau_2}</p>
                    <p className="p-0 mb-3 fw-bold">{formula.Lieu}</p>
                </li>
            </ul>
            </div>
          </div>
        ));
    };
    
    return (
    <div>
        <div className="text-center my-5">
            <h1 className="my-3">USM Taekwondo</h1>
            <h2 className="my-3">Technique - Combat - Self Defense</h2>
            <h4 className="my-3">Respect - Courtoisie - Intégrité - Persévérance - Maitrise de soi</h4>
        </div>
        
        <section>
            <h2 className="text-center my-5">Formules loisir</h2>
            {loadingFFST && <p>Chargement...</p>}
            {errorFFST && <p>Erreur: {errorFFST}</p>}
            <div className="row">
                {renderFormulas(formulasFFST)}
            </div>
        </section>

        <section>
            <h2 className="text-center my-5">Formules compétition & dan</h2>
            {loadingFFTDA && <p>Chargement...</p>}
            {errorFFTDA && <p>Erreur: {errorFFTDAT}</p>}
            <div className="row">
                {renderFormulas(formulasFFTDA)}
            </div>
        </section>
    </div>
)}
 
export default Accueil;