import {
  ClientResponse,
  ErrorResponse,
  AuthErrorResponse,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/';
import { TokenStoreTypes } from '../lib/commercetools-sdk';
import { clearTokenStore } from '../utils/localStorage';
import { ValidationErrorResponse } from './types';
import { API_ERROR_CODES } from './consts';

const MAX_RETRYING_ATTEMPTS_NUMBER = 5;

export function isClientResponse(object: unknown): object is ClientResponse {
  if (typeof object === 'object' && object !== null && object.hasOwnProperty('body')) {
    return true;
  }

  return false;
}

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

export function isClientAuthErrorResponse(object: unknown): object is ClientResponse<AuthErrorResponse> {
  if (isClientResponse(object)) {
    const { body } = object;

    if (
      typeof body === 'object' &&
      body !== null &&
      body.hasOwnProperty('statusCode') &&
      body.hasOwnProperty('message') &&
      body.hasOwnProperty('error') &&
      body.hasOwnProperty('errors')
    ) {
      return true;
    }
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
  const isAuthErrorCode = (error: AuthErrorResponse): boolean => {
    if (error.statusCode === 401 || (error.statusCode === 400 && error.error === API_ERROR_CODES.invalidGrant)) {
      return true;
    }

    return false;
  };

  async function executeCallback(): Promise<T> {
    try {
      const res = await callback();

      return res;
    } catch (error) {
      if (isClientAuthErrorResponse(error) && isAuthErrorCode(error.body) && attempts < MAX_RETRYING_ATTEMPTS_NUMBER) {
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
