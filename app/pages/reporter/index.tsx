import React, {Component} from 'react';
import {Col, Row} from 'react-bootstrap';
import {graphql} from 'react-relay';
import {NextRouter} from 'next/router';
import {reporterQueryResponse} from 'reporterQuery.graphql';
import Organisations from 'containers/Organisations/Organisations';
import DefaultLayout from 'layouts/default-layout';
import {createUserOrganisationMutation} from 'mutations/user_organisation/createUserOrganisation';
import {USER} from 'data/group-constants';

const ALLOWED_GROUPS = [USER];

interface Props {
  router: NextRouter;
  query: reporterQueryResponse['query'];
}

export default class Reporter extends Component<Props> {
  static allowedGroups = ALLOWED_GROUPS;
  static isAccessProtected = true;
  static query = graphql`
    query reporterQuery {
      query {
        ...Organisations_query
        session {
          ...defaultLayout_session
          ciipUserBySub {
            id
            rowId
          }
        }
      }
    }
  `;

  state = {
    orgInput: '',
    selectedOrg: null,
    confirmOrg: false
  };

  handleInputChange = (event) => {
    this.setState({orgInput: event});
  };

  handleContextChange = () => {
    this.state.confirmOrg
      ? this.setState({confirmOrg: false})
      : this.setState({confirmOrg: true});
  };

  handleOrgChange = (orgId) => {
    this.setState({selectedOrg: orgId});
  };

  handleOrgConfirm = async (active, environment) => {
    const {id: userId, rowId} = this.props.query.session.ciipUserBySub;
    await createUserOrganisationMutation(
      environment,
      {
        input: {
          ciipUserOrganisation: {
            // Relay requires a value here because it is set to not null, but the userId value is set via a trigger on insert
            userId: rowId,
            organisationId: this.state.selectedOrg,
            status: active ? 'APPROVED' : 'PENDING'
          }
        }
      },
      userId
    );
  };

  render() {
    const {query} = this.props;
    const {session} = query || {};

    return (
      <DefaultLayout showSubheader session={session} title="My Operators">
        <Row className="justify-content-md-center">
          <Col md={10} lg={8}>
            <Organisations
              query={query}
              orgInput={this.state.orgInput}
              selectedOrg={this.state.selectedOrg}
              confirmOrg={this.state.confirmOrg}
              handleInputChange={this.handleInputChange}
              handleContextChange={this.handleContextChange}
              handleOrgChange={this.handleOrgChange}
              handleOrgConfirm={this.handleOrgConfirm}
            />
          </Col>
        </Row>
        <style>{`
          h2 {
            font-size: 1.25rem;
          }
        `}</style>
      </DefaultLayout>
    );
  }
}
