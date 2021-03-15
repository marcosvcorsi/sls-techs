import { APIGatewayAuthorizerHandler, APIGatewayProxyHandler, APIGatewayTokenAuthorizerHandler } from 'aws-lambda';
import { makeAuthService } from '../factories/user';
import { handleError } from '../helpers/errorHandler';
import { ok, unauthorized } from '../utils/http';

const generatePolicy = (principalId, methodArn) => {
  const apiGatewayWildcard = methodArn.split('/', 2).join('/') + '/*';

  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: apiGatewayWildcard,
        },
      ],
    },
  };
};

export const handler: APIGatewayTokenAuthorizerHandler = async (event, context) => {
  if(!event.authorizationToken) {
    throw 'Unauthorized';
  }

  try {
    const [, token] = event.authorizationToken.split(' ');

    const authService = makeAuthService();

    const decoded = await authService.execute(token);

    const policy = generatePolicy(decoded.sub, event.methodArn);

    return {
      ...policy,
      context: decoded
    };
  } catch(error) {
    throw 'Unauthorized';
  }
}