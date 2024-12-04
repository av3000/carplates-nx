import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { logger } from './logger';
import { environment } from './environments/environment';

// Ensure to call this before importing any other modules!
if (environment.sentryEnabled) {
  Sentry.init({
    dsn: environment.sentryDsn,

    integrations: [
      // Add our Profiling integration
      nodeProfilingIntegration(),
    ],
    // Add Tracing by setting tracesSampleRate
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,

    // Set sampling rate for profiling
    // This is relative to tracesSampleRate
    profilesSampleRate: 1.0,
  });

  logger.info('Sentry is enabled. DSN: ' + environment.sentryDsn);
} else {
  logger.warn('Sentry is disabled for this environment.');
}
