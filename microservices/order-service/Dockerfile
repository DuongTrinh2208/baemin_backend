# Step 1: Use Node 19.7 as the base image
FROM node:19.7

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Step 4: Install dependencies (this step is cached if package.json hasn't changed)
RUN npm install

# Step 5: Copy the Prisma schema files and generate Prisma client
COPY ./src/prisma ./src/prisma/
RUN npx prisma generate --schema ./src/prisma/schema.prisma

# Step 6: Copy the rest of the application files (including source code)
COPY . .

# Step 7: Build the NestJS app
RUN npm run build

# Step 8: Expose the port
EXPOSE 3001

# Step 9: Define the command to run the app in production mode
CMD ["npm", "run", "start:prod"]
