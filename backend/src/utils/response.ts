import { APIGatewayProxyResultV2 } from "aws-lambda";

export type Json = Record<string, any>;

export function ok(body: Json, requestId?: string): APIGatewayProxyResultV2 {
  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify({ requestId, ...body }),
  };
}

export function bad(statusCode: number, message: string, requestId?: string): APIGatewayProxyResultV2 {
  return {
    statusCode,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
    body: JSON.stringify({ requestId, message }),
  };
}
