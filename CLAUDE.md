# Claude Code project guide

## Purpose

This repository is a backend-first digital business card. The public page must
remain fast and accessible, while profile content is supplied by a typed GraphQL
API backed by Prisma and CockroachDB.

## Architecture boundaries

- Resolvers translate GraphQL operations into service calls; they contain no
  persistence logic.
- Services own application logic and map database records to public models.
- `PrismaService` is the only database client used by application modules.
- The browser only queries `/graphql`; it never contains private credentials or
  connects to the database directly.
- Public fields must be explicitly declared in GraphQL models. Do not expose a
  Prisma record wholesale.

## Working agreement

1. Read the affected module and its tests before making a change.
2. Make the smallest complete change that satisfies the requirement.
3. Never invent experience, links or contact information. Use an obvious
   placeholder and mention it in the handoff when data is unknown.
4. Run `npm run lint`, `npm test` and `npm run build` after TypeScript changes.
5. Explain database schema changes and update the seed when the public model
   changes.
6. A human reviews every diff and verifies the result in a browser before merge.

## Common tasks

- Change profile content: edit `prisma/seed.ts`, then run `npm run prisma:seed`.
- Add or reorganize a technology: update the categorized `skillGroups` seed;
  preserve honest qualifiers such as `basic` and `fundamentals`.
- Add a GraphQL field: update the Prisma schema if persistent, the GraphQL model,
  the service mapping, the query in `public/app.js`, and relevant tests.
- Inspect the API locally with the example request in `README.md`.

## Definition of done

- TypeScript compiles in strict mode.
- Tests and lint pass.
- No secrets or `.env` files are committed.
- Desktop and mobile layouts have been checked.
- README commands still work from a clean checkout.
