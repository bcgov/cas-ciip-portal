import React, {Component} from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import {graphql} from 'react-relay';
import DefaultLayout from '../../layouts/default-layout';
import OrganisationFacilities from '../Organisations/OrganisationFacilities';

export default class UserOrganisationFacilities extends Component {
  static query = graphql`
    query UserOrganisationFacilitiesQuery($id: ID!) {
      query {
        ...OrganisationFacilities_query @arguments(id: $id)
      }
    }
  `;

  render() {
    const {router} = this.props;
    const title = `${router.query.organisationName} Facilities`;
    return (
      <DefaultLayout title={{title}}>
        <Container>
          <h2>Information:</h2>
          <p className="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <hr />
          <OrganisationFacilities query={this.props.query} />
        </Container>
      </DefaultLayout>
    );
  }
}
