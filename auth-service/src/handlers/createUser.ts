import { APIGatewayProxyHandler } from 'aws-lambda';
import { ok } from '../utils/http';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  return ok({});
}