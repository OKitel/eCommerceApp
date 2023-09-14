import { ErrorResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/';

import { mapErrorMessage } from '../api/mapError';
import { ValidationErrorResponse, ServerError } from '../api/types';

describe('mapErrorMessage', () => {
  it('should map validation error with duplicate email', () => {
    const validationErrorResponse: ValidationErrorResponse = {
      statusCode: 400,
      message: 'Validation Error',
      body: {
        errors: [{ code: 'DuplicateField', message: 'Email already in use', field: 'email' }],
      },
    };
    const result: ServerError = mapErrorMessage(validationErrorResponse);
    expect(result.message).toContain('Either log in or use another email address.');
    expect(result.validationMessages.email).toBe('Email already in use');
  });

  it('should map validation error with invalid credentials', () => {
    const validationErrorResponse: ValidationErrorResponse = {
      statusCode: 400,
      message: 'Validation Error',
      body: {
        errors: [{ code: 'InvalidCredentials', message: 'Invalid credentials', field: '' }],
      },
    };
    const result: ServerError = mapErrorMessage(validationErrorResponse);
    expect(result.message).toContain('Double check email and password.');
  });

  it('should map network/server error', () => {
    const networkErrorResponse: ErrorResponse = {
      statusCode: 0,
      message: 'Failed to fetch',
    };
    const result: ServerError = mapErrorMessage(networkErrorResponse);
    expect(result.message).toContain('Unable to establish a connection');
  });

  it('should map generic error', () => {
    const genericError = new Error('Generic error');
    const result: ServerError = mapErrorMessage(genericError);
    expect(result.message).toBe('Generic error');
  });
});
