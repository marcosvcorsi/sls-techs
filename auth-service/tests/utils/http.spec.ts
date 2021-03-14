import * as http from '../../src/utils/http';

describe('Http Utils Tests', () => {
  it('should return 200 OK', () => {
    const expectedResponse = { message: 'ok' };

    const response = http.ok(expectedResponse);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(JSON.stringify(expectedResponse));
  })

  it('should return 201 CREATED', () => {
    const expectedResponse = { message: 'created' };

    const response = http.created(expectedResponse);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(JSON.stringify(expectedResponse));
  })

  it('should return 204 NO CONTENT', () => {
    const expectedResponse = {};

    const response = http.noContent();

    expect(response.statusCode).toBe(204);
    expect(response.body).toEqual(JSON.stringify(expectedResponse));
  })

  it('should return 404 NOT FOUND', () => {
    const expectedResponse = { message: 'Not Found'};

    const response = http.notFound();

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual(JSON.stringify(expectedResponse));
  })

  it('should return 404 NOT FOUND with custom message', () => {
    const expectedResponse = { message: 'Oh noo'};

    const response = http.notFound('Oh noo');

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual(JSON.stringify(expectedResponse));
  })

  it('should return 500 INTERNAL SERVER ERROR', () => {
    const expectedResponse = { message: 'Oopss, somenthing is wrong!'};

    const response = http.internalServerError();

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual(JSON.stringify(expectedResponse));
  })

  it('should return 400 MISSING PARAM', () => {
    const expectedResponse = { message: 'Missing params: any'};

    const response = http.missingParamsError(['any']);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual(JSON.stringify(expectedResponse));
  })
})