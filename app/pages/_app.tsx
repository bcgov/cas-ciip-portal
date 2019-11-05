import React from 'react';
import {QueryRenderer, fetchQuery} from 'react-relay';
import NextApp from 'next/app';

import {NextRouter} from 'next/router';
import {initEnvironment, createEnvironment} from '../lib/relay-environment';
import ErrorBoundary from '../lib/error-boundary';
import LoadingSpinner from '../components/LoadingSpinner';

interface AppProps {
  pageProps: {
    router: NextRouter;
    variables: any;
  };
}

export default class App extends NextApp<AppProps> {
  static getInitialProps = async ({Component, ctx}) => {
    const {variables = {}} = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    try {
      if (initEnvironment && Component.query) {
        const {environment, relaySSR} = initEnvironment();

        await fetchQuery(environment, Component.query, variables);

        return {
          pageProps: {
            variables,
            relayData: await relaySSR.getCache()
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
      pageProps: {variables = {}, relayData}
    } = this.props;
    const environment = createEnvironment(
      relayData,
      JSON.stringify({
        // @ts-ignore
        queryID: Component.query
          ? (Component as any).query().default.params.name
          : undefined,
        variables
      })
    );
    return (
      <ErrorBoundary>
        <QueryRenderer
          environment={environment}
          // @ts-ignore
          query={Component.query}
          variables={{...variables, ...router.query}}
          render={({error, props}) => {
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
