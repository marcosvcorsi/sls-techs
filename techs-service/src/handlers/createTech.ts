import { APIGatewayProxyHandler } from 'aws-lambda';
import { makeCreateTechService } from '../factories/techs';
import { handleError } from '../helpers/errorHandler';
import { created, missingParamsError } from '../utils/http';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const { name } = JSON.parse(event.body || '{}');

  if(!name) {
    return missingParamsError(['name']);
  }

  try {
    const createTechService = makeCreateTechService();

    const tech = await createTechService.execute({ name: String(name) });

    return created(tech);
  } catch(error) {
    return handleError(error);
  }
}
