import React from 'react';
import {Row, Col} from 'react-bootstrap';
import DefaultLayout from 'layouts/default-layout';
import Link from 'next/link';
import getConfig from 'next/config';

export default () => {
  const supportEmail = getConfig()?.publicRuntimeConfig.SUPPORT_EMAIL;
  const mailtoLink = `mailto:${supportEmail}?subject=Support Request`;

  return (
    <>
      <DefaultLayout session={null}>
        <Row className="justify-content-center" style={{paddingTop: '3em'}}>
          <Col md={{span: 6}} style={{textAlign: 'center'}}>
            <h1>Something went wrong</h1>
            <p>
              Our development team was automatically notified. If you continue
              to encounter this problem, consider contacting us at{' '}
              <a href={mailtoLink}>{supportEmail}</a>.
            </p>
            <p>
              <Link href="/">
                <a className="full-width btn btn-primary">Return Home</a>
              </Link>
            </p>
          </Col>
        </Row>
      </DefaultLayout>
      <style jsx>{`
        p {
          margin: 2em 0;
        }
      `}</style>
    </>
  );
};
