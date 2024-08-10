class Adherent {
    constructor({ id, nom, prenom, genre, dateNaissance, poids, taille, adresse1, adresse2, codePostal, ville, email1, email2, portable1, portable2 }) {
      this.id = id;
      this.nom = nom;
      this.prenom = prenom;
      this.genre = genre;
      this.dateNaissance = dateNaissance;
      this.poids = poids;
      this.taille = taille;
      this.adresse1 = adresse1;
      this.adresse2 = adresse2;
      this.codePostal = codePostal;
      this.ville = ville;
      this.email1 = email1;
      this.email2 = email2;
      this.portable1 = portable1;
      this.portable2 = portable2;
    }
  }
  
  module.exports = Adherent;
  