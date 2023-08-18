import { ErrorResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/';

export function isErrorResponse(object: unknown): object is ErrorResponse {
  if (
    typeof object === 'object' &&
    object !== null &&
    object.hasOwnProperty('statusCode') &&
    object.hasOwnProperty('message')
  ) {
    return true;
  }

  return false;
}
