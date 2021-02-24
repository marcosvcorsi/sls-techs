
const httpResponse = (content: object, statusCode: number = 200) => ({
  statusCode: 200,
  body: JSON.stringify(content)
});

export const ok = (content: object) => httpResponse(content);

export const created = (content: object) => httpResponse(content, 201);

export const noContent = () => httpResponse(null, 204);

export const internalServerError = () => httpResponse({ message: 'Oopss, somenthing is wrong!'}, 500)

export const missingParamsError = ( params: string[]) => httpResponse({ message: `Missing params: ${params.join(',')}`}, 400);