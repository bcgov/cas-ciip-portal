import React from 'react';
import {DefaultLayoutComponent} from 'layouts/default-layout';
import {Alert} from 'react-bootstrap';
import getConfig from 'next/config';
import * as Sentry from '@sentry/react';

const ErrorBoundary: React.FunctionComponent = ({children}) => {
  const supportEmail = getConfig()?.publicRuntimeConfig.SUPPORT_EMAIL;
  const mailtoLink = `mailto:${supportEmail}?subject=Support Request: CIIP Website Server Error`;

  return (
    <Sentry.ErrorBoundary
      fallback={
        <DefaultLayoutComponent session={null}>
          <Alert variant="danger">
            <Alert.Heading>Something went wrong</Alert.Heading>
            <p>
              Our development team was automatically notified. If you continue
              to encounter this problem, consider contacting us at{' '}
              <Alert.Link href={mailtoLink}>{supportEmail}</Alert.Link>.
            </p>
          </Alert>
        </DefaultLayoutComponent>
      }
    >
      {children}
    </Sentry.ErrorBoundary>
  );
};

export default ErrorBoundary;
