import { handler } from '../../src/handlers/getTech';
import * as techs from '../../src/factories/techs';
import { mockTechModel } from '../mocks/techs';
import { APIGatewayProxyResult } from 'aws-lambda';
import { NotFoundError } from '../../src/errors/NotFoundError';


describe('GetTechHandler Tests', () => {
  const fakeService = {
    execute: () => Promise.resolve({}),
  }

  beforeEach(() => {
    jest.spyOn(techs, 'makeFindTechByIdService').mockReturnValue(fakeService as any)
  })

  it('should call FindTechByIdService with correct value', async () => {
    const getSpy = jest.spyOn(fakeService, 'execute');

    const id = 'anyid';

    const events = {
      pathParameters: {
        id
      }
    }

    await handler(events as any, {} as any, {} as any);

    expect(getSpy).toHaveBeenCalledWith(id);
  })

  it('should return 200 OK with tech on success', async () => {
    const tech = mockTechModel();

    jest.spyOn(fakeService, 'execute').mockResolvedValueOnce(tech);

    const response: APIGatewayProxyResult = await handler({} as any, {} as any, {} as any) as APIGatewayProxyResult;

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(JSON.stringify(tech));
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
})