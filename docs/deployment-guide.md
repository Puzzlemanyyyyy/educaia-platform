# Deployment and Production Preview Guide

This document explains how to publish the EducaIA platform on GitHub and how to run a production-like instance on your local machine. It assumes you have already cloned this repository and can run commands from the project root.

## 1. Preparing the GitHub repository

1. Create a new empty repository on GitHub (or fork this project).
2. Set the newly created repository as a remote in your local clone:
   ```bash
   git remote add origin git@github.com:<your-org>/<your-repo>.git
   ```
3. Review the repository for secrets. The project already ships with `.env.example` so you should never commit real credentials. If you need to rotate environment variables later, do so through your secret manager or hosting platform instead of the repo.

### Required GitHub secrets for CI/CD

The included GitHub Actions workflow (`.github/workflows/ci.yml`) only needs Node.js and pnpm to run. By default it does not publish Docker images or deploy automatically. If you later extend the workflow to deploy somewhere (Render, Fly.io, AWS, etc.), add the required credentials as GitHub secrets and reference them inside the workflow file.

## 2. Publishing the code to GitHub

Once the remote is configured, push the local work to GitHub:

```bash
git push -u origin main
```

Every subsequent push or pull request targeting `main` will trigger the CI workflow that installs dependencies, runs lint/type checks, and builds the applications.

## 3. Running the stack in production mode locally

You can preview the production build of the platform in two ways: using Docker Compose (recommended) or using pnpm directly.

### Option A — Docker Compose

1. Ensure Docker Desktop (or an equivalent Docker Engine) is running.
2. Copy the example environment file and adjust values if necessary:
   ```bash
   cp .env.example .env
   ```
3. Build and start the containers:
   ```bash
   docker compose up --build
   ```
4. After all services are healthy, access the applications:
   - API (NestJS): http://localhost:4000
   - Web (Next.js): http://localhost:3000
   - PostgreSQL: localhost:5432 (`postgres` / `postgres`)
   - Redis: localhost:6379

> Tip: run `docker compose down -v` to stop and remove the containers and their volumes.

### Option B — Manual pnpm workflow

1. Install dependencies at the repository root:
   ```bash
   pnpm install
   ```
2. Generate the database schema and seed data:
   ```bash
   pnpm --filter @educaia/database prisma migrate deploy
   pnpm --filter @educaia/database prisma db seed
   ```
3. Build all workspaces in production mode:
   ```bash
   pnpm build
   ```
4. Start the production servers:
   ```bash
   pnpm --filter @educaia/api start
   pnpm --filter @educaia/web start
   ```
5. Visit the same URLs as above (API on port 4000, web on port 3000).

## 4. Viewing build artifacts and logs

- `pnpm build` outputs compiled artifacts to `apps/api/dist` and `.next` in `apps/web`.
- Docker images are defined under the `docker/` directory (`api.Dockerfile`, `web.Dockerfile`, etc.) in case you want to publish them to a registry.
- To inspect logs when using Docker Compose, run `docker compose logs -f`.

## 5. Next steps

- Configure hosting providers (e.g., Vercel for the web app and a managed Node host for the API) and reuse the Dockerfiles or build artifacts.
- Extend `.github/workflows/ci.yml` with deploy jobs that run after the build succeeds.
- Keep `.env` out of version control; share environment variables securely via secret stores.

With these steps you can host the code on GitHub, ensure CI runs on every push, and replicate a production environment locally to validate changes before shipping them.
