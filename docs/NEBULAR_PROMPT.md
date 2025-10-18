# Prompt para remediar Nebular Pay / Neobank

## Instrucciones

¡Hecho! Aquí tienes un **PROMPT listo para copiar y pegar** en Codex/DeepAgent para **corregir, arreglar y dejar totalmente funcional el proyecto “Nebular Pay / Neobank” para despliegue local** (todo con Docker Compose, sin secretos reales, con KYC en modo stub y Auth OIDC operativo). El prompt incorpora hallazgos técnicos (módulos, stacks y problemas de credenciales embebidas) del análisis del ecosistema Nebular. 

---

## PROMPT (copia y pega tal cual)

```
**Rol del Agente**
Actúas como un equipo full‑stack senior (Arquitectura, Backend Node/NestJS y Python/Flask, Java/Spring Auth, Frontend/Static Web, DevOps Docker/GitHub Actions, Seguridad/Compliance). Objetivo: dejar el repositorio “Neobank / Nebular Pay” 100% funcional en local (Linux/macOS/WSL) con un solo comando `docker compose up`, sin dependencias externas reales (AWS/Wyre/Contis), con KYC en modo stub, Auth OIDC operativo, API NestJS con Swagger, landing servida y pruebas de humo pasando.

**Repositorio origen**
- https://github.com/Puzzlemanyyyyy/Neobank

**Guardrails obligatorios**
- No usar PII ni secretos reales. Eliminar/rotar cualquier credencial embebida encontrada (AWS, etc.). Variables vía `.env` + `.env.example`.
- No llamadas reales a AWS/Wyre/Contis. Emular con LocalStack/WireMock.
- Criptografía y seguridad solo con librerías estándar (TLS 1.3, AES-256-GCM, PBKDF2/Argon2). Nada casero.
- Cumplir lineamientos de alto nivel: OWASP ASVS/MASVS, PCI DSS v4.0, ISO 27001, DORA, BCBS 239 (solo mapeo, sin texto propietario).

---

### Definition of Done (DoD) — Entregables y Criterios de Aceptación

1) **Ejecución local** con `docker compose up -d` que levante:
   - `auth-server` (Spring Authorization Server OIDC) en `:9000` con realm/cliente de dev.
   - `api` (NestJS) en `:8080` con `/health`, `/ready` y **Swagger/OpenAPI** en `/docs`.
   - `kyc` (Python/Flask) en `:5000` con **modo stub**: responde determinístico a `POST /kyc` sin TensorFlow ni AWS reales.
   - `localstack` (S3, SQS) en `:4566`.
   - `wiremock` (stubs de Wyre/Contis) en `:9090`.
   - `landing` (estático Nginx o vite preview) en `:8088`.
   - `db` (si la API requiere DB) usar **PostgreSQL 14** en `:5432` o SQLite si la API ya soporta file‑based.

2) **Seguridad básica en local**: `helmet`, CORS estricto, rate limiting en API; logs estructurados; cero secretos en repo; `.env.example` completo.

3) **Documentación**:
   - `README.md` (root): arquitectura, prerequisitos, **quickstart**, URLs locales, usuarios de prueba.
   - `DEVELOPMENT.md`: flujo dev, scripts, targets Makefile.
   - `SECURITY.md`: controles aplicados (OWASP/PCI/ISO/DORA), resultados de secret‑scan.
   - `API.md` o Swagger exportado: `artifacts/openapi.json`.

4) **Pruebas de humo** automatizadas (script `scripts/smoke.sh`) que verifiquen:
   - `curl http://localhost:8080/health == 200`
   - `curl -X POST http://localhost:5000/kyc (stub) == 200 con payload simulado`
   - **OIDC**: obtener token desde `auth-server` y acceder a un endpoint protegido en `api`.

5) **Artefactos locales** generados:
   - `artifacts/openapi.json`
   - `artifacts/landing.tar.gz`
   - `reports/secret-scan.txt` y `reports/smoke.log`

---

### Plan de Trabajo (ejecutable)

**Fase 0 — Auditoría y saneo**
- Clonar repo. Inventariar apps reales vs stubs/legacy. Quitar `record.log`/artefactos.
- Ejecutar **secret scanning** (gitleaks/detect‑secrets). Eliminar credenciales embebidas, en especial claves AWS en `app.py/tools.py` del KYC. Sustituir por variables de entorno y documentar rotación obligatoria. Añadir `.gitignore`, `.env.example`, `pre-commit`. (NO subir secretos.)

