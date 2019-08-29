import React ,{ Component } from 'react';
import propTypes from 'prop-types';
import {Form, Button, Badge, Col, Row, Modal, Container} from 'react-bootstrap';

class ApplicationRowItem extends Component {

    constructor(props) {
        super(props);
        this.state = {showDetails: 'none'}
    }

    toggleDetails = () => {
        this.state.showDetails === 'none' ? this.setState({showDetails: 'block'}) : this.setState({showDetails: 'none'})
    }

    render(){

        const application = this.props.application;

        const statusBadgeColor = {
            pending: 'warning',
            declined: 'danger',
            approved: 'success'
        }
        const url = `https://metabase-wksv3k-dev.pathfinder.gov.bc.ca/public/dashboard/bb6a4b75-3a7f-4fab-9268-cb013ecfcb7b?application_id=${application.applicationId}`;

        return(
            <React.Fragment>
              <div key={this.props.application.applicationId} >
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={2} style={{textAlign: 'center'}}>
                            <h5>Application ID</h5>
                            <small>{application.applicationId}</small>
                        </Col>
                        <Col md={3}>
                            <h5>Operator Name</h5>
                            <small>{application.operatorName}</small>
                        </Col>
                        <Col md={3}>
                            <h5>Facility Name</h5>
                            <small>{application.facilityName}</small>
                        </Col>
                        <Col md={1}>
                            <h5>Status</h5>
                            <Badge pill variant={statusBadgeColor[application.applicationStatus]} >{application.applicationStatus}</Badge>
                        </Col>
                        <Col md={3} style={{paddingLeft: 100}}>
                            <Button style={{display: "table-cell"}} onClick={this.toggleDetails} target="_blank" variant='primary'>{this.state.showDetails === 'none' ? 'View Application' : 'Hide Application'}</Button>
                        </Col>
                    </Row>
                    <Row id={this.props.application.applicationId} className="justify-content-md-center" style={{display: this.state.showDetails}}>
                        <br/>
                        <Col md={12}>
                            <iframe
                                src={url}
                                frameBorder="0"
                                width="100%"
                                height="1000"
                                allowtransparency="true">
                            </iframe>
                        </Col>
                    </Row>
                </Container>
                <hr/>
            </div>
          </React.Fragment>
        )
    }
}

export default ApplicationRowItem;
