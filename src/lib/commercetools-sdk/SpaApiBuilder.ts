import {
  ClientBuilder,

  // Import middlewares
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

const projectKey = process.env.VITE_CTP_PROJECT_KEY || '';

const getPasswordAuthMiddlewareOptions = (username: string, password: string): PasswordAuthMiddlewareOptions => ({
  host: process.env.VITE_CTP_AUTH_HOST || '',
  projectKey,
  credentials: {
    clientId: process.env.VITE_CTP_SPA_CLIENT_ID || '',
    clientSecret: process.env.VITE_CTP_SPA_CLIENT_SECRET || '',
    user: {
      username,
      password,
    },
  },
  // tokenCache: {
  //   // TODO add local storage methods
  //   get: () => ({ token: 'existing_token_from_ls', expirationTime: 1692141166005 }),
  //   set: (tokenStore) => saveToLs(tokenStore),
  // },
  fetch,
});

export const getSpaApiRoot = (username: string, password: string): ByProjectKeyRequestBuilder => {
  const passwordAuthMiddlewareOptions = getPasswordAuthMiddlewareOptions(username, password);

  // Configure httpMiddlewareOptions
  const httpMiddlewareOptions: HttpMiddlewareOptions = {
    host: process.env.VITE_CTP_API_HOST || '',
    fetch,
  };

  // Initialize the ClientBuilder
  const client = new ClientBuilder()
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};
