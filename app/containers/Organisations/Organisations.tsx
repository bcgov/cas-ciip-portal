import React from 'react';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {
  Table,
  Dropdown,
  Button,
  FormControl,
  Alert,
  Card
} from 'react-bootstrap';
import getConfig from 'next/config';
import {Organisations_query} from 'Organisations_query.graphql';
import RelayModernEnvironment from 'relay-runtime/lib/store/RelayModernEnvironment';
import LoadingSpinner from 'components/LoadingSpinner';
import Organisation from './Organisation';
import UserOrganisation from './UserOrganisation';

interface Props {
  query: Organisations_query;
  relay: RelayProp;
  orgInput: string;
  selectedOrg: number;
  confirmOrg: boolean;
  handleInputChange: (event: any) => void;
  handleContextChange: () => void;
  handleOrgChange: (event: any) => void;
  handleOrgConfirm: (status: string, env: RelayModernEnvironment) => any;
}

export const OrganisationsComponent: React.FunctionComponent<Props> = (
  props
) => {
  const {session, allOrganisations} = props.query;
  const adminEmail = getConfig()?.publicRuntimeConfig.ADMIN_EMAIL;
  const adminMailToUrl = adminEmail
    ? `mailto:${adminEmail}?subject=CIIP Portal Inquiry`
    : '#';
  if (!session) return <LoadingSpinner />;

  const changeInput = (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.persist();
    props.handleInputChange(event.target.value);
  };

  const selectOrg = (name, id) => {
    props.handleInputChange(name);
    props.handleOrgChange(id);
    props.handleContextChange();
  };

  const claimOrg = async (active) => {
    props.handleContextChange();
    props.handleInputChange('');
    await props.handleOrgConfirm(active, props.relay.environment);
    props.handleOrgChange(null);
  };

  const cancelClaim = () => {
    props.handleOrgChange(null);
    props.handleContextChange();
    props.handleInputChange('');
  };

  const userOrgs = session.ciipUserBySub.ciipUserOrganisationsByUserId.edges;

  return (
    <>
      <Card bg="light">
        <Card.Body>
          Operator, Operation Representative, and Reporting Operation are
          defined in the{' '}
          <a href="https://www.bclaws.ca/civix/document/id/complete/statreg/14029_01">
            Greenhouse Gas Industrial Reporting and Control Act
          </a>{' '}
          and{' '}
          <a href="https://www.bclaws.ca/civix/document/id/lc/statreg/249_2015">
            Greenhouse Gas Emission Reporting Regulation
          </a>
          .
        </Card.Body>
      </Card>
      <br />
      {userOrgs.length > 0 && (
        <Table
          striped
          bordered
          hover
          style={{textAlign: 'left', marginBottom: '40px'}}
        >
          <thead>
            <tr>
              <th className="col-md-8">Operator</th>
              <th className="col-md-2">Access Status</th>
              <th className="col-md-2">Operations/Facilities</th>
            </tr>
          </thead>
          <tbody>
            {userOrgs.map(({node}) => {
              return <UserOrganisation key={node.id} userOrganisation={node} />;
            })}
          </tbody>
          <style jsx>
            {`
              th {
                padding: 20px;
                font-weight: 500;
              }
            `}
          </style>
        </Table>
      )}

      <div>
        <Card style={{marginTop: '50px'}}>
          <Card.Body>
            {props.confirmOrg ? (
              <>
                <Card.Title>Requesting access to: </Card.Title>
                <h4 style={{fontWeight: 300, margin: '15px 0'}}>
                  {props.orgInput}{' '}
                </h4>
                {/* Dev-only button to automatically create approved user-organisation requests */}
                {process.env.NODE_ENV === 'production' ? null : (
                  <Button
                    style={{marginRight: '15px'}}
                    variant="success"
                    onClick={async () => claimOrg(true)}
                  >
                    Activate Access
                  </Button>
                )}
                <Button
                  style={{marginRight: '15px'}}
                  variant="primary"
                  onClick={async () => claimOrg(false)}
                >
                  Request Access
                </Button>
                <Button variant="danger" onClick={cancelClaim}>
                  Cancel
                </Button>
              </>
            ) : (
              <Dropdown className="search-dropdown">
                <h2>
                  Request access to apply for the CIIP on behalf of a Reporting
                  Operation:
                </h2>
                <Alert variant="warning">
                  <p>
                    The CleanBC Industrial Incentive Program application must be
                    submitted by the Operator of the Reporting Operation or, if
                    there is more than one Operator, the Designated Operator as
                    defined by the{' '}
                    <Alert.Link href="https://www.bclaws.ca/civix/document/id/complete/statreg/14029_01">
                      Greenhouse Gas Industrial Reporting and Control Act
                    </Alert.Link>{' '}
                    and{' '}
                    <Alert.Link href="https://www.bclaws.ca/civix/document/id/lc/statreg/249_2015">
                      Greenhouse Gas Emission Reporting Regulation
                    </Alert.Link>
                    . Other representatives of the Reporting Operation may
                    complete the application if authorization from the Operator
                    is provided.
                  </p>
                  <p>
                    Further information on the role of the Operator and
                    Certifying Official{' '}
                    <Alert.Link href="https://www2.gov.bc.ca/gov/content?id=6F748A4DD83447C59B8B9361882FF9A3">
                      can be found here
                    </Alert.Link>
                    .
                  </p>
                  <p>
                    Please email{' '}
                    <Alert.Link href={adminMailToUrl}>{adminEmail}</Alert.Link>{' '}
                    if you have any questions.
                  </p>
                </Alert>
                <small style={{display: 'block', marginBottom: '20px'}}>
                  (You can search to narrow the results in the dropdown)
                </small>
                <Dropdown.Toggle id="org-dropdown" className="search-toggle">
                  Select Operator
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <FormControl
                    placeholder="Search..."
                    className="mx-3 my-2 w-auto"
                    onChange={changeInput}
                  />
                  <div className="org-scroll">
                    {allOrganisations.edges
                      .filter((org) => {
                        return !userOrgs.some(
                          (uo) => uo.node.organisationId === org.node.rowId
                        );
                      })
                      .map(({node}) => {
                        return (
                          <Organisation
                            key={node.id}
                            select
                            organisation={node}
                            orgInput={props.orgInput}
                            selectOrg={selectOrg}
                          />
                        );
                      })}
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            )}
            <hr />
            If you cannot find your operator in the list, please{' '}
            <a href={adminMailToUrl}>contact CAS</a> for assistance.
            <style jsx>
              {`
                .org-scroll {
                  max-height: 250px;
                  overflow: hidden;
                  overflow-y: scroll;
                }
              `}
            </style>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default createFragmentContainer(OrganisationsComponent, {
  query: graphql`
    fragment Organisations_query on Query {
      session {
        ciipUserBySub {
          id
          ciipUserOrganisationsByUserId(first: 2147483647)
            @connection(key: "Organisations_ciipUserOrganisationsByUserId") {
            edges {
              node {
                id
                organisationId
                ...UserOrganisation_userOrganisation
              }
            }
          }
        }
      }

      allOrganisations {
        edges {
          node {
            id
            rowId
            ...Organisation_organisation
          }
        }
      }
    }
  `
});
