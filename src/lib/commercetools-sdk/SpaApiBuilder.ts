import {
  ClientBuilder,

  // Import middlewares
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  AuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { getTokenStore, saveTokenStore } from '../../utils/localStorage';
import { TokenStoreTypes } from '.';

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
  tokenCache: {
    // an anonymous token (if it exists) is used for login
    // to assign Carts belonging to the anonymousId to the logged in Customer
    // https://docs.commercetools.com/api/projects/me-profile#authenticate-sign-in-customer
    get: () => getTokenStore(TokenStoreTypes.AnonymousApiTokenStore),
    set: (tokenStore) => saveTokenStore(TokenStoreTypes.SpaApiTokenStore, tokenStore),
  },
  fetch,
});

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: process.env.VITE_CTP_AUTH_HOST || '',
  projectKey,
  credentials: {
    clientId: process.env.VITE_CTP_SPA_CLIENT_ID || '',
    clientSecret: process.env.VITE_CTP_SPA_CLIENT_SECRET || '',
  },
  tokenCache: {
    get: () => getTokenStore(TokenStoreTypes.SpaApiTokenStore),
    set: (tokenStore) => saveTokenStore(TokenStoreTypes.SpaApiTokenStore, tokenStore),
  },
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.VITE_CTP_API_HOST || '',
  fetch,
};

export const getSpaApiRootWithPasswordFlow = (username: string, password: string): ByProjectKeyRequestBuilder => {
  const passwordAuthMiddlewareOptions = getPasswordAuthMiddlewareOptions(username, password);

  // Initialize the ClientBuilder
  const client = new ClientBuilder()
    .withPasswordFlow(passwordAuthMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware() // Include middleware for logging
    .build();

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
};

// Initialize the ClientBuilder
const client = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

export const spaApiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
