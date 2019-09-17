import React, {Component} from 'react';
import propTypes from 'prop-types';
import {Button, Badge, Container, Row, Col, Dropdown} from 'react-bootstrap';

class ApplicationStatusUpdate extends Component {
  propTypes = {
    applicationStatus: propTypes.string.isRequired,
    displayStatus: propTypes.string.isRequired,
    setApplicationStatus: propTypes.func.isRequired
  };

  render() {
    const {applicationStatus, displayStatus, setApplicationStatus} = this.props;
    const statusBadgeColor = {
      pending: 'info',
      attention: 'warning',
      declined: 'danger',
      approved: 'success'
    };

    return (
      <Container>
        <Row>
          <Col md={3}>
            <h3>Application Status: </h3>
          </Col>
          <Col md={2}>
            <Dropdown style={{width: '100%'}}>
              <Dropdown.Toggle
                style={{width: '100%'}}
                variant={statusBadgeColor[applicationStatus]}
                id="dropdown"
              >
                {displayStatus}
              </Dropdown.Toggle>
              <Dropdown.Menu style={{width: '100%'}}>
                <Dropdown.Item
                  eventKey="approved"
                  onSelect={setApplicationStatus}
                >
                  Approved
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="declined"
                  onSelect={setApplicationStatus}
                >
                  Declined
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="attention"
                  onSelect={setApplicationStatus}
                >
                  Attention
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey="pending"
                  onSelect={setApplicationStatus}
                >
                  Pending
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ApplicationStatusUpdate;
