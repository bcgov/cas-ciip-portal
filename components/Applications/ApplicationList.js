import React ,{ Component } from 'react'
import {graphql, QueryRenderer} from "react-relay";
import initEnvironment from '../../lib/createRelayEnvironment';
import ApplicationRowItem from "./ApplicationRowItem";
import {Container, Dropdown, Button, Row, Col, Form, Table} from 'react-bootstrap';
const environment = initEnvironment();

// TODO: Dynamic options for filtering (ie: dropdown for status?), filtering with contains etc instead of just equals

class ApplicationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderByField: "operator_name",
            direction: "ASC",
            orderByDisplay: "Operator Name",
            filterField: null,
            filterValue: null,
            filterDisplay: "No Filter"
        }
    }

    listSearchedApplications = ({error, props}) => {
        console.log('ApplicationList.js > listSearchedApplications()', props, error);
        const applicationList = [];
        if(props){
            const filteredApplications = props.searchApplicationList.nodes;
            filteredApplications.forEach((application) => {
                applicationList.push(<ApplicationRowItem application={application} />);
            })
        }
        return applicationList;
    }

    sortApplications = (eventKey, event) => {
        event.preventDefault();
        event.stopPropagation();
        event.persist();
        this.setState({orderByField: eventKey, orderByDisplay: event.target.text});
    }

    toggleDirection = (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.state.direction === 'ASC' ? this.setState({direction: 'DESC'}) : this.setState({direction: 'ASC'})
    }

    applyFilterField = (eventKey, event) => {
        event.preventDefault();
        event.stopPropagation();
        event.persist();
        this.setState({filterField: eventKey, filterDisplay: event.target.text, filterValue: null});
    }

    applyFilterValue = (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.persist();
        if (this.state.filterField !== "none") {
            this.setState({filterValue: event.target[0].value});
        }
    }

    render(){
        const searchVars = {searchField: this.state.filterField, searchValue: this.state.filterValue, orderByField: this.state.orderByField, direction: this.state.direction};
        return(
            <React.Fragment>
                <Container style={{padding: 10, background: '#dee2e6'}}>
                    <Row>
                        <Col md={2}>
                        <h5>Sort Applications</h5>
                        </Col>
                        <Col md={2}/>
                        <Col md={3}>
                            <h5>Filter Applications</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
                            <Dropdown style={{width: "100%"}}>
                                <Dropdown.Toggle style={{width: "100%"}} variant='info' id='dropdown-sort'>
                                    {this.state.orderByDisplay}
                                </Dropdown.Toggle>
                                    <Dropdown.Menu style={{width: "100%"}}>
                                        <Dropdown.Item eventKey='application_id' onSelect={this.sortApplications}>Application ID</Dropdown.Item>
                                        <Dropdown.Item eventKey='operator_name' onSelect={this.sortApplications}>Operator Name</Dropdown.Item>
                                        <Dropdown.Item eventKey='facility_name' onSelect={this.sortApplications}>Facility Name</Dropdown.Item>
                                        <Dropdown.Item eventKey='submission_date' onSelect={this.sortApplications}>Submission Date</Dropdown.Item>
                                        <Dropdown.Item eventKey='application_status' onSelect={this.sortApplications}>Status</Dropdown.Item>
                                    </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col md={1}>
                            <Button style={{width: "100%"}}onClick={this.toggleDirection} variant='info'>{this.state.direction}</Button>
                        </Col>
                        <Col md={1}/>
                        <Col md={2}>
                           <Dropdown style={{width: "100%"}}>
                                <Dropdown.Toggle style={{width: "100%"}} variant='info' id='dropdown-filter'>
                                    {this.state.filterDisplay}
                                </Dropdown.Toggle>
                                    <Dropdown.Menu style={{width: "100%"}}>
                                        <Dropdown.Item eventKey={null} onSelect={this.applyFilterField}>No Filter</Dropdown.Item>
                                        <Dropdown.Item eventKey='application_id' onSelect={this.applyFilterField}>Application ID</Dropdown.Item>
                                        <Dropdown.Item eventKey='operator_name' onSelect={this.applyFilterField}>Operator Name</Dropdown.Item>
                                        <Dropdown.Item eventKey='facility_name' onSelect={this.applyFilterField}>Facility Name</Dropdown.Item>
                                        <Dropdown.Item eventKey='submission_date' onSelect={this.applyFilterField}>Submission Date</Dropdown.Item>
                                        <Dropdown.Item eventKey='application_status' onSelect={this.applyFilterField}>Status</Dropdown.Item>
                                    </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col md={6}>
                        <Form onSubmit={this.applyFilterValue}>
                          <Form.Row>
                            <Form.Group as={Col} md={8} controlId="filter">
                                <Form.Control type="string" step="0.01"
                                              ref='filter' />
                            </Form.Group>
                            <Form.Group as={Col} md={1}>
                                <Button variant='info' type='submit'>Filter</Button>
                            </Form.Group>
                            </Form.Row>
                        </Form>
                        </Col>
                    </Row>
                </Container>
                <br/>
                <br/>
                <Table striped bordered hover style={{textAlign:"center"}}>
                    <thead>
                        <tr>
                            <th>Application ID</th>
                            <th>Operator Name</th>
                            <th>Facility Name</th>
                            <th>Submitted</th>
                            <th>Status</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        <QueryRenderer
                            environment={environment}
                            variables={searchVars}
                            query={graphql`
                                query ApplicationListSearchQuery($searchField: String, $searchValue: String, $orderByField: String, $direction: String) {
                                    searchApplicationList(searchField: $searchField, searchValue: $searchValue, orderByField: $orderByField, direction: $direction){
                                        nodes{
                                        applicationId
                                        facilityName
                                        operatorName
                                        applicationStatus
                                        submissionDate
                                        }
                                    }
                                }
                            `}

                            render={this.listSearchedApplications}
                        />
                    </tbody>
                </Table>
          </React.Fragment>
        )
    }
}

export default ApplicationList;
