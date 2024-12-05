FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN npx prisma generate

EXPOSE 3333

CMD ["sh", "-c", "npx prisma migrate deploy && pnpm start:dev"]
