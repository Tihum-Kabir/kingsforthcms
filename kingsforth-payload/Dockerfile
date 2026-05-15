FROM node:22-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application
COPY . .

# Build args needed for Next.js static generation at build time
ARG PAYLOAD_SECRET=build-time-placeholder-secret-not-used-in-prod
ARG DATABASE_URI=postgresql://postgres:admin123@postgres:5432/kingsforth_payload
ARG NEXT_PUBLIC_APP_URL=http://localhost:3000

ENV PAYLOAD_SECRET=$PAYLOAD_SECRET
ENV DATABASE_URI=$DATABASE_URI
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

# Expose Next.js port and Swagger port
EXPOSE 3000
EXPOSE 8005

# Build the application
RUN npm run build

# Start Next.js (You can override this in docker-compose)
CMD ["npm", "start"]
