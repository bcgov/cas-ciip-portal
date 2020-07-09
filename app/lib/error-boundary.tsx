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
      const feedbackUrl = getConfig()?.publicRuntimeConfig.FEEDBACK_SITE_URL;
      // You can render any custom fallback UI
      return (
        <DefaultLayoutComponent
          needsSession={false}
          needsUser={false}
          session={null}
        >
          <Alert variant="danger">
            <Alert.Heading>An unexpected error has occured</Alert.Heading>
            <p>
              Please consider reporting this error on our{' '}
              <Alert.Link href={feedbackUrl}>feedback site</Alert.Link>, by
              either creating a new post or commenting on an existing post if
              this error was already reported. Copying the error details below
              when submitting a bug report will help us understand what
              happened.
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
