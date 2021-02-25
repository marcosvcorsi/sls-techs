import { APIGatewayProxyHandler } from 'aws-lambda';
import { NotFoundError } from '../errors/NotFoundError';
import { makeDeleteTechService } from '../factories/techs';
import { internalServerError, noContent, notFound } from '../utils/http';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const { id } = event.pathParameters || {};
  
  try {
    const deleteTechService = makeDeleteTechService();

    await deleteTechService.execute(String(id));

    return noContent();
  } catch(error) {
    if(error instanceof NotFoundError) {
      return notFound(error.message);
    } else {
      console.error(error);
      return internalServerError();
    }
  }
}