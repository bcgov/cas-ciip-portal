import React, {Component} from 'react';
import {Container, Jumbotron} from 'react-bootstrap';
import {graphql} from 'react-relay';
import Header from '../../components/Header';
import FormLoaderContainer from '../Forms/FormLoaderContainer';
// Import FormPicker from '../components/Forms/FormPicker';

class BaseForm extends Component {
  state = {
    formId: 1
  };

  formIdHandler = formId => {
    this.setState({formId});
  };

  static query = graphql`
    query FormQuery($condition: FormJsonCondition) {
      query {
        ...FormLoaderContainer_query @arguments(condition: $condition)
      }
    }
  `;

  static async getInitialProps() {
    return {
      variables: {
        rowId: this.state ? this.state.formId : 1
      }
    };
  }

  // TODO: Fix formPicker to use relay fragments
  render() {
    const {query} = this.props;
    return (
      <>
        <Header />
        <Container>
          <Jumbotron>
            <h3>Hello, Hamza!</h3>
            <br />
            <p id="welcome-message">
              Welcome to your CleanBC Industrial Incentives Program (CIIP)
              Portal. This is where all your dreams come true. Not only do you
              get loads of money, you basically get it for being an amazing
              person! You may now take a moment to let that CIIP in. {'\u2728'}
            </p>
            <br />
            {/* <ButtonToolbar>
              <FormPicker handleFormId={this.formIdHandler} />
            </ButtonToolbar> */}
          </Jumbotron>
          <FormLoaderContainer query={query} formId={this.state.formId} />
        </Container>
        <br />
        <br />
        <br />
      </>
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
