# freshlist Infrastructure (Terraform)

Provisions:
- DynamoDB (single-table)
- Lambda (Node.js 20)
- API Gateway HTTP API (proxy route)
- IAM roles/policies
- CloudWatch logs

## Deploy
```bash
cd infra
terraform init
terraform apply
```

Output:
- `api_base_url` (use as NEXT_PUBLIC_API_BASE_URL in Vercel)
