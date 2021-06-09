import React from 'react';
import {DefaultLayoutComponent} from 'layouts/default-layout';
import {Alert} from 'react-bootstrap';
import getConfig from 'next/config';
import Link from 'next/link';

const ErrorFallback = () => {
  const supportEmail = getConfig()?.publicRuntimeConfig.SUPPORT_EMAIL;
  const mailtoLink = `mailto:${supportEmail}?subject=Support Request: CIIP Website Error`;

  return (
    <DefaultLayoutComponent session={null}>
      <Alert variant="danger">
        <Alert.Heading>Something went wrong</Alert.Heading>
        <p>
          Our development team was automatically notified. If you continue to
          encounter this problem, consider contacting us at{' '}
          <Alert.Link href={mailtoLink}>{supportEmail}</Alert.Link>.
        </p>
        <p>
          <Link href="/">
            <a className="full-width btn btn-primary">Return Home</a>
          </Link>
        </p>
      </Alert>
    </DefaultLayoutComponent>
  );
};

export default ErrorFallback;
