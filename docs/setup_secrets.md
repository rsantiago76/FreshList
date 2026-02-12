# Setting Up GitHub Secrets

To enable automated deployments, you need to add the following secrets to your GitHub Repository.

Go to: **Settings** > **Secrets and variables** > **Actions** > **New repository secret**.

## 1. AWS Credentials (`AWS_ROLE_ARN`)

The workflows use OpenID Connect (OIDC) to securely authenticate with AWS without long-lived access keys.

### Automatic Setup (Recommended)
If you have the AWS CLI configured on your machine, run the helper script provided:

```powershell
./scripts/setup-aws-oidc.ps1
```

Copy the Output ARN (starts with `arn:aws:iam::...`) and add it as `AWS_ROLE_ARN`.

### Manual Setup
If you cannot run the script:
1.  Go to AWS IAM Console > **Identity providers**.
2.  Add Provider > OpenID Connect.
    - Provider URL: `https://token.actions.githubusercontent.com`
    - Audience: `sts.amazonaws.com`
3.  Create a **Role** > Web Identity.
    - Identity provider: `token.actions.githubusercontent.com`
    - Audience: `sts.amazonaws.com`
    - GitHub Organization: `rsantiago76`
    - Repository: `FreshList`
4.  Attach Permissions: `AdministratorAccess` (or specific scoped policies for Lambda/DynamoDB/APIGateway).
5.  Copy the Role ARN.

---

## 2. Vercel Credentials

You need to link your project to Vercel to get these values.

### Step A: Get Vercel Token
1.  Go to [Vercel Account Tokens](https://vercel.com/account/tokens).
2.  Create a token (e.g., "GitHub Actions FreshList").
3.  Add it to GitHub Secrets as `VERCEL_TOKEN`.

### Step B: Get Project IDs
1.  Open your terminal in the `frontend/` directory.
2.  Run `npx vercel link`.
    - Log in if prompted.
    - Select your Vercel scope (username/team).
    - Link to existing project? "No" (create new).
    - Project Name: `freshlist` (or default).
    - Modify settings? "No".
3.  Once linked, a `.vercel` folder is created. Open `frontend/.vercel/project.json`.
4.  Copy `orgId` -> Add to GitHub Secrets as `VERCEL_ORG_ID`.
5.  Copy `projectId` -> Add to GitHub Secrets as `VERCEL_PROJECT_ID`.

---

## 3. Verify
Once all 4 secrets are added, go to the **Actions** tab in GitHub and re-run the failed workflows.
