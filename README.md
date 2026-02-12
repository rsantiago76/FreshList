# FreshList

Healthy eating planner + smart grocery habits. Vercel frontend + AWS serverless backend.

## Structure
- `frontend/` Next.js 14 (Vercel)
- `backend/` AWS Lambda (Node.js 20 + TypeScript)
- `infra/` Terraform (API Gateway + Lambda + DynamoDB)
- `docs/` Architecture, API contract, runbook
- `.github/workflows/` CI/CD for AWS + Vercel

## Quickstart
1) Frontend:
```bash
cd frontend
npm i
npm run dev
```

2) Backend build artifact:
```bash
cd backend
npm i
node scripts/zip.mjs
```

3) AWS deploy:
```bash
cd infra
terraform init
terraform apply
```

Then set `NEXT_PUBLIC_API_BASE_URL` in Vercel to the `api_base_url` output.
