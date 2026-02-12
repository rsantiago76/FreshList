# FreshList Runbook

## Local Development

### Prerequisites
- Node.js 20+
- AWS CLI configured
- Terraform installed

### Backend
```bash
cd backend
npm install
npm run build # Compiles TS
```

### Frontend
```bash
cd frontend
npm install
# Create .env.local
echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:3001" > .env.local
npm run dev
```

## Deployment

### Manual Deploy (Backend)
1.  Build Lambda:
    ```bash
    cd backend
    npm run zip
    ```
2.  Apply Terraform:
    ```bash
    cd infra
    terraform init
    terraform apply
    ```
3.  Note the `api_base_url` output.

### Manual Deploy (Frontend)
1.  Install Vercel CLI: `npm i -g vercel`
2.  Deploy:
    ```bash
    cd frontend
    vercel deploy --prod
    ```
3.  Set Environment Variable in Vercel:
    - `NEXT_PUBLIC_API_BASE_URL`: (Value from Terraform output)

### CI/CD
- **Backend**: Pushing changes to `backend/**` or `infra/**` triggers GitHub Action `Deploy Backend`.
- **Frontend**: Pushing changes to `frontend/**` triggers GitHub Action `Deploy Frontend`.
- **Secrets Required in GitHub**:
    - `AWS_ROLE_ARN` (OIDC Role)
    - `VERCEL_TOKEN`
    - `VERCEL_ORG_ID`
    - `VERCEL_PROJECT_ID`
