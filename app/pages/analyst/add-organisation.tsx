import React, { Component } from "react";
import { graphql } from "react-relay";
import { Card } from "react-bootstrap";
import { addOrganisationQueryResponse } from "addOrganisationQuery.graphql";
import DefaultLayout from "layouts/default-layout";
import AddOrganisation from "containers/Organisations/AddOrganisation";
import { INCENTIVE_ANALYST, ADMIN_GROUP } from "data/group-constants";

const ALLOWED_GROUPS = [INCENTIVE_ANALYST, ...ADMIN_GROUP];

interface Props {
  query: addOrganisationQueryResponse["query"];
}
class AddOrganisationPage extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query addOrganisationQuery {
      query {
        session {
          ...defaultLayout_session
        }
        ...AddOrganisation_query
      }
    }
  `;

  state = {
    orgInput: "",
    selectedOrg: null,
  };

  handleInputChange = (event) => {
    this.setState({ orgInput: event });
  };

  handleOrgChange = (orgId) => {
    this.setState({ selectedOrg: orgId });
  };

  render() {
    const { query } = this.props;
    return (
      <DefaultLayout session={query.session} title="Add Reporting Operation">
        <Card>
          <Card.Header className="h5">Attention</Card.Header>
          <Card.Body>
            <Card.Text>
              <p>
                Manually adding an operation via this UI has the potential to
                create duplicate and SWRS-orphaned operations in the data.
              </p>
              <p>
                This is an escape hatch and should be used as a last resort in
                the case that a reporter will not be able to meet the
                application deadline without it.
              </p>
              <p>
                Adding an operation in this way will allow the reporter to apply
                for CIIP, but will also create an operation that has no relation
                to SWRS data.
              </p>
              <br />
              <p>Some steps to take before adding an operation manually:</p>
              <ol>
                <li>
                  Search below for the operation, in case the reporter was
                  simply making typos when searching for an existing operation.
                </li>
                <li>
                  If you have reason to believe that a SWRS report containing
                  information for this operation is going to be received in the
                  near future, instruct the reporter to try applying again in a
                  few days when their SWRS report has been received.
                </li>
                <li>
                  Attempt some external investigation to find out why this
                  operation is missing.
                </li>
              </ol>
            </Card.Text>
          </Card.Body>
        </Card>
        <AddOrganisation
          query={query}
          orgInput={this.state.orgInput}
          selectedOrg={this.state.selectedOrg}
          handleInputChange={this.handleInputChange}
          handleOrgChange={this.handleOrgChange}
        />
      </DefaultLayout>
    );
  }
}

export default AddOrganisationPage;
