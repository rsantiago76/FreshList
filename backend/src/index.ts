import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import "source-map-support/register";
import { ok, bad, Json } from "./utils/response";
import { generateWeek, swapMeal } from "./services/mealService";
import { generateGroceryList } from "./services/groceryService";

export const handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  const requestId = event.requestContext?.requestId;
  const path = event.rawPath || "/";
  const method = event.requestContext?.http?.method || "GET";

  console.log(JSON.stringify({ level: "info", requestId, method, path }));

  try {
    // Health check
    if (method === "GET" && path === "/health") {
      return ok({ status: "ok" }, requestId);
    }

    // Generate Meal Plan
    if (method === "POST" && path === "/mealplans/generate") {
      const body = event.body ? JSON.parse(event.body) : {};
      const weekStart = new Date().toISOString().slice(0, 10);
      const days = generateWeek(weekStart);
      return ok({ id: `plan_${Date.now()}`, weekStart, preferences: body, days }, requestId);
    }

    // Generate Grocery List
    if (method === "POST" && path === "/grocerylists/from-mealplan") {
      const body = event.body ? JSON.parse(event.body) : {};
      if (!body?.plan) return bad(400, "Missing plan", requestId);
      return ok(generateGroceryList(body.plan), requestId);
    }

    // Swap Meal
    // Route: /mealplans/{id}/swap
    const swapMatch = path.match(/^\/mealplans\/([^/]+)\/swap$/);
    if (method === "POST" && swapMatch) {
      const planId = swapMatch[1];
      const body = event.body ? JSON.parse(event.body) : {};
      const { dayIndex, mealKey, currentPlan } = body || {};

      // We need the current day's plan to swap correctly in a stateless way (or fetch from DB in real app)
      // For this demo, we can just return a single swapped meal or expect the client to send the day.
      // To keep it simple and consistent with the requirement "Return updated plan", let's assume the frontend sends the *full plan* or we regenerate.
      // REVISION: The requirements say "Return updated plan".
      // If we don't have DB persistence yet, we need the client to send the context.
      // Let's assume the client sends `currentDay` in the body for the demo.

      if (typeof dayIndex !== "number" || !mealKey || !body.currentDay) {
        return bad(400, "dayIndex, mealKey, and currentDay required", requestId);
      }

      const updatedDay = swapMeal(dayIndex, mealKey, body.currentDay);
      return ok({ dayIndex, updatedDay }, requestId);
    }

    // Meal Logs (Demo)
    if (path === "/logs/meals") {
      if (method === "POST") {
        const body = event.body ? JSON.parse(event.body) : {};
        const entry = { id: `log_${Date.now()}`, ...body, createdAt: new Date().toISOString() };
        return ok({ saved: true, entry }, requestId);
      }
      if (method === "GET") {
        const date = event.queryStringParameters?.date || new Date().toISOString().slice(0, 10);
        return ok({ date, entries: [] }, requestId);
      }
    }

    return bad(404, "Not found", requestId);

  } catch (err: any) {
    console.error("Error handling request:", err);
    return bad(500, "Internal Server Error", requestId);
  }
};