import React from 'react';
import Analytics from 'components/Layout/Analytics';
import getConfig from 'next/config';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps
} from 'next/document';
import RelayServerSSR from 'react-relay-network-modern-ssr/node8/server';
import {RecordMap} from 'relay-runtime/lib/store/RelayStoreTypes';
import initEnvironment from 'lib/relay/server';

interface Props {
  records: RecordMap;
}

const CONFIG = getConfig()?.publicRuntimeConfig;

class MyDocument extends Document<Props> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & Props> {
    const originalRenderPage = ctx.renderPage;
    const relayServerSSR = new RelayServerSSR();
    const env = initEnvironment(relayServerSSR);

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    await Document.getInitialProps(ctx);
    await relayServerSSR.getCache();
    const records = env.getStore().getSource().toJSON();
    console.log('records:', records);
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => {
          return (
            <App
              {...props}
              // @ts-expect-error
              records={records}
            />
          );
        }
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps, records};
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <title>CleanBC Industrial Incentive Program</title>
          <link rel="stylesheet" href="/static/bootstrap.min.css" />
          <link rel="stylesheet" href="/static/base.css" />
          <link
            rel="apple-touch-icon"
            href="/static/icons/bcid-apple-touch-icon.png"
            sizes="180x180"
          />
          <link
            rel="icon"
            href="/static/icons/bcid-favicon-32x32.png"
            sizes="32x32"
            type="image/png"
          />
          <link
            rel="icon"
            href="/static/icons/bcid-favicon-16x16.png"
            sizes="16x16"
            type="image/png"
          />
          <link
            rel="mask-icon"
            href="/static/icons/bcid-apple-icon.svg"
            color="#036"
          />
          <link rel="icon" href="/static/icons/bcid-favicon-32x32.png" />
        </Head>
        <body>
          <template id="relay-data">
            {Buffer.from(JSON.stringify(this.props.records)).toString('base64')}
          </template>
          <Main />
          <NextScript />
          {CONFIG?.ENABLE_ANALYTICS === 'true' && <Analytics />}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
