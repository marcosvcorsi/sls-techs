import { handler } from '../../src/handlers/deleteTech';
import * as techs from '../../src/factories/techs';
import { APIGatewayProxyResult } from 'aws-lambda';
import { NotFoundError } from '../../src/errors/NotFoundError';

describe('DeleteTechHandler Tests', () => {
  const fakeService = {
    execute: () => Promise.resolve(),
  }

  beforeEach(() => {
    jest.spyOn(techs, 'makeDeleteTechService').mockReturnValue(fakeService as any)
  })

  it('should call DeleteTechService with correct value', async () => {
    const deleteSpy = jest.spyOn(fakeService, 'execute');

    const id = 'anyid';

    const events = {
      pathParameters: {
        id
      }
    }

    await handler(events as any, {} as any, {} as any);

    expect(deleteSpy).toHaveBeenCalledWith(id);
  })

  it('should return 204 NO CONTENT on success', async () => {
    const response: APIGatewayProxyResult = await handler({} as any, {} as any, {} as any) as APIGatewayProxyResult;

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(204);
  })

  it('should return 404 Not Found when tech does not exists', async () => {
    jest.spyOn(fakeService, 'execute').mockRejectedValueOnce(new NotFoundError('Not found'))

    const response: APIGatewayProxyResult = await handler({} as any, {} as any, {} as any) as APIGatewayProxyResult;

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(404);
  })

  it('should return 500 Server Error when something wrong happened', async () => {
    jest.spyOn(fakeService, 'execute').mockRejectedValueOnce(new Error());

    const response: APIGatewayProxyResult = await handler({} as any, {} as any, {} as any) as APIGatewayProxyResult;

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(500);
  })
});