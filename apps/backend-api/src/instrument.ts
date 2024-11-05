import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
require('dotenv').config();

const isSentryEnabled = process.env.SENTRY_ENABLED === 'true';

// Ensure to call this before importing any other modules!
if (isSentryEnabled) {
  Sentry.init({
    dsn: process.env.SENTRY_EXPRESS_DSN,

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
} else {
  console.log('Sentry is disabled for this environment.');
}
