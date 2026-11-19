# Zentro

Zentro is a modern online store for easy shopping and doorstep delivery.

It is a full-stack ecommerce web app focused on a clean, fast shopping experience. The current foundation includes JWT authentication (login/register), member accounts, and a ready base for catalog, cart, and checkout.

> Sign in to manage orders, unlock member deals, and checkout faster — with free shipping from 99K, easy 7-day returns, and 100% authentic products as the product vision.

## Tech stack

| Layer | Stack |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS, React Router |
| Backend | Spring Boot, Spring Security, JWT |
| Data | PostgreSQL, Spring Data JPA, Flyway |

## Project structure

```text
Zentro/
├── frontend/                 # React SPA
├── backend/                  # Spring Boot API
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── PR_DESCRIPTION.md
├── SECURITY.md
└── README.md
```

## Features (current)

- [x] User register / login
- [x] JWT access tokens
- [x] Role-based accounts (`ROLE_USER`, `ROLE_ADMIN`)
- [x] Demo user seeding on startup
- [ ] Product catalog
- [ ] Cart & checkout
- [ ] Order tracking

## Prerequisites

- Node.js 20+
- Java 25+
- PostgreSQL 16+ (database: `zentro`)

## Quick start

### 1. Database

Create a PostgreSQL database named `zentro`, then configure credentials in:

`backend/src/main/resources/application.yaml`

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/zentro
    username: postgres
    password: your_password
```

Also update JWT secret before any real deployment:

```yaml
zentro:
  jwt:
    secret: "change-me-to-a-long-random-secret"
```

### Google OAuth secrets (local only)

Copy the example file and fill in your Google Client ID / Secret:

```bash
cd backend/src/main/resources
cp application-local.yaml.example application-local.yaml
```

`application-local.yaml` is **gitignored** — never commit real keys.

You can also set environment variables instead:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI` (default: `http://localhost:8080/login/oauth2/code/google`)

### 2. Backend

```bash
cd backend
./mvnw spring-boot:run
# Windows:
# .\mvnw.cmd spring-boot:run
```

API: [http://localhost:8080](http://localhost:8080)

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

App: [http://localhost:5173](http://localhost:5173)

## Demo accounts

Seeded automatically when missing:

| Role | Email | Password |
| --- | --- | --- |
| Admin | `admin@zentro.local` | `Admin@123` |
| Customer | `customer@zentro.local` | `Customer@123` |

## Main API routes

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Create account |
| `POST` | `/api/auth/login` | Login, receive JWT |
| `GET` | `/api/auth/me` | Current user (Bearer token) |

## Scripts

### Frontend

```bash
npm run dev       # local development
npm run build     # production build
npm run lint      # oxlint
npm run preview   # preview production build
```

### Backend

```bash
./mvnw spring-boot:run
./mvnw test
```

## Contributing

Please read:

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [PR_DESCRIPTION.md](PR_DESCRIPTION.md)
- [SECURITY.md](SECURITY.md)

## License

This project is licensed under the [MIT License](LICENSE).
