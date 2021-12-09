import { NextComponentType, NextPageContext } from "next";
import { GraphQLTaggedNode, MutationConfig } from "relay-runtime";
import { NextRouter } from "next/router";
import { ComponentClass } from "react";
import { CacheConfig } from "react-relay-network-modern/node8";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";

interface CiipPageInitialProps {
  pageProps: {
    router: NextRouter;
    variables: Record<string, any>;
  };
}

interface CiipPageComponentProps {
  query?: any;
  router?: NextRouter;
  relayEnvironment?: RelayModernEnvironment;
  loading?: boolean;
}

interface FormJson {
  schema: any;
  uiSchema?: UiSchema;
  customFormats?: Record<string, string>;
  customFormatsErrorMessages?: Record<string, string>;
}

export type CiipPageComponent = NextComponentType<
  NextPageContext,
  CiipPageInitialProps,
  CiipPageComponentProps
> &
  ComponentClass<CiipPageComponentProps> & {
    static query: GraphQLTaggedNode;
    static isAccessProtected: boolean;
    static allowedGroups: string[];
  };

export interface CacheConfigWithDebounce extends CacheConfig {
  debounceKey?: string;
}

export interface MutationConfigWithDebounce<T> extends MutationConfig<T> {
  cacheConfig?: CacheConfigWithDebounce;
}
