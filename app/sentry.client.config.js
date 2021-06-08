// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_ENVIRONMENT
  ? 'https://0c7b819c89924f4abe36297bf7cbc7cb@o646776.ingest.sentry.io/5797775'
  : null;

Sentry.init({
  dsn: SENTRY_DSN
});
