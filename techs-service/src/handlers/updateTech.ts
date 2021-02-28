import { APIGatewayProxyHandler } from 'aws-lambda';
import { NotFoundError } from '../errors/NotFoundError';
import { makeUpdateTechService } from '../factories/techs';
import { internalServerError, missingParamsError, noContent, notFound, ok } from '../utils/http';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const { id } = event.pathParameters || {};
  const { name } = JSON.parse(event.body || '');

  if(!name) {
    return missingParamsError(['name']);
  }

  try {
    const updateTechService = makeUpdateTechService();

    await updateTechService.execute({id: String(id), name: String(name)});

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
