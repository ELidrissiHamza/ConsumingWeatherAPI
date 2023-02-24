
# Cette instruction indique l image de base à partir de laquelle votre image sera construite
FROM node
#Cette instruction définit le répertoire de travail actif dans l'image en cours de construction.
WORKDIR /app
#Cette instruction copie des fichiers ou des dossiers du système hôte dans l'image en cours de construction
COPY package*.json ./
# Cette instruction exécute une commande dans le shell de l'image en cours de construction.
RUN npm install
#Cette instruction copie des fichiers ou des dossiers du système hôte dans l'image en cours de construction.
COPY . .
#Cette instruction indique aux utilisateurs de l'image les ports qui sont ouverts pour la communication externe.
EXPOSE 3500
# Cette instruction définit la commande qui sera exécutée lorsque le conteneur sera démarré à partir de l'image.
CMD ["npm","start"]