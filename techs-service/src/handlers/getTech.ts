import { APIGatewayProxyHandler } from 'aws-lambda';
import { NotFoundError } from '../errors/NotFoundError';
import { makeFindTechByIdService } from '../factories/techs';
import { ok, internalServerError, notFound } from '../utils/http';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const { id } = event.pathParameters || {};
  
  try {
    const findTechsByIdService = makeFindTechByIdService();

    const tech = await findTechsByIdService.execute(String(id));

    return ok(tech);
  } catch(error) {
    if(error instanceof NotFoundError) {
      return notFound(error.message);
    } else {
      console.error(error);
      return internalServerError();
    }
  }
}