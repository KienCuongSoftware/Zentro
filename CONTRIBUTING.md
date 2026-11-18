# Contributing to Zentro

Thanks for your interest in contributing to **Zentro**, a full-stack ecommerce
platform (React + Spring Boot).

By participating, you agree to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Project layout

```text
Zentro/
├── frontend/     # React + Vite + Tailwind CSS
└── backend/      # Spring Boot + JPA + Flyway + PostgreSQL
```

## Development setup

### Prerequisites

- Node.js 20+ and npm
- Java 25+
- Maven Wrapper (`./mvnw` / `mvnw.cmd`) included in `backend/`
- PostgreSQL 16+ (database name: `zentro`)

### Backend

```bash
cd backend
# Configure DB credentials in src/main/resources/application.yaml if needed
./mvnw spring-boot:run
```

API defaults to `http://localhost:8080`.

Demo accounts (seeded on startup when missing):

| Email | Password |
| --- | --- |
| `admin@zentro.local` | `Admin@123` |
| `customer@zentro.local` | `Customer@123` |

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App defaults to the Vite dev server (usually `http://localhost:5173`).

## How to contribute

1. Fork the repository (or create a branch if you have write access).
2. Create a focused branch:
   - `feat/...` for features
   - `fix/...` for bug fixes
   - `docs/...` for documentation
   - `chore/...` for tooling / cleanup
3. Make your changes with clear commits.
4. Test locally (frontend build/lint + backend start).
5. Open a pull request using [PR_DESCRIPTION.md](PR_DESCRIPTION.md) as a guide.

## Coding guidelines

### Frontend (`frontend/`)

- Prefer small, readable React components.
- Keep auth and API calls in existing modules (`src/auth`, `src/api`) when possible.
- Match current UI patterns (auth forms, spacing, CSS variables in `src/index.css`).
- Run lint before opening a PR:

```bash
cd frontend
npm run lint
npm run build
```

### Backend (`backend/`)

- Follow existing package structure (`auth`, `user`, `config`, `security`).
- Prefer constructor injection and existing DTO patterns.
- Database changes must go through **Flyway** migrations
  (`src/main/resources/db/migration/`).
- Do not commit secrets, real credentials, or production `.env` files.
- Keep passwords hashed; never log tokens or raw passwords.

## Commit messages

Use concise, imperative messages:

```text
feat(auth): add refresh token rotation
fix(register): stack password fields on mobile
docs: clarify local PostgreSQL setup
```

## Pull requests

- Keep PRs focused (one concern per PR when practical).
- Describe **what** changed and **why**.
- Note breaking changes, migrations, and demo account impacts.
- Link related issues.
- Include screenshots for UI changes.

See [PR_DESCRIPTION.md](PR_DESCRIPTION.md).

## Reporting bugs

Please include:

- Steps to reproduce
- Expected vs actual behavior
- Browser / OS (frontend) or Java / DB version (backend)
- Relevant logs (redact secrets)

Security issues: see [SECURITY.md](SECURITY.md). Do **not** open public issues
for vulnerabilities.

## License

By contributing, you agree that your contributions will be licensed under the
MIT License (see [LICENSE](LICENSE)).
