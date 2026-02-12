# FreshList Architecture

## Overview
FreshList is a serverless full-stack application designed for scalability and low maintenance.

## Tech Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS (Vercel)
- **Backend**: AWS Lambda (Node.js 20), TypeScript (AWS)
- **Database**: DynamoDB (Single Table Design)
- **Infrastructure**: Terraform

## Data Flow
1.  **User Request**: Client sends HTTP request to API Gateway.
2.  **Routing**: API Gateway routes to the monolithic Lambda function (or specific routes).
3.  **Processing**: Lambda executes business logic (meal generation, grocery aggregation).
    - *Future*: Lambda interacts with DynamoDB for persistence.
4.  **Response**: JSON response returned to client.

## Components
### Frontend
- **Pages**: Landing, Login, Dashboard, Meal Plans, Grocery List, Recruiter.
- **State**: `localStorage` used for mock auth and session persistence.

### Backend
- **Handler**: `index.ts` (API Router).
- **Services**: `mealService.ts`, `groceryService.ts`.
- **Utils**: Standardized response format.

### Infrastructure
- **DynamoDB**: `freshlist-table` with PK/SK access patterns.
- **Lambda**: `freshlist-api` with CloudWatch logging.
- **API Gateway**: HTTP API v2 with CORS enabled.
