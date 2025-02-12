FROM node:22
WORKDIR /app
COPY . .
RUN rm -f .env && mv .env.docker .env
RUN npm install --ignore-scripts
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:docker"]