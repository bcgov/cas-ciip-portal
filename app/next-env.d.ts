import {NextComponentType, NextPageContext} from 'next';
import {GraphQLTaggedNode} from 'relay-runtime';
import {NextRouter} from 'next/router';
import {ComponentClass} from 'react';
import {FormProps as OriginalFromProps} from 'react-jsonschema-form';
import {JSONSchema7} from 'json-schema';

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

interface FormJson {
  schema: any;
  uiSchema: UiSchema;
  customFormats: any;
  customFormatsErrorMessages: Record<string, string>;
}

export type CiipPageComponent = NextComponentType<
  NextPageContext,
  CiipPageInitialProps,
  CiipPageComponentProps
> &
  ComponentClass<CiipPageComponentProps> & {
    static query: GraphQLTaggedNode;
  };

// This is overriding the form props defined in @types/react-jsonschema-form as they
// are missing some props, and it usee JSONSchema6 instead of JSONSchema7
// TODO: contribute to @types/react-jsonschema-form to fix these types so that we don't rely on this ugly override
declare module 'react-jsonschema-form' {
  export interface FormProps<T> extends OriginalFromProps<T> {
    schema: JSONSchema7;
    omitExtraData?: boolean;
    liveOmit?: boolean;
    customFormats?: Record<string, any>;
  }
}
