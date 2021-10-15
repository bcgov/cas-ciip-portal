import React, { Component } from "react";
import { Container, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { graphql } from "react-relay";
import getConfig from "next/config";
import { CiipPageComponentProps } from "next-env";
import { contactQueryResponse } from "contactQuery.graphql";
import DefaultLayout from "layouts/default-layout";

interface Props extends CiipPageComponentProps {
  query: contactQueryResponse["query"];
}

class Contact extends Component<Props> {
  static isAccessProtected = false;
  static query = graphql`
    query contactQuery {
      query {
        session {
          ...defaultLayout_session
        }
      }
    }
  `;

  render() {
    const { query } = this.props;
    const { session } = query || {};
    const supportEmail = getConfig()?.publicRuntimeConfig.SUPPORT_EMAIL;
    const supportMailToUrl = supportEmail
      ? `mailto:${supportEmail}?subject=Support Request (CIIP)`
      : "#";
    const adminEmail = getConfig()?.publicRuntimeConfig.ADMIN_EMAIL;
    const adminMailToUrl = adminEmail
      ? `mailto:${adminEmail}?subject=CIIP Inquiry`
      : "#";

    return (
      <DefaultLayout session={session} title="Contact Us">
        <Container>
          <Alert variant="info">
            <FontAwesomeIcon icon={faInfoCircle} />
            <span className="pl-2">
              For help with your CIIP application, or questions about the
              CleanBC Industrial Incentive Program, please email{" "}
              <a href={adminMailToUrl}>{adminEmail}</a>
            </span>
          </Alert>
          <p className="px-4 py-3">
            To report a website error, contact the development team at{" "}
            <a href={supportMailToUrl}>{supportEmail}</a>.
          </p>
        </Container>
      </DefaultLayout>
    );
  }
}

export default Contact;
