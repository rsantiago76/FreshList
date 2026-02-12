# Set variables
$GitHubOrg = "rsantiago76"
$GitHubRepo = "FreshList"
$RoleName = "FreshList-GitHubAction-Role"
$Region = "us-east-1"

# 1. Create OIDC Provider if it doesn't exist
$OidcUrl = "https://token.actions.githubusercontent.com"
$ClientId = "sts.amazonaws.com"
$Thumbprint = "6938fd4d98bab03faadb97b34396831e3780aea1" # GitHub's thumbprint

echo "Checking OIDC Provider..."
$ProviderArn = "arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):oidc-provider/token.actions.githubusercontent.com"

# Check if provider exists (simple check by trying to get it, ignore error if not found - proper check is hard in simple script)
# We will just try to create and catch error if it exists

try {
    aws iam create-open-id-connect-provider --url $OidcUrl --client-id-list $ClientId --thumbprint-list $Thumbprint
    echo "OIDC Provider created."
} catch {
    echo "OIDC Provider likely already exists or error occurred. Continuing..."
}

# 2. Create Trust Policy
$TrustPolicy = @"
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Federated": "$ProviderArn"
            },
            "Action": "sts:AssumeRoleWithWebIdentity",
            "Condition": {
                "StringLike": {
                    "token.actions.githubusercontent.com:sub": "repo:$GitHubOrg/$($GitHubRepo):*"
                },
                "StringEquals": {
                    "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
                }
            }
        }
    ]
}
"@

$TrustPolicy | Out-File -FilePath "trust-policy.json" -Encoding ASCII

# 3. Create Role
echo "Creating IAM Role: $RoleName..."
try {
    aws iam create-role --role-name $RoleName --assume-role-policy-document file://trust-policy.json
} catch {
    echo "Role might already exist. Updating trust policy..."
    aws iam update-assume-role-policy --role-name $RoleName --policy-document file://trust-policy.json
}

# 4. Attach Permissions (AdministratorAccess for Terraform to create resources)
# In production, scope this down. For demo/setup, Admin is easiest to ensure Terraform works.
aws iam attach-role-policy --role-name $RoleName --policy-arn arn:aws:iam::aws:policy/AdministratorAccess

# 5. Output ARN
$RoleArn = aws iam get-role --role-name $RoleName --query Role.Arn --output text
echo ""
echo "----------------------------------------------------------------"
echo "✅ SUCCESS! AWS Role Created: $RoleArn"
echo "----------------------------------------------------------------"
echo "Run this command to clean up the temporary policy file:"
echo "rm trust-policy.json"
echo ""
echo "Add this ARN as 'AWS_ROLE_ARN' in your GitHub Secrets."
