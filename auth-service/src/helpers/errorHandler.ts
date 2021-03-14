import { EmailInUseError } from "../errors/EmailInUserError";
import { badRequest, internalServerError } from "../utils/http";

export function handleError(error: Error) {
  if(error instanceof EmailInUseError) {
    return badRequest(error.message);
  }

  console.error(error);

  return internalServerError();
}
