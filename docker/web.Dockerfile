FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-workspace.yaml turbo.json ./
COPY apps/web/package.json apps/web/
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate
RUN pnpm install --filter @educaia/web... --prod --no-optional
COPY . .
RUN pnpm --filter @educaia/web build
CMD ["pnpm", "--filter", "@educaia/web", "start"]
