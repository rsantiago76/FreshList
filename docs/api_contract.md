# FreshList API Contract

Base URL: `https://<api-id>.execute-api.us-east-1.amazonaws.com`

## Endpoints

### Health Check
- **GET** `/health`
- **Response**: `{ "requestId": "...", "status": "ok" }`

### Meal Plans

#### Generate Plan
- **POST** `/mealplans/generate`
- **Body**: `{ "dietStyle": "Balanced", "calories": 2000 }`
- **Response**:
  ```json
  {
    "id": "plan_123",
    "weekStart": "2023-10-27",
    "days": [
      {
        "date": "2023-10-27",
        "meals": { "breakfast": {...}, "lunch": {...}, ... },
        "totalCalories": 2100,
        "totalProtein": 150
      }
    ]
  }
  ```

#### Swap Meal
- **POST** `/mealplans/{id}/swap`
- **Body**: `{ "dayIndex": 0, "mealKey": "lunch", "currentDay": {...} }`
- **Response**:
  ```json
  {
    "dayIndex": 0,
    "updatedDay": { ... }
  }
  ```

### Grocery Lists

#### Generate from Plan
- **POST** `/grocerylists/from-mealplan`
- **Body**: `{ "plan": { ... } }`
- **Response**:
  ```json
  {
    "id": "groc_123",
    "itemsByCategory": {
      "Produce": [ { "item": "Apples", "qty": "3" } ],
      "Protein": [ ... ]
    }
  }
  ```

### Logs
- **POST** `/logs/meals`
- **GET** `/logs/meals?date=YYYY-MM-DD`
