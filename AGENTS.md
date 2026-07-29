# Repository Guidelines

## Project Structure & Module Organization

This is a NestJS backend for Flood Radar. Application code lives in `src/`.

- `src/main.ts`: application bootstrap, CORS, global validation, and server startup.
- `src/app.module.ts`: root module that imports feature modules.
- `src/auth/`: registration, login, JWT generation, and auth guards.
- `src/users/`: user creation and lookup logic.
- `src/reports/`: flood report endpoints, DTOs, and service logic.
- `src/prisma/`: shared Prisma service and module.
- `src/generated/prisma/`: generated Prisma client code.
- `prisma/schema.prisma`: database schema for PostgreSQL.
- `test/`: end-to-end tests. Unit tests are colocated as `*.spec.ts` files in `src/`.

## Build, Test, and Development Commands

Use npm scripts from `package.json`:

- `npm run start:dev`: start the NestJS server in watch mode.
- `npm run build`: compile the TypeScript project into `dist/`.
- `npm run start:prod`: run the compiled app from `dist/main`.
- `npm test`: run unit tests with Jest.
- `npm run test:e2e`: run end-to-end tests from `test/`.
- `npm run test:cov`: run tests and generate coverage output.
- `npm run lint`: run ESLint and auto-fix supported issues.
- `npm run format`: format TypeScript files with Prettier.

## Coding Style & Naming Conventions

Write TypeScript using NestJS conventions. Use modules, controllers, services, DTOs, and guards with clear responsibility boundaries. Name files by feature and role, for example `reports.service.ts`, `auth.controller.ts`, and `create-report.dto.ts`.

Prettier enforces single quotes, semicolons, and trailing commas. Keep imports tidy and prefer dependency injection through constructors, as used by `PrismaService`, `UsersService`, and `AuthService`.

## Testing Guidelines

Jest is the test framework. Unit test files should use the `*.spec.ts` naming pattern and live beside the code they test. End-to-end tests belong in `test/` and use the e2e Jest config.

Before opening a pull request, run:

```bash
npm test
npm run lint
```

Add or update tests when changing service behavior, validation rules, guards, or controller responses.

## Commit & Pull Request Guidelines

Recent commits use short, descriptive messages, sometimes with a scoped prefix such as `feat(auth-requests): ...`. Prefer clear action-oriented messages, for example `Add report bounds validation` or `feat(auth): add protected me route`.

Pull requests should include a brief summary, testing performed, related issue links when available, and API examples or screenshots when behavior affects clients.

## Security & Configuration Tips

Do not commit real secrets. Use `.env` locally and keep `.env.example` updated when required variables change. `DATABASE_URL` is required by Prisma, and `JWT_SECRET` is required by authentication. Avoid returning sensitive fields such as `passwordHash` from service queries.

# Project instructions

This is a NestJS backend using TypeScript, Prisma and PostgreSQL.

## Development rules

- Use explicit and beginner-friendly TypeScript.
- Follow the Controller -> Service -> Prisma flow.
- Use DTOs with class-validator for request validation.
- Do not modify database migrations without explaining the changes first.
- Do not modify authentication or JWT behavior without approval.
- Do not read, display or modify .env files.
- Do not install dependencies without approval.
- Run formatting and tests after making changes.
- Explain every important code change.
- Prefer small focused changes instead of large refactors.