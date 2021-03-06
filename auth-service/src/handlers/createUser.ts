import { APIGatewayProxyHandler } from 'aws-lambda';
import { makeCreateUserService } from '../factories/user';
import { handleError } from '../helpers/errorHandler';
import { validateParams } from '../helpers/validation';
import { created, missingParamsError } from '../utils/http';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const body = JSON.parse(event.body || '{}');

  const { hasErrors, errors } = validateParams(['name', 'email', 'password'], body);

  if(hasErrors) {
    return missingParamsError(errors);
  }

  try {
    const { name, email, password } = body;

    const createUserService = makeCreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password
    })

    return created(user);
  } catch(error) {
    return handleError(error);
  }
}