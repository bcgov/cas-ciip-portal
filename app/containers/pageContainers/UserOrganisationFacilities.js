import React, {Component} from 'react';
import {graphql} from 'react-relay';
import DefaultLayout from '../../layouts/default-layout';
import OrganisationFacilities from '../Organisations/OrganisationFacilities';

export default class UserOrganisationFacilities extends Component {
  static query = graphql`
    query UserOrganisationFacilitiesQuery($organisationId: ID!) {
      query {
        ...OrganisationFacilities_query @arguments(id: $organisationId)
        session {
          ...Header_session
        }
        organisation(id: $organisationId) {
          operatorName
        }
      }
    }
  `;

  render() {
    const {organisation, session} = this.props.query;
    const orgTitle = `Facilities for ${organisation.operatorName} `;
    return (
      <DefaultLayout showSubheader session={session} title={orgTitle}>
        <OrganisationFacilities query={this.props.query} />
      </DefaultLayout>
    );
  }
}
