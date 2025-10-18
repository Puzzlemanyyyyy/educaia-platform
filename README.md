# EducaIA Platform (Skeleton)

This repository provides a starting point for the EducaIA monorepo. It wires together a Next.js 14 frontend, a NestJS API, shared packages and worker processes using Turborepo and pnpm.

## Getting started

```bash
pnpm install
pnpm --filter @educaia/database deploy
pnpm --filter @educaia/database seed
pnpm dev
```

The `dev` script runs both the web and api applications concurrently via Turborepo. Refer to the individual `apps` and `packages` directories for more context about each workspace.

### Running a production build locally

To preview the platform with production settings, use Docker Compose:

```bash
cp .env.example .env
docker compose up --build
```

This launches PostgreSQL, Redis, the NestJS API on [http://localhost:4000](http://localhost:4000) and the Next.js frontend on [http://localhost:3000](http://localhost:3000). Stop everything with `docker compose down -v` when you are finished.

If you prefer the pnpm workflow instead of containers, follow the steps in [docs/deployment-guide.md](docs/deployment-guide.md).

### API endpoints

Once the stack is running locally (by default on http://localhost:4000) you can query the following endpoints:

- `GET /health` – simple readiness probe.
- `GET /courses` – returns the catalog seeded via Prisma.
- `GET /courses/:slug` – fetch a single course by its slug.

The web catalogue page consumes the `/courses` endpoint to present live data.

## Additional resources

- [`docs/deployment-guide.md`](docs/deployment-guide.md): how to publish the repository on GitHub and reproduce a production build locally.
- [`docs/NEBULAR_PROMPT.md`](docs/NEBULAR_PROMPT.md): reference prompt detailing the remediation plan for the Nebular Pay / Neobank project, including guardrails, definition of done, work plan, and acceptance criteria.
