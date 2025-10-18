FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/api/package.json apps/api/
COPY packages/database/package.json packages/database/
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate
RUN pnpm install --filter @educaia/api... --prod --no-optional
COPY . .
RUN pnpm --filter @educaia/api build
CMD ["node", "apps/api/dist/main.js"]
