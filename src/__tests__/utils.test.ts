import { ErrorResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/';
import { isErrorResponse, isValidationErrorResponse } from '../api/utils';
import { ValidationErrorResponse } from '../api/types';

describe('isErrorResponse', () => {
  it('should return true for valid ErrorResponse', () => {
    const errorResponse: ErrorResponse = {
      statusCode: 500,
      message: 'Internal Server Error',
    };

    expect(isErrorResponse(errorResponse)).toBe(true);
  });

  it('should return false for invalid ErrorResponse', () => {
    const okResponse = { statusCode: 200 };

    expect(isErrorResponse(okResponse)).toBe(false);
  });
});

describe('isValidationErrorResponse', () => {
  it('should return true for valid ValidationErrorResponse', () => {
    const validationErrorResponse: ValidationErrorResponse = {
      statusCode: 400,
      message: 'Validation Error',
      body: {
        errors: [{ code: 'DuplicateField', message: 'Email already in use', field: 'email' }],
      },
    };

    expect(isValidationErrorResponse(validationErrorResponse)).toBe(true);
  });

  it('should return false for invalid ValidationErrorResponse', () => {
    const okResponse = { statusCode: 200 };

    expect(isValidationErrorResponse(okResponse)).toBe(false);
  });
});
