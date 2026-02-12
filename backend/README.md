# FreshList Backend (AWS Lambda + API Gateway)

- Runtime: Node.js 20
- Language: TypeScript
- Output artifact: `backend/lambda.zip`

## Local build
```bash
npm i
npm run build
node scripts/zip.mjs
```

This backend is designed to be deployed by Terraform in `../infra`.
