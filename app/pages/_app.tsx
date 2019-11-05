import React from 'react';
import {QueryRenderer, fetchQuery} from 'react-relay';
import NextApp from 'next/app';
import {NextRouter} from 'next/router';
import {CiipPageComponent} from 'next-env';
import {getRequest} from 'relay-runtime';
import {initEnvironment, createEnvironment} from '../lib/relay-environment';
import ErrorBoundary from '../lib/error-boundary';
import LoadingSpinner from '../components/LoadingSpinner';

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
    try {
      if (initEnvironment && Component.query) {
        const {environment} = initEnvironment();
        await fetchQuery(environment, Component.query, variables);

        return {
          pageProps: {
            variables
          }
        };
      }
    } catch (error) {
      console.log(error);
    }

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
        {/*
          // @ts-ignore */}
        <QueryRenderer
          environment={environment}
          query={Component.query}
          variables={{...variables, ...router.query}}
          render={({error, props}: {error: any; props: any}) => {
            if (error !== null) return <div>{error.message}</div>;
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
      </ErrorBoundary>
    );
  }
}
