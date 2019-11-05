import {NextComponentType, NextPageContext} from 'next';
import {GraphQLTaggedNode} from 'relay-runtime';
import {NextRouter} from 'next/router';
import {ComponentClass} from 'react';

interface CiipPageInitialProps {
  pageProps: {
    router: NextRouter;
    variables: Record<string, any>;
  };
}

interface CiipPageComponentProps {
  query?: any;
  router: NextRouter;
}

export type CiipPageComponent = NextComponentType<
  NextPageContext,
  CiipPageInitialProps,
  CiipPageComponentProps
> &
  ComponentClass<CiipPageComponentProps> & {
    static query: GraphQLTaggedNode;
  };
