import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';
import Analytics from 'components/Layout/Analytics';
import getConfig from 'next/config';

const CONFIG = getConfig()?.publicRuntimeConfig;

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <link rel="stylesheet" href="/static/bootstrap.min.css" />
          <link rel="stylesheet" href="/static/base.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {CONFIG.ENABLE_ANALYTICS === 'true' && <Analytics />}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
