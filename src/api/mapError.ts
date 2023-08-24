import { ServerError } from './types';
import { isValidationErrorResponse, isErrorResponse } from './utils';

export const mapErrorMessage = (error: unknown): ServerError => {
  if (isValidationErrorResponse(error)) {
    const validationError: ServerError = { message: error.message, validationMessages: {} };
    error.body.errors.forEach((err) => {
      if (err.code === 'DuplicateField') {
        if (err.field === 'email') {
          validationError.message = `${err.message} Either log in or use another email address.`;
          validationError.validationMessages[err.field] = 'Email already in use';
        }
      }
      if (err.code === 'InvalidCredentials') {
        validationError.message = `${err.message} Double check email and password.`;
      }
    });
    return validationError;
  }
  if (isErrorResponse(error)) {
    if ((error.statusCode === 0 && error.message === 'Failed to fetch') || error.statusCode >= 500) {
      return {
        message:
          'Unable to establish a connection to the server. Please verify your internet connection and try again later.',
        validationMessages: {},
      };
    }
  }
  if (error instanceof Error) {
    return { message: error.message, validationMessages: {} };
  }
  return { message: 'Unknown error occurred', validationMessages: {} };
};
