# Utiliser une image Node.js comme base
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers et installer les dépendances
COPY package.json package-lock.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Construire l'application React
RUN npm run build

# Servir l'application avec un serveur statique
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Exposer le port pour le serveur
EXPOSE 5173
