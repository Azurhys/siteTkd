const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (err) {
    console.error('Error hashing password:', err);
    throw err;
  }
};

const generateInsertAdminQuery = async () => {
  const nom = 'Admin';
  const prenom = 'Istrateur';
  const email = 'admin@example.com';
  const mot_de_passe = 'admin123'; 
  const adresse = '123 Admin St';
  const telephone = '1234567890';
  const droit = 1; 

  const hashedPassword = await hashPassword(mot_de_passe);

  const insertAdminQuery = `
    INSERT INTO Utilisateur (nom, prenom, email, mot_de_passe, adresse, telephone, droit) VALUES
    ('${nom}', '${prenom}', '${email}', '${hashedPassword}', '${adresse}', '${telephone}', ${droit});
  `;

  console.log(insertAdminQuery);
};

generateInsertAdminQuery();
