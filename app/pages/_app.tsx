import React from "react";
import { QueryRenderer } from "react-relay";
import NextApp from "next/app";
import { NextRouter } from "next/router";
import type { CiipPageComponent } from "types";
import { getRequest } from "relay-runtime";
import { createEnvironment } from "lib/relay-environment";
import ErrorFallback from "components/ErrorFallback";
import LoadingSpinner from "components/LoadingSpinner";
import ToasterHelper from "components/helpers/Toaster";
import "react-toastify/dist/ReactToastify.min.css";
import PageRedirectHandler from "components/PageRedirectHandler";
import safeJsonParse from "lib/safeJsonParse";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";
import * as Sentry from "@sentry/react";
import SessionTimeoutHandler from "components/SessionTimeoutHandler";

interface AppProps {
  pageProps: {
    router: NextRouter;
    relayEnvironment: RelayModernEnvironment;
    variables: Record<string, any>;
  };
  Component: CiipPageComponent;
}

export default class App extends NextApp<AppProps> {
  static getInitialProps = async ({ Component, ctx }) => {
    const initialProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};
    const variables = {
      ...initialProps.variables,
      ...ctx.query,
    };
    return {
      pageProps: { variables },
    };
  };

  prevComponentProps = null;
  prevComponentClass = null;

  render() {
    const {
      Component,
      router,
      pageProps: { variables = {} },
    } = this.props;
    const environment = createEnvironment(
      JSON.stringify({
        queryID: Component.query
          ? getRequest(Component.query).params.name
          : undefined,
        variables: { ...variables, ...router.query },
      })
    );

    // This is part of our query infrastructure.
    //
    // The filterArgs query string in the URL contains all filters to apply to the Relay query variables.
    // It allows navigation to keep track of the query, so the form doesn't get reset.
    const filterArgs = safeJsonParse(router.query.filterArgs as string);
    const pageArgs = safeJsonParse(router.query.pageArgs as string);

    return (
      <Sentry.ErrorBoundary fallback={ErrorFallback}>
        {Component.isAccessProtected && (
          <SessionTimeoutHandler modalDisplaySecondsBeforeLogout={120} />
        )}
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
              ...filterArgs,
              ...pageArgs,
            }}
            render={({ error, props }: { error: any; props: any }) => {
              if (error !== null) throw error; // Let the ErrorBoundary above render the error nicely
              if (props) {
                this.prevComponentProps = props;
                this.prevComponentClass = Component;

                return (
                  <Component
                    {...props}
                    router={this.props.router}
                    relayEnvironment={environment}
                  />
                );
              }
              if (Component === this.prevComponentClass)
                return (
                  <Component
                    {...this.prevComponentProps}
                    loading
                    router={this.props.router}
                    relayEnvironment={environment}
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
      </Sentry.ErrorBoundary>
    );
  }
}
