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
import {Organisations_query} from 'Organisations_query.graphql';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import AddOrganisationFacility from 'components/AddOrganisationFacility';
import createOrganisationMutation from 'mutations/organisation/createOrganisationMutation';
import LoadingSpinner from 'components/LoadingSpinner';
import Organisation from './Organisation';
import UserOrganisation from './UserOrganisation';

interface Props {
  query: Organisations_query;
  relay: RelayProp;
  flagCertRequests: boolean;
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

  const handleAddOrganisation = async (variables) => {
    const {environment} = props.relay;
    const response = await createOrganisationMutation(environment, variables);
    console.log(response);
    const {operatorName, rowId} = response.createOrganisation.organisation;
    selectOrg(operatorName, rowId);
  };

  const {edges} = session.ciipUserBySub.ciipUserOrganisationsByUserId;
  return (
    <>
      {props.flagCertRequests && (
        <Alert variant="info">
          One or more reporting operations has requested that you certify an
          application.{' '}
          <Alert.Link href="/certifier/requests">
            View all certification requests.
          </Alert.Link>
        </Alert>
      )}
      <Card bg="light">
        <Card.Body>
          Operator, Operator Representative, and Reporting Operation are defined
          in the{' '}
          <a href="http://www.bclaws.ca/civix/document/id/complete/statreg/14029_01">
            Greenhouse Gas Industrial Reporting and Control Act
          </a>{' '}
          and{' '}
          <a href="http://www.bclaws.ca/civix/document/id/lc/statreg/249_2015">
            Greenhouse Gas Emission Reporting Regulation
          </a>
          .
        </Card.Body>
      </Card>
      <br />
      {edges.length > 0 && (
        <Table
          striped
          bordered
          hover
          style={{textAlign: 'left', marginBottom: '40px'}}
        >
          <thead>
            <tr>
              <th>Operator</th>
              <th>Access Status</th>
              <th>Operations/Facilities</th>
            </tr>
          </thead>
          <tbody>
            {edges.map(({node}) => {
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
                <Card.Title>
                  Request access to apply for the CIIP on behalf of a Reporting
                  Operation:
                </Card.Title>
                <Alert variant="warning">
                  <p>
                    The CleanBC Industrial Incentive Program application must be
                    submitted by the Operator of the Reporting Operation or, if
                    there is more than one Operator, the Designated Operator as
                    defined by the{' '}
                    <Alert.Link href="http://www.bclaws.ca/civix/document/id/complete/statreg/14029_01">
                      Greenhouse Gas Industrial Reporting and Control Act
                    </Alert.Link>{' '}
                    and{' '}
                    <Alert.Link href="http://www.bclaws.ca/civix/document/id/lc/statreg/249_2015">
                      Greenhouse Gas Emission Reporting Regulation
                    </Alert.Link>
                    . Other representatives of the Reporting Operation may
                    complete the application if authorization from the Operator
                    is provided.
                  </p>
                  <p>
                    Further information on the role of the Operator and
                    Certifying Official{' '}
                    <Alert.Link href="https://www2.gov.bc.ca/gov/content/environment/climate-change/industry/cleanbc-program-for-industry/cleanbc-industrial-incentive-program">
                      can be found here
                    </Alert.Link>
                    .
                  </p>
                  <p>
                    Please email{' '}
                    <Alert.Link href="mailto:GHGRegulator@gov.bc.ca?subject=CIIP Portal Inquiry">
                      GHGRegulator@gov.bc.ca
                    </Alert.Link>{' '}
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
                    {allOrganisations.edges.map(({node}) => {
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
            <AddOrganisationFacility
              onAddOrganisation={handleAddOrganisation}
            />

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
            ...Organisation_organisation
          }
        }
      }
    }
  `
});
