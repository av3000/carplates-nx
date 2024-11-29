import { Environment } from '@shared/common/environment';

const isSentryEnabled = process.env.SENTRY_ENABLED === 'true';

export const environment: Environment = {
  production: true,
  apiUrl: process.env.API_URL || 'http://localhost',
  port: process.env.NODE_PORT || '8080',
  sentryDsn: process.env.SENTRY_EXPRESS_DSN || '',
  sentryEnabled: isSentryEnabled,
};
