import React, {useState} from 'react';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {Dropdown, FormControl, Card, Table} from 'react-bootstrap';
import {AddFacility_query} from 'AddFacility_query.graphql';
import AddFacilityModal from './AddFacilityModal';
import createFacilityMutation from 'mutations/facility/createFacilityMutation';
import Facility from './Facility';

interface Props {
  query: AddFacility_query;
  relay: RelayProp;
  facilityInput: string;
  selectedFacility: number;
  handleInputChange: (event: any) => void;
  handleFacilityChange: (event: any) => void;
}

export const AddFacilityComponent: React.FunctionComponent<Props> = (props) => {
  const [selectedFacilityDetails, setSelectedFacilityDetails] = useState(null);
  const {query} = props;
  const {allFacilities} = query;
  const changeInput = (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.persist();
    props.handleInputChange(event.target.value);
  };

  const selectFacility = (
    name,
    id,
    operatorName,
    facilityType,
    bcghgid,
    swrsReportId
  ) => {
    props.handleFacilityChange(id);
    props.handleInputChange('');
    setSelectedFacilityDetails({
      name,
      id,
      operatorName,
      facilityType,
      bcghgid,
      swrsReportId
    });
  };

  const handleAddFacility = async (variables) => {
    const {environment} = props.relay;
    await createFacilityMutation(environment, variables);
  };

  return (
    <div>
      <Card style={{marginTop: '50px'}}>
        <Card.Body>
          <Card.Title>Search for a facility: </Card.Title>
          <Dropdown className="search-dropdown">
            <Dropdown.Toggle id="org-dropdown" className="search-toggle">
              Find Facility
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <FormControl
                placeholder="Search..."
                className="mx-3 my-2 w-auto"
                onChange={changeInput}
              />
              <div className="facility-scroll">
                {allFacilities.edges.map(({node}) => {
                  return (
                    <Facility
                      key={node.id}
                      select
                      facility={node}
                      facilityInput={props.facilityInput}
                      selectFacility={selectFacility}
                    />
                  );
                })}
              </div>
            </Dropdown.Menu>
          </Dropdown>
          {props.selectedFacility !== null && (
            <Table
              style={{
                textAlign: 'center',
                marginTop: '10px',
                borderBottom: '1px solid rgb(0,0,0,0.1)'
              }}
            >
              <thead>
                <tr>
                  <th>Operator Name</th>
                  <th>Facility Name</th>
                  <th>Facility Type</th>
                  <th>BCGHGID</th>
                  <th>SWRS Report ID</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedFacilityDetails?.operatorName}</td>
                  <td>{selectedFacilityDetails?.name}</td>
                  <td>{selectedFacilityDetails?.facilityType}</td>
                  <td>{selectedFacilityDetails?.bcghgid}</td>
                  <td>{selectedFacilityDetails?.swrsReportId}</td>
                </tr>
              </tbody>
            </Table>
          )}
          <AddFacilityModal query={query} onAddFacility={handleAddFacility} />
          <style jsx>
            {`
              .facility-scroll {
                max-height: 250px;
                overflow: hidden;
                overflow-y: scroll;
              }

              thead {
                background: #036;
                color: #fff;
              }
            `}
          </style>
        </Card.Body>
      </Card>
    </div>
  );
};

export default createFragmentContainer(AddFacilityComponent, {
  query: graphql`
    fragment AddFacility_query on Query {
      allFacilities {
        edges {
          node {
            id
            rowId
            ...Facility_facility
          }
        }
      }
      ...AddFacilityModal_query
    }
  `
});
