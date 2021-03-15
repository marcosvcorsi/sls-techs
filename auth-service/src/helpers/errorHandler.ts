import { CustomError } from "../errors/CustomError";
import { badRequest, internalServerError, unauthorized, UNAUTHORIZED } from "../utils/http";

const BAD_REQUEST = 400

export function handleError(error: Error) {
  if(error instanceof CustomError) {
    const customError = error as CustomError;

    switch(customError.statusCode) {
      case UNAUTHORIZED:
        return unauthorized(error.message);
      default:
        return badRequest(error.message);
    }   
  }

  console.error(error);

  return internalServerError();
}
