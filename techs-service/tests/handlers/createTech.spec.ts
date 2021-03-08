import { handler } from '../../src/handlers/createTech';
import * as techs from '../../src/factories/techs';
import { mockTechModel } from '../mocks/techs';
import { APIGatewayProxyResult } from 'aws-lambda';

describe('CreateTechHandler Tests', () => {
  const fakeService = {
    execute: () => Promise.resolve({}),
  }

  const data = {
    name: 'anyname',
  }


  beforeEach(() => {
    jest.spyOn(techs, 'makeCreateTechService').mockReturnValue(fakeService as any)
  })

  it('should call CreateTechService with correct values', async () => {
    const createSpy = jest.spyOn(fakeService, 'execute');

    const events = {
      body: JSON.stringify(data)
    }
 
    await handler(events as any, {} as any, {} as any);

    expect(createSpy).toHaveBeenCalledWith(data);
  })

  it('should return 201 CREATED with tech on success', async () => {
    const tech = mockTechModel();

    jest.spyOn(fakeService, 'execute').mockResolvedValueOnce(tech);

    const response: APIGatewayProxyResult = await handler({ body: JSON.stringify(data)} as any, {} as any, {} as any) as APIGatewayProxyResult;

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(201);
    expect(response.body).toBe(JSON.stringify(tech));
  })

  it('should return 400 BadRequest when name is not provided', async () => {
    const response: APIGatewayProxyResult = await handler({ body: '' } as any, {} as any, {} as any) as APIGatewayProxyResult;

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(400);
  })

  it('should return 500 Server Error when something wrong happened', async () => {
    jest.spyOn(fakeService, 'execute').mockRejectedValueOnce(new Error());

    const response: APIGatewayProxyResult = await handler({ body: JSON.stringify(data)} as any, {} as any, {} as any) as APIGatewayProxyResult;

    expect(response).toBeTruthy();
    expect(response.statusCode).toBe(500);
  })
})