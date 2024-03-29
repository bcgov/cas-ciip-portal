import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { graphql } from "react-relay";
import type { CiipPageComponentProps } from "types";
import { applicationDisclaimerQueryResponse } from "applicationDisclaimerQuery.graphql";
import DefaultLayout from "layouts/default-layout";
import LegalDisclaimerText from "components/LegalDisclaimerText";

interface Props extends CiipPageComponentProps {
  query: applicationDisclaimerQueryResponse["query"];
}

class ApplicationDisclaimer extends Component<Props> {
  static query = graphql`
    query applicationDisclaimerQuery {
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
    return (
      <DefaultLayout session={session} title="CIIP Application Disclaimer">
        <Container>
          <LegalDisclaimerText />
        </Container>
      </DefaultLayout>
    );
  }
}

export default ApplicationDisclaimer;
