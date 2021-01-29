import React, {Component} from 'react';
import {DefaultLayoutComponent} from 'layouts/default-layout';
import {Alert} from 'react-bootstrap';
import getConfig from 'next/config';

class ErrorBoundary extends Component {
  state = {hasError: false, error: null, errorInfo: null};

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.error(error);
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    this.setState({error, errorInfo});
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const supportEmail = getConfig()?.publicRuntimeConfig.SUPPORT_EMAIL;
      const mailtoLink = `mailto:${supportEmail}?subject=Support Request: CIIP Website Server Error`;
      // You can render any custom fallback UI
      return (
        <DefaultLayoutComponent session={null}>
          <Alert variant="danger">
            <Alert.Heading>An unexpected error has occured</Alert.Heading>
            <p>
              Please consider reporting this error to our development team at{' '}
              <Alert.Link href={mailtoLink}>{supportEmail}</Alert.Link>. Copying
              the error details below when submitting a bug report will help us
              understand what happened.
            </p>
          </Alert>

          <h3>Error details</h3>
          <pre>
            <code>
              {this.state.error?.toString()}
              {process.env.NODE_ENV !== 'production' &&
                this.state.errorInfo?.componentStack}
            </code>
          </pre>
        </DefaultLayoutComponent>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
