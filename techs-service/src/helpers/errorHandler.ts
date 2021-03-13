import { NotFoundError } from "../errors/NotFoundError";
import { internalServerError, notFound } from "../utils/http";

export function handleError(error: Error) {
  if(error instanceof NotFoundError) {
    return notFound(error.message);
  }

  console.error(error);

  return internalServerError();
}
