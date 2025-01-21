# Utiliser une image Node.js comme base
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json et installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copier tout le reste du code source
COPY . .

# Exposer le port pour le serveur de développement
EXPOSE 5173

# Lancer le serveur de développement
CMD ["npm", "run", "dev"]

