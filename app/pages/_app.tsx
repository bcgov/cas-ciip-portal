import React from 'react';
import {QueryRenderer} from 'react-relay';
import NextApp from 'next/app';
import {NextRouter} from 'next/router';
import {CiipPageComponent} from 'next-env';
import {getRequest} from 'relay-runtime';
import {createEnvironment} from 'lib/relay-environment';
import ErrorBoundary from 'lib/error-boundary';
import LoadingSpinner from 'components/LoadingSpinner';
import ToasterHelper from 'components/helpers/Toaster';
import 'react-toastify/dist/ReactToastify.min.css';
import PageRedirectHandler from 'components/PageRedirectHandler';
import safeJsonParse from 'lib/safeJsonParse';

interface AppProps {
  pageProps: {
    router: NextRouter;
    variables: Record<string, any>;
  };
  Component: CiipPageComponent;
}

export default class App extends NextApp<AppProps> {
  static getInitialProps = async ({Component, ctx}) => {
    const initialProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    const variables = {
      ...initialProps.variables,
      ...ctx.query
    };
    return {
      pageProps: {variables}
    };
  };

  prevComponentProps = null;
  prevComponentClass = null;

  render() {
    const {
      Component,
      router,
      pageProps: {variables = {}}
    } = this.props;
    const environment = createEnvironment(
      JSON.stringify({
        queryID: Component.query
          ? getRequest(Component.query).params.name
          : undefined,
        variables: {...variables, ...router.query}
      })
    );

    // This is part of our query infrastructure.
    //
    // The relayVars query string in the URL contains all filters to apply to the Relay query variables.
    // It allows navigation to keep track of the query, so the form doesn't get reset.
    const relayVars = safeJsonParse(router.query.relayVars as string);
    const pageVars = safeJsonParse(router.query.pageVars as string);

    return (
      <ErrorBoundary>
        <PageRedirectHandler
          environment={environment}
          pageComponent={Component}
        >
          <QueryRenderer
            environment={environment}
            fetchPolicy="store-and-network"
            query={Component.query}
            variables={{
              ...variables,
              ...router.query,
              ...relayVars,
              ...pageVars
            }}
            render={({error, props}: {error: any; props: any}) => {
              if (error !== null) throw error; // Let the ErrorBoundary above render the error nicely
              if (props) {
                this.prevComponentProps = props;
                this.prevComponentClass = Component;

                return <Component {...props} router={this.props.router} />;
              }
              if (Component === this.prevComponentClass)
                return (
                  <Component
                    {...this.prevComponentProps}
                    loading
                    router={this.props.router}
                  />
                );
              return (
                <div>
                  <LoadingSpinner />
                  <style jsx>{`
                    div {
                      height: 100vh;
                    }
                  `}</style>
                </div>
              );
            }}
          />
        </PageRedirectHandler>
        <ToasterHelper />
      </ErrorBoundary>
    );
  }
}
