FROM node:22-slim

WORKDIR /app

COPY . .

RUN npm install -g pnpm@9

RUN pnpm install --no-frozen-lockfile

RUN pnpm --filter @workspace/api-server build

CMD ["pnpm", "--filter", "@workspace/api-server", "start"]