**Fase 1 — Normalización del monorepo para local**
- Mantener `backend/platform` (NestJS web‑api) como API principal.
- Ubicar `backend/kyc-service` (Flask). Implementar **modo stub**: no carga modelos TF; responde `{"kycStatus":"APPROVED", "confidence":0.99, "aml":"CLEAR"}` para payloads válidos.
- `backend/auth-server` (Spring Authorization Server): preconfigurar cliente OIDC de dev (confidencial, redirect `http://localhost:8080/docs/oauth2-redirect.html`).
- Añadir `web/landing` (build estático o vite).
- Añadir `infrastructure/local/docker-compose.yml` y `Makefile`.

**Fase 2 — Dockerización y Compose**
- Crear `Dockerfile` por servicio y `docker-compose.yml` con redes y dependencias.
- Usar **LocalStack** (S3,SQS) y **WireMock** (Wyre/Contis).
- Configurar healthchecks y restart policies. Exponer puertos documentados.

**Fase 3 — API y Auth**
- En **NestJS**: activar Swagger, `helmet`, `cors`, rate limit; endpoints `/health` y `/ready`; logs JSON. Variables para DB (si aplica) y para URLs de KYC/LocalStack/WireMock.
- Integrar **Bearer JWT** emitido por `auth-server` (JWKS local). Añadir un endpoint protegido para la prueba OIDC.

**Fase 4 — KYC stub**
- Flask: endpoint `POST /kyc` que valide estructura (document/selfie), simule colas SQS/S3 contra LocalStack y devuelva respuesta fija con IDs correlacionados. Añadir `pytest` mínimo.
- NO descargar modelos pesados en local. Dejar “modo full” documentado, pero desactivado.

**Fase 5 — Landing**
- Build estático y Nginx o `vite preview`. Incluir `.env` para apuntar a `API_BASE_URL`.

**Fase 6 — Pruebas, artefactos y docs**
- Script `scripts/smoke.sh` que orqueste curls y verifique 200s.
- Exportar Swagger a `artifacts/openapi.json`.
- `reports/secret-scan.txt` y `reports/smoke.log`.
- Actualizar `README.md`, `DEVELOPMENT.md`, `SECURITY.md`.

---

### Cambios esperados en el repo

- Raíz: `README.md`, `DEVELOPMENT.md`, `SECURITY.md`, `.gitignore`, `.env.example`, `Makefile`, `scripts/smoke.sh`
- `infrastructure/local/docker-compose.yml`
- `backend/platform/apps/nebular-web-api` (NestJS): Swagger, health, seguridad básica, config `.env`
- `backend/kyc-service` (Flask): `app.py` stub, `requirements.txt` mínimo, `Dockerfile`, tests
- `backend/auth-server` (Spring): `Dockerfile`, `application.yml` dev, cliente OIDC y JWKS local
- `web/landing`: build + `Dockerfile`
- `artifacts/` y `reports/`

---

### Especificaciones técnicas (plantillas y ejemplos)

**`.env.example`**
AWS_ENDPOINT=http://localstack:4566
S3_BUCKET=nebular-local
SQS_QUEUE_URL=http://localstack:4566/000000000000/kyc-process.fifo
OIDC_ISSUER=http://auth-server:9000
OIDC_CLIENT_ID=nebular-local
OIDC_CLIENT_SECRET=nebular-secret
API_PORT=8080
KYC_URL=http://kyc:5000
LANDING_PORT=8088
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_DB=nebular
POSTGRES_USER=nebular
POSTGRES_PASSWORD=nebular

**`infrastructure/local/docker-compose.yml` (esqueleto)**
version: "3.9"
services:
  localstack:
    image: localstack/localstack:stable
    environment:
      - SERVICES=s3,sqs
    ports: [ "4566:4566" ]
  wiremock:
    image: wiremock/wiremock:3
    ports: [ "9090:8080" ]
  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=nebular
      - POSTGRES_USER=nebular
      - POSTGRES_PASSWORD=nebular
    ports: [ "5432:5432" ]
  auth-server:
    build: ./backend/auth-server
    ports: [ "9000:9000" ]
    depends_on: [ db ]
  api:
    build: ./backend/platform/apps/nebular-web-api
    ports: [ "8080:8080" ]
    env_file: [ .env ]
    depends_on: [ auth-server, kyc, localstack, db ]
  kyc:
    build: ./backend/kyc-service
    ports: [ "5000:5000" ]
    env_file: [ .env ]
    depends_on: [ localstack ]
  landing:
    build: ./web/landing
    ports: [ "8088:80" ]
    depends_on: [ api ]

