# Utiliser une image Node.js comme base
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers et installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Démarrer le serveur
CMD ["npm", "start"]

# Exposer le port pour l'API
EXPOSE 9017
