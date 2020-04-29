import React from 'react';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {
  Table,
  Dropdown,
  Button,
  Alert,
  FormControl,
  Card
} from 'react-bootstrap';
import {Organisations_query} from 'Organisations_query.graphql';
import {RelayModernEnvironment} from 'relay-runtime/lib/store/RelayModernEnvironment';
import AddOrganisationFacility from 'components/AddOrganisationFacility';
import createOrganisationMutation from 'mutations/organisation/createOrganisationMutation';
import LoadingSpinner from 'components/LoadingSpinner';
import Organisation from './Organisation';
import UserOrganisation from './UserOrganisation';
import Help from 'components/helpers/Help';

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
      {edges.length === 0 ? (
        <>
          <Alert variant="warning">
            You are not registered to apply for any Operator at this time. You
            can request access to an Operator by selecting one from the dropdown
            below.
          </Alert>
          <br />
        </>
      ) : (
        <>
          <Alert variant="info">
            Once your access to the requested operators is approved you can view
            their facilities and apply for CIIP for each.
          </Alert>
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
                return (
                  <UserOrganisation key={node.id} userOrganisation={node} />
                );
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
        </>
      )}

      <div>
        <Card style={{marginTop: '50px'}}>
          <Card.Header>
            <h5 className="blue inline-block">Add operators you represent </h5>
            <Help
              helpMessage={`Before you can report for operations,
                you must request access to Operators you can apply on behalf off.
                Once you you have been given access you will be able to see all the Reporting operations
                for that Operator`}
            />
          </Card.Header>
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
                <Card.Title>Request access to an Operator:</Card.Title>
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
