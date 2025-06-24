# Dockerfile for dev environment
FROM node:22-alpine3.22

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml first to leverage Docker cache
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Install Prisma Client
COPY prisma ./prisma/
RUN pnpm prisma generate

# Copy all source files
COPY . .

EXPOSE 3000
