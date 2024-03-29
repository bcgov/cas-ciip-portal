import React, { Component } from "react";
import { graphql } from "react-relay";
import { Card } from "react-bootstrap";
import { addFacilityQueryResponse } from "addFacilityQuery.graphql";
import DefaultLayout from "layouts/default-layout";
import AddFacility from "containers/Facilities/AddFacility";
import { INCENTIVE_ANALYST, ADMIN_GROUP } from "data/group-constants";

const ALLOWED_GROUPS = [INCENTIVE_ANALYST, ...ADMIN_GROUP];

interface Props {
  query: addFacilityQueryResponse["query"];
}
class AddFacilityPage extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query addFacilityQuery {
      query {
        session {
          ...defaultLayout_session
        }
        ...AddFacility_query
      }
    }
  `;

  state = {
    facilityInput: "",
    selectedFacility: null,
  };

  handleInputChange = (event) => {
    this.setState({ facilityInput: event });
  };

  handleFacilityChange = (facilityId) => {
    this.setState({ selectedFacility: facilityId });
  };

  render() {
    const { query } = this.props;
    return (
      <DefaultLayout session={query.session} title="Add Facility">
        <Card>
          <Card.Header className="h5">Attention</Card.Header>
          <Card.Body>
            <Card.Text>
              <p>
                Manually adding a facility via this UI has the potential to
                create duplicate and SWRS-orphaned facilities in the data.
              </p>
              <p>
                This is an escape hatch and should be used as a last resort in
                the case that a reporter will not be able to meet the
                application deadline without it.
              </p>
              <p>
                Adding a facility in this way will allow the reporter to apply
                for CIIP, but will also create a facility that has no relation
                to SWRS data.
              </p>
              <br />
              <p>Some steps to take before adding a facility manually:</p>
              <ol>
                <li>
                  Search below for the facility, in case the reporter was simply
                  making a typo when searching for an existing facility.
                </li>
                <li>
                  If you have reason to believe that a SWRS report containing
                  information for this facility is going to be received in the
                  near future, instruct the reporter to try applying again in a
                  few days when their SWRS report has been received.
                </li>
                <li>
                  Attempt some external investigation to find out why this
                  facility is missing.
                </li>
              </ol>
            </Card.Text>
          </Card.Body>
        </Card>
        <AddFacility
          query={query}
          facilityInput={this.state.facilityInput}
          selectedFacility={this.state.selectedFacility}
          handleInputChange={this.handleInputChange}
          handleFacilityChange={this.handleFacilityChange}
        />
      </DefaultLayout>
    );
  }
}

export default AddFacilityPage;
