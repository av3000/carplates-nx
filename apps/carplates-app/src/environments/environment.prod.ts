import { Environment } from '@shared/common/environment';

const isSentryEnabled = process.env['SENTRY_ENABLED'] === 'true';

export const environment: Environment = {
  production: true,
  apiUrl: process.env['API_URL'] || 'https://localhost',
  port: process.env['ANGULAR_PORT'] || '4200',
  sentryDsn: process.env['SENTRY_ANGULAR_DSN'] || '',
  sentryEnabled: isSentryEnabled,
};
