# Impostare l'immagine di base
FROM node:20-alpine

# Impostare la directory di lavoro nel container
WORKDIR /app

# Copiare package.json e package-lock.json (se disponibile)
COPY src/package*.json ./

# Installare le dipendenze del progetto (inclusi pacchetti dev)
RUN npm install

# Copiare il resto dei file del progetto
COPY src/ .

# Impostare le variabili di ambiente
ENV HOST=0.0.0.0 PORT=3000

# Impostare la porta su cui l'applicazione sarà esposta
EXPOSE 3000

CMD ["npm", "run", "dev"]