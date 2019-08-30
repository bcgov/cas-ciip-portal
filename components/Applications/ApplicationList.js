import React ,{ Component } from 'react'
import {graphql, QueryRenderer} from "react-relay";
import initEnvironment from '../../lib/createRelayEnvironment';
import ApplicationRowItem from "./ApplicationRowItem";
import {Dropdown, Button, Row, Col} from 'react-bootstrap';
const environment = initEnvironment();


class ApplicationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderBy: "OPERATOR_NAME_ASC",
            direction: "ASC"
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
      this.setState({orderBy: `${eventKey}${this.state.direction}`});
      console.log(eventKey);
    }

    toggleDirection = (event) => {
        this.state.direction === 'ASC' ? this.setState({direction: 'DESC'}) : this.setState({direction: 'ASC'})
    }

    render(){
        console.log(this.state);
        return(
            <React.Fragment>
              <Row>
                <Dropdown>
                    <Dropdown.Toggle variant='primary' id='dropdown-sort'>
                        Sort By
                    </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey='APPLICATION_STATUS_' onSelect={this.sortApplications}>status</Dropdown.Item>
                            <Dropdown.Item eventKey='CERTIFICATION_DATE_' onSelect={this.sortApplications}>certification date</Dropdown.Item>
                        </Dropdown.Menu>
                </Dropdown>
                <Button onClick={this.toggleDirection} variant='primary'>{this.state.direction}</Button>
                </Row>
                <br/>
                <br/>
                <QueryRenderer
                    environment={environment}
                    variables={{orderBy: this.state.orderBy}}
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
