# Wybierz obraz bazowy z Node.js
FROM node:18

# Utwórz katalog roboczy w kontenerze
WORKDIR /usr/src/app

# Skopiuj package.json i package-lock.json
COPY package*.json ./

# Zainstaluj zależności aplikacji
RUN npm install

# Skopiuj kod źródłowy aplikacji
COPY . .

# Ustaw zmienną środowiskową na port, który będzie nasłuchiwał
ENV PORT=3031

# Otwórz port 3000
EXPOSE 3031

# Uruchom aplikację
CMD [ "npm", "run","dev" ]