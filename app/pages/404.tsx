import React from 'react';
import {Row, Col} from 'react-bootstrap';
import DefaultLayout from 'layouts/default-layout';
import Link from 'next/link';

export default () => {
  return (
    <>
      <DefaultLayout session={null}>
        <Row className="justify-content-center" style={{paddingTop: '3em'}}>
          <Col md={{span: 6}} style={{textAlign: 'center'}}>
            <h1>Page not found</h1>
            <p>Sorry, we couldn&apos;t find the page you were looking for.</p>
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
