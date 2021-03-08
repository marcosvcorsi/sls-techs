import { handler } from '../../src/handlers/findTechs';
import * as techs from '../../src/factories/techs';
import { mockTechModel } from '../mocks/techs';
import { APIGatewayProxyResult } from 'aws-lambda';

describe('FindTechsHandler Tests', () => {
  const fakeService = {
    execute: () => Promise.resolve([]),
  }

  beforeEach(() => {
    jest.spyOn(techs, 'makeFindTechsService').mockReturnValue(fakeService as any)
  })

  it('should call FindTechsService', async () => {
    const findSpy = jest.spyOn(fakeService, 'execute');

    await handler({} as any, {} as any, {} as any);

    expect(findSpy).toHaveBeenCalled();
  })

  it('should return 200 OK with techs on success', async () => {
    const techs = [mockTechModel()];

    jest.spyOn(fakeService, 'execute').mockResolvedValueOnce(techs);

    const response: APIGatewayProxyResult = await handler({} as any, {} as any, {} as any) as APIGatewayProxyResult;

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(JSON.stringify(techs));
  })

  it('should return 500 Server Error when something wrong happened', async () => {
    jest.spyOn(fakeService, 'execute').mockRejectedValueOnce(new Error());

    const response: APIGatewayProxyResult = await handler({} as any, {} as any, {} as any) as APIGatewayProxyResult;

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(500);
  })
})