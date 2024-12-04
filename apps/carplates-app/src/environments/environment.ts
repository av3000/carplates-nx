// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { Environment } from '@shared/common/environment';

const isSentryEnabled = process.env['SENTRY_ENABLED'] === 'true';

export const environment: Environment = {
  production: false,
  apiUrl: process.env['API_URL'] || 'http://localhost',
  port: process.env['ANGULAR_PORT'] || '4200',
  sentryDsn: process.env['SENTRY_ANGULAR_DSN'] || '',
  sentryEnabled: isSentryEnabled,
};
