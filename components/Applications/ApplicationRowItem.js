import React ,{ Component } from 'react';
import propTypes from 'prop-types';
import {Form, Button, Badge, Col, Row, Modal, Container, Dropdown, Table} from 'react-bootstrap';

class ApplicationRowItem extends Component {

    constructor(props) {
        super(props);
    }

    render(){

        const application = this.props.application;
        console.log('my application', application);
        const statusBadgeColor = {
            pending: 'warning',
            declined: 'danger',
            approved: 'success'
        }
        const url = `http://localhost:3000/public/dashboard/985719f1-7eae-4c49-88a9-7d6c8edc1ad4?application_id=${application.applicationId}`;
        //const url = `https://metabase-wksv3k-dev.pathfinder.gov.bc.ca/public/dashboard/bb6a4b75-3a7f-4fab-9268-cb013ecfcb7b?application_id=${application.applicationId}`;
        const applicationDetails = `/application-details?application_id=${application.applicationId}&reportingyear=${application.reportingYear}&bcghgid=${application.bcghgid}`

        return(
            <React.Fragment>
                <div key={this.props.application.applicationId} >
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
                            <tr>
                                <td>{application.applicationId}</td>
                                <td>{application.operatorName}</td>
                                <td>{application.facilityName}</td>
                                <td>{application.submissionDate}</td>
                                <td>
                                    <Badge pill style={{width: "100%"}} variant={statusBadgeColor[application.applicationStatus]} >{application.applicationStatus}</Badge>
                                </td>
                                <td>
                                    <Button href={applicationDetails} target="_blank" variant='primary'>View Application</Button>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
          </React.Fragment>
        )
    }
}

// Proptype Validations

ApplicationRowItem.propTypes = {
    application: propTypes.shape({
        applicationId: propTypes.number,
        applicationStatus: propTypes.string,
        submissionDate: propTypes.string,
        facilityName: propTypes.string,
        operatorName: propTypes.string
  })
};

export default ApplicationRowItem;
