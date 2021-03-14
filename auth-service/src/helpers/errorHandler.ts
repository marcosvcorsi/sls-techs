import { internalServerError } from "../utils/http";

export function handleError(error: Error) {
  console.error(error);

  return internalServerError();
}
