DROP DATABASE IF EXISTS taekwondo; 

CREATE DATABASE taekwondo;

USE taekwondo;

CREATE TABLE Adherents (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(100),
    Prenom VARCHAR(100),
    Genre CHAR(1),
    DateNaissance DATE,
    Poids FLOAT,
    Taille INT,
    Adresse1 VARCHAR(255),
    Adresse2 VARCHAR(255),
    CodePostal VARCHAR(10),
    Ville VARCHAR(100),
    Email1 VARCHAR(100),
    Email2 VARCHAR(100),
    Portable1 VARCHAR(15),
    Portable2 VARCHAR(15)
);

CREATE TABLE PersonneUrgence (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(100),
    Prenom VARCHAR(100),
    LienParente VARCHAR(100),
    Portable VARCHAR(15),
    AdherentID INT,
    FOREIGN KEY (AdherentID) REFERENCES Adherents(ID)
);

CREATE TABLE Dobok (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Taille INT,
    Prix FLOAT
);

CREATE TABLE Formule (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(100),
    TrancheAge VARCHAR(50),
    AdherentClub FLOAT,
    Licence FLOAT,
    Cours FLOAT,
    CoutTotal FLOAT,
    Creneau_1 VARCHAR(255) NOT NULL,
    Creneau_2 VARCHAR(255),
    Lieu VARCHAR(255)
);



CREATE TABLE Inscription (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    AdherentID INT,
    FormuleID INT,
    ReductionFamille FLOAT,
    ReductionPASS FLOAT,
    DobokID INT,
    ModePaiement VARCHAR(50),
    FOREIGN KEY (AdherentID) REFERENCES Adherents(ID),
    FOREIGN KEY (FormuleID) REFERENCES Formule(ID),
    FOREIGN KEY (DobokID) REFERENCES Dobok(ID)
);

CREATE TABLE Paiement (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    InscriptionID INT,
    Montant FLOAT,
    Mois VARCHAR(50),
    MoyenPaiement VARCHAR(50),
    FOREIGN KEY (InscriptionID) REFERENCES Inscription(ID)
);

CREATE TABLE Commentaires (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    AdherentID INT,
    Commentaire TEXT,
    FOREIGN KEY (AdherentID) REFERENCES Adherents(ID)
);

CREATE TABLE Signature (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    AdherentID INT,
    Date DATE,
    Signature VARCHAR(255),
    FOREIGN KEY (AdherentID) REFERENCES Adherents(ID)
);

-- Insertions

INSERT INTO Dobok (Taille, Prix) VALUES 
(100, 20.00), 
(110, 20.00), 
(120, 22.00), 
(130, 24.00), 
(140, 24.00), 
(150, 26.00), 
(160, 28.00), 
(170, 30.00), 
(180, 32.00), 
(190, 34.00);

INSERT INTO Formule (Nom, TrancheAge, AdherentClub, Licence, Cours, CoutTotal, Creneau_1, Creneau_2, Lieu) VALUES 
('Baby', 'Enfants de 4 à 6 ans', 30.0, 15.0, 71.0, 116.0, 'Mercredi 18h-19h', NULL, 'Salle Norbert Batigne'),
('Enfants FFST', 'Enfants de 7 à 11 ans', 30.0, 21.0, 135.0, 186.0, 'Lundi 19h30-20h30', 'Mercredi 19h30-20h30', 'Salle de Danse'),
('Enfants FFTDA', 'Enfants de 7 à 11 ans', 30.0, 36.0, 135.0, 201.0, 'Lundi 19h30-20h30', 'Mercredi 19h30-20h30', 'Salle de Danse'),
('Ados/Adultes FFST', 'A partir de 12 ans', 30.0, 25.0, 176.0, 231.0, 'Lundi 20h30-22h', 'Mercredi 20h30-22h', 'Salle de Danse'),
('Ados/Adultes FFTDA', 'A partir de 12 ans', 30.0, 36.0, 176.0, 242.0, 'Lundi 20h30-22h', 'Mercredi 20h30-22h', 'Salle de Danse');