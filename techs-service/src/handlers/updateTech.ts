import { APIGatewayProxyHandler } from 'aws-lambda';
import { makeUpdateTechService } from '../factories/techs';
import { handleError } from '../helpers/errorHandler';
import { missingParamsError, noContent} from '../utils/http';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const { id } = event.pathParameters || {};
  const { name } = JSON.parse(event.body || '{}');

  if(!name) {
    return missingParamsError(['name']);
  }

  try {
    const updateTechService = makeUpdateTechService();

    await updateTechService.execute({id: String(id), name: String(name)});

    return noContent();
  } catch(error) {
    return handleError(error);
  }
}
