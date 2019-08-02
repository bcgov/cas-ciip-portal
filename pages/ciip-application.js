import React , { Component } from 'react'
import Header from '../components/Header';
import FormLoader from '../components/Forms/FormLoader';
import FormPicker from '../components/Forms/FormPicker';
import {Container, Jumbotron, Button, Col, Row, ButtonToolbar} from "react-bootstrap";


class BaseForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            formId:3
        }
    }

    formIdHandler = (formId, formJson) => {
        this.setState({formId: formId})
    };

    render() {

        return (
            <React.Fragment>
                <Header/>
                <Container>
                    <Jumbotron>
                        <h3>Hello, Hamza!</h3><br/>
                        <p>
                            Welcome to your CleanBC Industrial Incentives Program (CIIP) Portal.
                            This is where all your dreams come true. Not only do you get loads of money, you basically
                            get it for being an amazing person! You may now take a moment to let that CIIP in. {'\u2728'}
                        </p>
                        <br/>
                        <ButtonToolbar>
                            <FormPicker handleFormId={this.formIdHandler}/>
                        </ButtonToolbar>
                    </Jumbotron>

                    <FormLoader formId={this.state.formId}/>
                </Container>
                <br/>
                <br/>
                <br/>
            </React.Fragment>
        );
    }
}

export default BaseForm;

/*
1: create a table called forms - done
2: add two forms to the table - done
2.2 - why isn't graphile creating a formById? - done, needs unique index
3: fetch forms using graphql - done
4: create a component that takes form id and loads form json - done
4.2 - get form data onSubmit done
5: pass component to baseform - done
6: create table to store results of form (user id, form id, key, value) - done
7: create a mutation (postgraphile should do this?) to store json results - done
8: call mutation on save form
-
9: add state that determines form
10: add function that updates state
11: pass function to formPicker
12: form picker to create a component that can take form details and create a toggler
13: toggler updates state.formId
 */