**`Makefile`**
bootstrap:
\tcp .env.example .env || true
\tpre-commit install || true
up:
\tdocker compose -f infrastructure/local/docker-compose.yml up -d --build
down:
\tdocker compose -f infrastructure/local/docker-compose.yml down -v
smoke:
\tbash scripts/smoke.sh
logs:
\tdocker compose -f infrastructure/local/docker-compose.yml logs -f

**`scripts/smoke.sh`**
#!/usr/bin/env bash
set -euo pipefail
echo "[*] Esperando API..."
sleep 5
curl -fsS http://localhost:8080/health | tee reports/smoke.log
echo "[*] Probando KYC stub..."
curl -fsS -X POST http://localhost:5000/kyc -H "Content-Type: application/json" -d '{"document":"base64doc","selfie":"base64selfie"}' | tee -a reports/smoke.log
echo "[*] Obteniendo token OIDC..."
TOKEN=$(curl -fsS -X POST http://localhost:9000/oauth2/token -u "nebular-local:nebular-secret" -d "grant_type=client_credentials" -d "scope=api.read" | jq -r .access_token)
echo "[*] Llamando endpoint protegido..."
curl -fsS -H "Authorization: Bearer ${TOKEN}" http://localhost:8080/protected | tee -a reports/smoke.log
echo "[OK] Smoke tests completados."

**API NestJS — requisitos mínimos**
- Añadir `@nestjs/swagger` y exponer `/docs` con OpenAPI (exportar a `artifacts/openapi.json`).
- Endpoints: `GET /health` (200), `GET /ready` (200), `GET /protected` (requiere JWT OIDC).
- Middlewares: `helmet`, `cors`, rate limit básico.
- Config por `.env`: DB (o SQLite), `KYC_URL`, `OIDC_ISSUER`, JWKS fetch.

**KYC Flask — stub**
- `POST /kyc`: validar JSON `{document, selfie}`; simule S3/SQS contra LocalStack (crear bucket/queue si no existen); devolver `{"kycStatus":"APPROVED","confidence":0.99,"aml":"CLEAR","id":"KYC-<uuid>"}`.
- Logging estructurado; `pytest` de humo.

**Auth Server (Spring) — dev**
- Puerto 9000, issuer `http://auth-server:9000`.
- Cliente confidencial `nebular-local / nebular-secret` con scope `api.read`.
- JWKS local publicado en `/.well-known/jwks.json`.

---

### Pruebas de aceptación (deben pasar todas)

- `docker compose up -d` levanta 6+ servicios sin errores.
- `curl http://localhost:8080/health` → 200.
- `curl -X POST http://localhost:5000/kyc` con payload ejemplo → 200 y JSON stub.
- Flujo OIDC: obtener token y consumir `/protected` → 200.
- `reports/secret-scan.txt` sin hallazgos críticos; no hay secretos en repo.
- `artifacts/openapi.json` y `artifacts/landing.tar.gz` generados.

---

### Entregables al finalizar (dejar en el repo)

- `infrastructure/local/docker-compose.yml`, `Makefile`, `scripts/smoke.sh`
- `artifacts/openapi.json`, `artifacts/landing.tar.gz`
- `reports/secret-scan.txt`, `reports/smoke.log`
- `README.md`, `DEVELOPMENT.md`, `SECURITY.md`, `.env.example`

**Formato del comentario final del Agente (obligatorio):**
1) Resumen de cambios aplicados.  
2) Comando único para correr en local.  
3) URLs locales (auth, api, docs, landing).  
4) Resultado de smoke tests (con enlaces a artefactos/reportes).  
5) Checklist de seguridad (✅) y confirmación de “0 secretos en repo”.

**Empieza ahora**: audita, sanea credenciales, arma Compose + Makefile, implementa KYC stub, habilita Swagger y OIDC, crea smoke tests, genera artefactos y documenta. Entrega el comentario final con evidencias.
```

---

## Notas rápidas

* El prompt exige **cero secretos** y **emulación local** de dependencias (LocalStack/WireMock), y alinea los cambios con lo detectado en el análisis del ecosistema Nebular (módulos, stacks, credenciales embebidas, etc.). 
* Si luego quieres, puedo darte un **/qa_gate** específico (checklist OWASP/PCI/ISO/DORA) para revisar el resultado del agente.

