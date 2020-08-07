import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';
import Analytics from 'components/Layout/Analytics';
import getConfig from 'next/config';

const CONFIG = getConfig()?.publicRuntimeConfig;

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <html lang="en">
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
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
            <Main />
            <NextScript />
            {CONFIG.ENABLE_ANALYTICS === 'true' && <Analytics />}
          </body>
        </html>
      </Html>
    );
  }
}

export default MyDocument;
