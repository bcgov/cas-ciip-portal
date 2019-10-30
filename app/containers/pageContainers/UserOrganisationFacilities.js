import React, {Component} from 'react';
import {graphql} from 'react-relay';
import DefaultLayout from '../../layouts/default-layout';
import OrganisationFacilities from '../Organisations/OrganisationFacilities';

export default class UserOrganisationFacilities extends Component {
  static query = graphql`
    query UserOrganisationFacilitiesQuery($organisationId: ID!) {
      query {
        ...OrganisationFacilities_query @arguments(id: $organisationId)
        organisation(id: $organisationId) {
          operatorName
        }
      }
    }
  `;

  render() {
    const {organisation} = this.props.query;
    const orgTitle = `Facilities for ${organisation.operatorName} `;
    return (
      <DefaultLayout showSubheader title={orgTitle}>
        <OrganisationFacilities query={this.props.query} />
      </DefaultLayout>
    );
  }
}
