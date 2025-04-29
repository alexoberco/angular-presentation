# Etapa: Contenedor de desarrollo Angular
FROM node:lts

WORKDIR /app

# Instala Angular CLI globalmente (opcional, pero útil)
RUN npm install -g @angular/cli@latest

# Copia package.json e instala dependencias
COPY package*.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Expón el puerto de ng serve
EXPOSE 4200

# Usa un entrypoint que soporte hot reload
ENTRYPOINT ["npm", "run", "start"]

