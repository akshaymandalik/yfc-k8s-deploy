FROM node:20-alpine
WORKDIR /app
COPY package*.json /app/
RUN npm ci --omit=dev
COPY . /app/
EXPOSE 5001
USER node
CMD ["node","app.js"]