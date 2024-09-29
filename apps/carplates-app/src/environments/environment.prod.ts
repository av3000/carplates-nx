import { AngularEnvironment } from '@shared/common/types';

export const environment: AngularEnvironment = {
  production: true,
  apiUrl: process.env['API_URL'] || 'https://localhost',
  port: process.env['ANGULAR_PORT'] || '4200',
  sentryDsn: process.env['SENTRY_ANGULAR_DSN'] || '',
};
