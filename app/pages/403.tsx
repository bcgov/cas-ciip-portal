import React from "react";
import { Row, Col } from "react-bootstrap";
import DefaultLayout from "layouts/default-layout";
import Link from "next/link";
import getConfig from "next/config";

export default () => {
  const supportEmail = getConfig()?.publicRuntimeConfig.SUPPORT_EMAIL;
  const mailtoLink = `mailto:${supportEmail}?subject=Support Request`;

  return (
    <>
      <DefaultLayout session={null}>
        <Row className="justify-content-center" style={{ paddingTop: "3em" }}>
          <Col md={{ span: 6 }} style={{ textAlign: "center" }}>
            <h1>Something went wrong</h1>
            <p>
              If you got here from the registration page, this is an issue that
              we are actively working to fix. We apologize for the
              inconvenience.
              <br />
              If you click on the &quot;Login&quot; button above, you can now
              log in with the credentials you entered in the registration form.
            </p>
            <p>
              For all other issues, please consider reporting this error to our
              development team at <a href={mailtoLink}>{supportEmail}</a>.
            </p>
            <p>
              <Link href="/">
                <a className="btn btn-primary">Return Home</a>
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
