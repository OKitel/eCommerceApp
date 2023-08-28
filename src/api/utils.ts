import { ErrorResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/';
import { TokenStoreTypes } from '../lib/commercetools-sdk';
import { clearTokenStore } from '../utils/localStorage';
import { ValidationErrorResponse } from './types';

const MAX_RETRYING_ATTEMPTS_NUMBER = 5;

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

export function isValidationErrorResponse(object: unknown): object is ValidationErrorResponse {
  if (
    typeof object === 'object' &&
    object !== null &&
    object.hasOwnProperty('statusCode') &&
    (object as ErrorResponse).statusCode === 400 &&
    object.hasOwnProperty('body')
  ) {
    return true;
  }

  return false;
}

export async function retry<T>(callback: () => Promise<T>, tokenStoreType: TokenStoreTypes): Promise<T> {
  let attempts = 0;

  async function executeCallback(): Promise<T> {
    try {
      const res = await callback();

      return res;
    } catch (error) {
      if (isErrorResponse(error) && error.statusCode === 401 && attempts < MAX_RETRYING_ATTEMPTS_NUMBER) {
        clearTokenStore(tokenStoreType);

        attempts += 1;
        const res = await executeCallback();

        return res;
      } else {
        throw error;
      }
    }
  }

  const res = await executeCallback();

  return res;
}
