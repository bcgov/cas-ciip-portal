import React, {Component} from 'react';
import {Col, Row, ListGroup} from 'react-bootstrap';
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
            hasCertificationRequests
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
    const response = await createUserOrganisationMutation(
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
    console.log(response);
  };

  render() {
    const {query} = this.props;
    const {session} = query || {};
    const hasCertificationRequests = this.props?.query?.session?.ciipUserBySub
      ?.hasCertificationRequests;
    return (
      <DefaultLayout showSubheader session={session} title="My Operators">
        <Row>
          <Col md={{span: 8}}>
            <Organisations
              query={query}
              flagCertRequests={hasCertificationRequests}
              orgInput={this.state.orgInput}
              selectedOrg={this.state.selectedOrg}
              confirmOrg={this.state.confirmOrg}
              handleInputChange={this.handleInputChange}
              handleContextChange={this.handleContextChange}
              handleOrgChange={this.handleOrgChange}
              handleOrgConfirm={this.handleOrgConfirm}
            />
          </Col>
          <Col md={4}>
            <h2 style={{marginBottom: '20px'}}>How to apply for CIIP</h2>
            <div className="how-to-apply">
              <ListGroup>
                <ListGroup.Item>
                  <strong>Step 1:</strong>
                  <br />
                  Request access to apply on behalf of an Operation as an
                  applicant.
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Step 2:</strong>
                  <br />
                  CIIP administrators will review and approve your request.{' '}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Step 3:</strong>
                  <br />
                  Applicants will fill out an application for the Operation and
                  send it to a Certifying Official.
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Step 4:</strong>
                  <br />
                  The Certifying Official reviews and signs off on the
                  application.
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Step 5:</strong>
                  <br />
                  The applicant submits the application for assessment by the
                  Ministry.
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Step 6:</strong>
                  <br />
                  CIIP administrators review the application.
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Step 7:</strong>
                  <br />
                  If any changes are required, the applicant will be requested
                  to revise the application.
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Step 8:</strong>
                  <br />
                  Once processed, the applicant will receive a grant letter with
                  further details on the expected incentive payment.
                </ListGroup.Item>
              </ListGroup>
            </div>
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
