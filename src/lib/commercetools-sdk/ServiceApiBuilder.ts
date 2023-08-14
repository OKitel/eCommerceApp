import {
  ClientBuilder,

  // Import middlewares
  AuthMiddlewareOptions, // Required for auth
  HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const projectKey = import.meta.env.VITE_CTP_PROJECT_KEY || '';

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_AUTH_HOST || '',
  projectKey,
  credentials: {
    clientId: import.meta.env.VITE_CTP_SERVICE_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_CTP_SERVICE_CLIENT_SECRET || '',
  },
  // tokenCache: {
  //   // TODO add local storage methods
  //   get: () => ({ token: 'existing_token_from_ls', expirationTime: 1692141166005 }),
  //   set: (tokenStore) => saveToLs(tokenStore),
  // },
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_CTP_API_HOST || '',
  fetch,
};

// Initialize the ClientBuilder
const client = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

export const serviceApiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
