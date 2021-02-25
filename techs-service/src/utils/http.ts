
const httpResponse = (content: object, statusCode: number = 200) => ({
  statusCode,
  body: JSON.stringify(content)
});

export const ok = (content: object) => httpResponse(content);

export const created = (content: object) => httpResponse(content, 201);

export const noContent = () => httpResponse({}, 204);

export const notFound = (message = "Not Found") => httpResponse({ message }, 404);

export const internalServerError = () => httpResponse({ message: 'Oopss, somenthing is wrong!'}, 500)

export const missingParamsError = ( params: string[]) => httpResponse({ message: `Missing params: ${params.join(',')}`}, 400);