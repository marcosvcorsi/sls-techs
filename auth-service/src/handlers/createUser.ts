import { APIGatewayProxyHandler } from 'aws-lambda';
import { makeCreateUserService } from '../factories/user';
import { handleError } from '../helpers/errorHandler';
import { created, missingParamsError } from '../utils/http';

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const body = JSON.parse(event.body || '{}');

  const requiredFields = ['name', 'email', 'password'];
  const missingParams = [];

  for(const field of requiredFields) {
    if(!body[field]) {
      missingParams.push(field);
    }
  }

  if(missingParams.length > 0) {
    return missingParamsError(missingParams);
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