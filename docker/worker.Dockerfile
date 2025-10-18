FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/worker/package.json apps/worker/
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate
RUN pnpm install --filter @educaia/worker... --prod --no-optional
COPY . .
RUN pnpm --filter @educaia/worker build
CMD ["node", "apps/worker/dist/index.js"]
