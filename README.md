# TFS Pocket

TFS Pocket is a student-focused lending-platform foundation. It is intentionally **not production ready**: loan products, pricing, legal wording, identity/credit checks, payment collection, notification delivery and regulatory approval must be configured and approved before live use.

## Architecture

- Next.js 16 / React / TypeScript frontend and server routes
- Prisma + SQLite for local development (swap the datasource for managed PostgreSQL before deployment)
- Server-side signed, HTTP-only sessions; bcrypt password hashes
- Integer cents for financial calculations; no browser-side acceptance of loan decisions
- Role-separated customer and administrator pages

## Run locally

1. Copy `.env.example` to `.env` and replace `AUTH_SECRET`.
2. `npm install`
3. `npm run db:generate`
4. `npx prisma migrate dev` to apply the checked-in migration. If the Windows Prisma migration engine reports a schema-engine error locally, use `npx prisma db push` for a disposable development database, then investigate before deploying.
5. Set `INITIAL_ADMIN_PASSWORD` in your uncommitted `.env`, then run `npm run db:seed` to create a local-only administrator.
6. `npm run dev`

Use `npm test` and `npm run build` before deployment.

## Configuration and integrations

The calculator is demonstration-only and returns no interest or fees unless approved pricing is modelled. Payment provider variables are placeholders: do not treat any payment as confirmed without a signature-verified, idempotent provider webhook and reconciliation.

Document uploads, email/SMS providers, phone verification, malware scanning, credit-bureau checks, bank verification, debit-order mandate capture, agreement generation, full password reset and operational rate limiting are extension points that require provider selection, credentials and professional review.

## Production readiness checklist

- Obtain legal advice and National Credit Act/NCR, POPIA, disclosure and agreement review.
- Replace SQLite with backed-up PostgreSQL; run migrations and restrict database access.
- Configure a secret manager, HTTPS, CSP, monitoring, retention/deletion processes, vulnerability scanning and incident procedures.
- Integrate private encrypted document storage with malware scanning and signed download URLs.
- Select regulated payment/debit-order, identity, credit-check and communications providers; validate callbacks and reconciliation operations.
- Configure approved loan products, pricing versions, eligibility policy, permissions, support/complaints contacts and legal document versions.

Never enter real customer data in the local development database.
