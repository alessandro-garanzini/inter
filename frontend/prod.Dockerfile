# Impostare l'immagine di base
FROM node:20-alpine

# Impostare la directory di lavoro nel container
WORKDIR /app

# Copiare package.json e package-lock.json (se disponibile)
COPY src/package*.json ./

# Installare SOLO le dipendenze necessarie per la produzione
RUN npm install --only=production

# Copiare il resto dei file del progetto
COPY .. .

# Costruire l'app per la produzione
RUN npm run build

# Impostare la porta su cui l'applicazione sarà esposta
EXPOSE 3000

# Eseguire l'applicazione in modalità produzione
CMD ["npm", "run", "start"]
