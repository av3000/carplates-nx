import { ExpressEnvironment } from '@shared/common/types';

export const environment: ExpressEnvironment = {
  production: true,
  apiUrl: process.env.API_URL,
  port: process.env.NODE_PORT,
  sentryDsn: process.env.SENTRY_EXPRESS_DSN,
};
