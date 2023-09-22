import {
  ClientBuilder,

  // Import middlewares
  HttpMiddlewareOptions,
  AnonymousAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

import { getTokenStore, saveTokenStore } from '../../utils/localStorage';
import { TokenStoreTypes } from '.';

const projectKey = process.env.VITE_CTP_PROJECT_KEY || '';

const anonymousAuthMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: process.env.VITE_CTP_AUTH_HOST || '',
  projectKey,
  credentials: {
    clientId: process.env.VITE_CTP_ANONYMOUS_CLIENT_ID || '',
    clientSecret: process.env.VITE_CTP_ANONYMOUS_CLIENT_SECRET || '',
  },
  tokenCache: {
    get: () => getTokenStore(TokenStoreTypes.AnonymousApiTokenStore),
    set: (tokenStore) => saveTokenStore(TokenStoreTypes.AnonymousApiTokenStore, tokenStore),
  },
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: process.env.VITE_CTP_API_HOST || '',
  fetch,
};

// Initialize the ClientBuilder
const client = new ClientBuilder()
  .withAnonymousSessionFlow(anonymousAuthMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withLoggerMiddleware() // Include middleware for logging
  .build();

export const anonymousApiRoot = createApiBuilderFromCtpClient(client).withProjectKey({ projectKey });
