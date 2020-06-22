import React, {Component} from 'react';
import {graphql} from 'react-relay';
import {addOrganisationPageQueryResponse} from 'addOrganisationQuery.graphql';
import DefaultLayout from 'layouts/default-layout';
import AddOrganisation from 'containers/Organisations/AddOrganisation';
import {INCENTIVE_ANALYST, ADMIN_GROUP} from 'data/group-constants';

const ALLOWED_GROUPS = [INCENTIVE_ANALYST, ...ADMIN_GROUP];

interface Props {
  query: addOrganisationPageQueryResponse['query'];
}
class AddOrganisationPage extends Component<Props> {
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
    orgInput: '',
    selectedOrg: null
  };

  handleInputChange = (event) => {
    this.setState({orgInput: event});
  };

  handleOrgChange = (orgId) => {
    this.setState({selectedOrg: orgId});
  };

  render() {
    const {query} = this.props;
    return (
      <DefaultLayout
        session={query.session}
        title="Add Organisation"
        allowedGroups={ALLOWED_GROUPS}
      >
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
