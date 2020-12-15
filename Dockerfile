FROM node:12 AS builder
WORKDIR /build
COPY . .
RUN npm ci
RUN $(npm bin)/tsc -p .

FROM node:12
WORKDIR /app
COPY --from=builder /build/dist .
COPY package.json .
COPY package-lock.json .
RUN npm ci --production
CMD ["node", "/app/index.js"]
