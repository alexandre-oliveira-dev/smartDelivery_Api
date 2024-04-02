# Use a imagem oficial do Node.js
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e o arquivo package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install yarn && yarn

# Copie todos os arquivos do diretório atual para o diretório de trabalho dentro do contêiner
COPY . .

# Exponha a porta em que o servidor da API está sendo executado
EXPOSE 5000



