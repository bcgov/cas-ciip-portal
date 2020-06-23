import React, {useState} from 'react';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {Dropdown, FormControl, Card, Table} from 'react-bootstrap';
import {AddOrganisation_query} from 'AddOrganisation_query.graphql';
import AddOrganisationModal from 'components/AddOrganisationModal';
import createOrganisationMutation from 'mutations/organisation/createOrganisationMutation';
import Organisation from './Organisation';

interface Props {
  query: AddOrganisation_query;
  relay: RelayProp;
  orgInput: string;
  selectedOrg: number;
  handleInputChange: (event: any) => void;
  handleOrgChange: (event: any) => void;
}

export const AddOrganisationComponent: React.FunctionComponent<Props> = (
  props
) => {
  const [selectedOrgDetails, setSelectedOrgDetails] = useState(null);
  const {allOrganisations} = props.query;
  const changeInput = (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.persist();
    props.handleInputChange(event.target.value);
  };

  const selectOrg = (name, id, tradeName, cra) => {
    props.handleOrgChange(id);
    props.handleInputChange('');
    setSelectedOrgDetails({name, id, tradeName, cra});
  };

  const handleAddOrganisation = async (variables) => {
    const {environment} = props.relay;
    const response = await createOrganisationMutation(environment, variables);
    console.log(response);
  };

  return (
    <div>
      <Card style={{marginTop: '50px'}}>
        <Card.Body>
          <Card.Title>Search for an operator: </Card.Title>
          <Dropdown className="search-dropdown">
            <Dropdown.Toggle id="org-dropdown" className="search-toggle">
              Find Operator
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
          {props.selectedOrg !== null && (
            <Table style={{textAlign: 'center', marginTop: '10px'}}>
              <thead>
                <tr>
                  <th>Operator Name</th>
                  <th>Trade Name</th>
                  <th>CRA Business Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedOrgDetails?.name}</td>
                  <td>{selectedOrgDetails?.tradeName}</td>
                  <td>{selectedOrgDetails?.cra}</td>
                </tr>
              </tbody>
            </Table>
          )}
          <hr />
          <AddOrganisationModal onAddOrganisation={handleAddOrganisation} />
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
  );
};

export default createFragmentContainer(AddOrganisationComponent, {
  query: graphql`
    fragment AddOrganisation_query on Query {
      allOrganisations {
        edges {
          node {
            id
            rowId
            operatorName
            operatorTradeName
            craBusinessNumber
            ...Organisation_organisation
          }
        }
      }
    }
  `
});
