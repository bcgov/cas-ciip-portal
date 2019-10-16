import React, { Component } from 'react';
import Header from '../../components/Header';
import {graphql} from 'react-relay';
import { Container, Row, Col, Form, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import OrganisationListContainer from '../Registration/OrganisationListContainer';

class Registration extends Component {

    constructor() {
        super();
        this.state = {
            orgCount: 1,
            orgList: []
        }
    }
    

    static query = graphql`
        query RegistrationQuery {
            query {
                ...OrganisationListContainer_query
            }
        }
    `;

    // addOrg() {
    //     return (
    //         <OrganisationListContainer query={query} />
    //     );
    // };

    render() {
        const {query} = this.props;

        console.log(this.props.query);

        return (
            <>
                <Header />
                <Container className="w-50">
                    <Row>
                        <Col>
                            <h2 className="mb-5">Registration</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form id="registration-form">
                                <Form.Group controlId="formBasicName">
                                    <Row className="mb-4">
                                        <Col>
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control type="text" />
                                        </Col>
                                        <Col>
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control type="text" />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group>
                                    <Row className="mb-4">
                                        <Col>
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control type="text" />
                                        </Col>
                                        <Col>
                                            <Form.Label>Phone No.</Form.Label>
                                            <Form.Control type="text" />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group>
                                    <Row className="mb-3">
                                        <Col>
                                            <Form.Label>Organization you represent</Form.Label>
                                            <OrganisationListContainer  query={query} />
                                        </Col>
                                        <Col>
                                            <Form.Label>Your role at the organization</Form.Label>
                                            <Form.Control type="text" />
                                        </Col>
                                    </Row>
                                </Form.Group>

                                <Form.Group>
                                    <Button variant="warning" type="button" className="mt-4" onClick={this.addOrg}>Add Another Organisation</Button>
                                </Form.Group>


                                <Button variant="primary" type="submit" className="mt-4">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

export default Registration;