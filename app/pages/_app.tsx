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

    return (
      <ErrorBoundary>
        <PageRedirectHandler
          environment={environment}
          pageComponent={Component}
        >
          <QueryRenderer
            environment={environment}
            query={Component.query}
            variables={{...variables, ...router.query}}
            render={({error, props}: {error: any; props: any}) => {
              if (error !== null) throw error; // Let the ErrorBoundary above render the error nicely
              if (props)
                return <Component {...props} router={this.props.router} />;
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
