// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { ExpressEnvironment } from '@shared/common/types';

export const environment: ExpressEnvironment = {
  production: false,
  apiUrl: process.env.API_URL || 'http://localhost',
  port: process.env.NODE_PORT || '8080',
  sentryDsn: process.env.SENTRY_EXPRESS_DSN || '',
};
