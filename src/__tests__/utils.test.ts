import { ErrorResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/';

import { ValidationErrorResponse } from '../api/types';
import { Localizations } from '../types';
import { isErrorResponse, isValidationErrorResponse } from '../api/utils';
import { createBreadcrumbs } from '../components/Breadcrumbs/utils';

import { mockProduct } from '../__mocks__/products';
import { categories } from '../__mocks__/categories';

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

describe('createBreadcrumbs', () => {
  it('should return proper breadcrumbs array', () => {
    const pathnames = ['catalog', 'keyboards-grand-pianos'];
    const breadcrumbs = createBreadcrumbs(pathnames, Localizations.En, categories, mockProduct);

    expect(breadcrumbs.length).toBe(3);
    expect(breadcrumbs[0].label).toBe('Catalog');
    expect(breadcrumbs[1].label).toBe('Keyboards');
    expect(breadcrumbs[2].label).toBe('Grand pianos');
  });
});
