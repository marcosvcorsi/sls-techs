import { APIGatewayProxyHandler } from 'aws-lambda';
import { makeLoginService } from '../factories/user';
import { handleError } from '../helpers/errorHandler';
import { validateParams } from '../helpers/validation';
import { missingParamsError, ok } from '../utils/http';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const body = JSON.parse(event.body || '{}');

  const { hasErrors, errors } = validateParams(['email', 'password'], body);

  if(hasErrors) {
    return missingParamsError(errors);
  }

  try {
    const { email, password } = body;

    const loginService = makeLoginService();

    const token = await loginService.execute({
      email,
      password
    })

    return ok({ token });
  } catch(error) {
    return handleError(error);
  }
}