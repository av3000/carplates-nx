// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { ExpressEnvironment } from '@shared/common/types';

export const environment: ExpressEnvironment = {
  production: false,
  apiUrl: process.env.API_URL,
  port: process.env.NODE_PORT,
  sentryDsn: process.env.SENTRY_EXPRESS_DSN,
};
