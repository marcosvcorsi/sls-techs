import { APIGatewayProxyHandler } from 'aws-lambda';
import { makeFindTechByIdService } from '../factories/techs';
import { handleError } from '../helpers/errorHandler';
import { ok } from '../utils/http';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const { id } = event.pathParameters || {};

  try {
    const findTechsByIdService = makeFindTechByIdService();

    const tech = await findTechsByIdService.execute(String(id));

    return ok(tech);
  } catch(error) {
    return handleError(error);
  }
}
