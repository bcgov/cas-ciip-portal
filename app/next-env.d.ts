import {NextComponentType, NextPageContext} from 'next';
import {GraphQLTaggedNode} from 'relay-runtime';
import {NextRouter} from 'next/router';
import {ComponentClass} from 'react';
import {FormProps as OriginalFromProps} from 'react-jsonschema-form';

interface CiipPageInitialProps {
  pageProps: {
    router: NextRouter;
    variables: Record<string, any>;
  };
}

interface CiipPageComponentProps {
  query?: any;
  router?: NextRouter;
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
  };

// This is overriding the form props defined in @types/react-jsonschema-form as they
// are missing some props
// TODO: contribute to @types/react-jsonschema-form to fix these types so that we don't rely on this ugly override
declare module 'react-jsonschema-form' {
  export interface FormProps<T> extends OriginalFromProps<T> {
    omitExtraData?: boolean;
    liveOmit?: boolean;
    customFormats?: Record<string, any>;
    tagName?: any;
  }
}

declare module 'react-jsonschema-form/lib/utils' {
  export function toIdSchema(
    schema: JSONSchema6,
    id: string,
    definitions: any,
    formData: any,
    idPrefix: string
  ): IdSchema;
}
