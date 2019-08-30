import React ,{ Component } from 'react'
import {graphql, QueryRenderer} from "react-relay";
import initEnvironment from '../../lib/createRelayEnvironment';
import ApplicationRowItem from "./ApplicationRowItem";
import {Container, Dropdown, Button, Row, Col} from 'react-bootstrap';
const environment = initEnvironment();


class ApplicationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderByField: "OPERATOR_NAME_",
            direction: "ASC",
            orderByDisplay: "operator name"
        }
    }

    listApplications = ({error, props}) => {
        console.log('ApplicationList.js > listApplications()', props, error);
        const applicationList = [];
        if(props){
            const allApplications = props.allApplications.nodes;
            allApplications.forEach((application) => {
                applicationList.push(<ApplicationRowItem application={application} />);
            })
        }
        return applicationList;
    }

    sortApplications = (eventKey) => {
      const display = eventKey.replace(/_/g, ' ').toLowerCase();
      this.setState({orderByField: eventKey, orderByDisplay: display});
    }

    toggleDirection = (event) => {
        this.state.direction === 'ASC' ? this.setState({direction: 'DESC'}) : this.setState({direction: 'ASC'})
    }

    render(){
        console.log(this.state.orderByField);
        console.log(this.state.direction);
        return(
            <React.Fragment>
                <Container style={{padding: 10, background: 'lightGrey'}}>
                    <h5>Sort Applications</h5>
                    <Row>
                        <Col md={2}>
                            <Dropdown style={{width: "100%"}}>
                                <Dropdown.Toggle style={{width: "100%"}} variant='info' id='dropdown-sort'>
                                    {this.state.orderByDisplay}
                                </Dropdown.Toggle>
                                    <Dropdown.Menu style={{width: "100%"}}>
                                        <Dropdown.Item eventKey='APPLICATION_ID_' onSelect={this.sortApplications}>application id</Dropdown.Item>
                                        <Dropdown.Item eventKey='OPERATOR_NAME_' onSelect={this.sortApplications}>operator name</Dropdown.Item>
                                        <Dropdown.Item eventKey='FACILITY_NAME_' onSelect={this.sortApplications}>facility name</Dropdown.Item>
                                        <Dropdown.Item eventKey='CERTIFICATION_DATE_' onSelect={this.sortApplications}>certification date</Dropdown.Item>
                                        <Dropdown.Item eventKey='APPLICATION_STATUS_' onSelect={this.sortApplications}>status</Dropdown.Item>
                                    </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col md={1}>
                            <Button style={{width: "100%"}}onClick={this.toggleDirection} variant='info'>{this.state.direction}</Button>
                        </Col>
                    </Row>
                </Container>
                <br/>
                <br/>
                <QueryRenderer
                    environment={environment}
                    variables={{orderBy: `${this.state.orderByField}${this.state.direction}`}}
                    query={graphql`
                        query ApplicationListQuery($orderBy: [ApplicationsOrderBy!]) {
                            allApplications(orderBy: $orderBy){
                                nodes{
                                  applicationId
                                  facilityName
                                  operatorName
                                  applicationStatus
                                  certificationDate
                                }
                            }
                        }
                    `}

                    render={this.listApplications}
                />
          </React.Fragment>
        )
    }

}

export default ApplicationList;
