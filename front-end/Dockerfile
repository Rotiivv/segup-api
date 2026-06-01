FROM node:22-alpine

# Cria a pasta app e define como diretório de trabalho para a aplicação.
WORKDIR /app

# Expõe para quem for ler que essa aplicação usa a porta 3000.
# Em aplicações Next.js/Vite/React, geralmente o frontend roda na porta 3000.
EXPOSE 3000

# Para produção em outro momento:
# COPY package*.json ./
# RUN npm install
# COPY . .
# CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]