import { handler } from '../../src/handlers/updateTech';
import * as techs from '../../src/factories/techs';
import { mockTechModel } from '../mocks/techs';
import { APIGatewayProxyResult } from 'aws-lambda';
import { NotFoundError } from '../../src/errors/NotFoundError';

describe('UpdateTechHandler Tests', () => {
  const fakeService = {
    execute: () => Promise.resolve({}),
  }

  const id = 'anyid';

  const data = {
    name: 'anyname',
  }

  beforeEach(() => {
    jest.spyOn(techs, 'makeUpdateTechService').mockReturnValue(fakeService as any)
  })

  it('should call UpdateTechService with correct values', async () => {
    const updateSpy = jest.spyOn(fakeService, 'execute');

    const events = {
      pathParameters: {
        id,
      },
      body: JSON.stringify(data)
    }
 
    await handler(events as any, {} as any, {} as any);

    expect(updateSpy).toHaveBeenCalledWith({
      id,
      name: data.name
    });
  })

  it('should return 204 NO CONTENT on success', async () => {
    jest.spyOn(fakeService, 'execute').mockResolvedValueOnce({});

    const response: APIGatewayProxyResult = await handler({ body: JSON.stringify(data)} as any, {} as any, {} as any) as APIGatewayProxyResult;

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(204);
  })

  it('should return 400 BadRequest when name is not provided', async () => {
    const response: APIGatewayProxyResult = await handler({ body: '' } as any, {} as any, {} as any) as APIGatewayProxyResult;

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(400);
  })

  it('should return 404 Not Found when tech does not exists', async () => {
    jest.spyOn(fakeService, 'execute').mockRejectedValueOnce(new NotFoundError('Not found'))

    const response: APIGatewayProxyResult = await handler({ body: JSON.stringify(data)} as any, {} as any, {} as any) as APIGatewayProxyResult;

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(404);
  })

  it('should return 500 Server Error when something wrong happened', async () => {
    jest.spyOn(fakeService, 'execute').mockRejectedValueOnce(new Error());

    const response: APIGatewayProxyResult = await handler({ body: JSON.stringify(data)} as any, {} as any, {} as any) as APIGatewayProxyResult;

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(500);
  })
})