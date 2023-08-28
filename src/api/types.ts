import { ErrorResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/';

export type TIntrospectResponse =
  | {
      active: true;
    }
  | {
      active: false;
      scope: string;
      exp: Date;
      client_id: string;
    };

export type ServerError = { message: string; validationMessages: { [key: string]: string } };

type SingleValidationError = {
  code: string;
  field: string;
  message: string;
};

export type ValidationErrorResponse = ErrorResponse & { body: { errors: SingleValidationError[] } };
