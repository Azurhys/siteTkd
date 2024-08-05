IF EXISTS DROP DATABASE taekwondo; 

CREATE DATABASE taekwondo;

USE taekwondo;

CREATE TABLE Adherent (
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
    FOREIGN KEY (AdherentID) REFERENCES Adherent(ID)
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
    LicenceFFST FLOAT,
    Cours FLOAT,
    CoutTotal FLOAT
);


CREATE TABLE Inscription (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    AdherentID INT,
    FormuleID INT,
    ReductionFamille FLOAT,
    ReductionPASS FLOAT,
    DobokID INT,
    ModePaiement VARCHAR(50),
    FOREIGN KEY (AdherentID) REFERENCES Adherent(ID),
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
    FOREIGN KEY (AdherentID) REFERENCES Adherent(ID)
);

CREATE TABLE Signature (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    AdherentID INT,
    Date DATE,
    Signature VARCHAR(255),
    FOREIGN KEY (AdherentID) REFERENCES Adherent(ID)
);


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

INSERT INTO Formule (Nom, TrancheAge, AdherentClub, LicenceFFST, Cours, CoutTotal) VALUES
('Baby Taekwondo', '4-6 ans', 30.00, 15.00, 71.00, 116.00),
('Enfants', '7-11 ans', 30.00, 21.00, 135.00, 186.00),
('Ados/Adultes', '12 ans et plus', 30.00, 25.00, 176.00, 231.00);

