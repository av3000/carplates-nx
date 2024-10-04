import { ExpressEnvironment } from '@shared/common/types';

export const environment: ExpressEnvironment = {
  production: true,
  apiUrl: process.env.API_URL || 'http://localhost',
  port: process.env.NODE_PORT || '8080',
  sentryDsn: process.env.SENTRY_EXPRESS_DSN || '',
};
