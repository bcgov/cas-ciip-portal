import React, {Component} from 'react';

class ErrorBoundary extends Component {
  state = {hasError: false};

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.error(error);
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>500 - Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
