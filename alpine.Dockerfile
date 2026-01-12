# Use Node.js version 14 as the base image
FROM node:20.15.1-alpine

# Set the working directory to /app
WORKDIR /app

ENV DATABASE_URL=

# Copy the package.json and yarn.lock files to the container
COPY package.json ./

# Install Yarn globally
#RUN npm install yarn --location=global

# Install the dependencies using Yarn
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

#COPY .env .env

# Install Prisma globally (if necessary, you can use yarn global add prisma)
RUN yarn global add prisma

# Generate the Prisma client
RUN yarn prisma:generate:schema

RUN yarn build

EXPOSE 8000

ENTRYPOINT ["yarn", "start:prod"]