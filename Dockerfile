FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm config set strict-ssl false && npm install
COPY . .
RUN npm config set strict-ssl false && npm run build
RUN ls
EXPOSE 3000
WORKDIR /app/build
CMD ["node", "index.js"]
