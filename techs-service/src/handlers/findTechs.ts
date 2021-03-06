import { APIGatewayProxyHandler } from 'aws-lambda';
import { makeFindTechsService } from '../factories/techs';
import { handleError } from '../helpers/errorHandler';
import { ok } from '../utils/http';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  try {
    const findTechsService = makeFindTechsService();

    const techs = await findTechsService.execute();

    return ok(techs);
  } catch(error) {
    return handleError(error);
  }
}
