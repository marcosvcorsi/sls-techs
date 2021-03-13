import { APIGatewayProxyHandler } from 'aws-lambda';
import { makeDeleteTechService } from '../factories/techs';
import { handleError } from '../helpers/errorHandler';
import { noContent } from '../utils/http';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const { id } = event.pathParameters || {};

  try {
    const deleteTechService = makeDeleteTechService();

    await deleteTechService.execute(String(id));

    return noContent();
  } catch(error) {
    return handleError(error);
  }
}
