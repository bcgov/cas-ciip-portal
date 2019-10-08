import React, {Component} from 'react';
import {graphql, QueryRenderer, createFragmentContainer} from 'react-relay';
import {DropdownButton, Dropdown} from 'react-bootstrap';

class FormPicker extends Component {
  formSelectHandler = (formId, formJson) => {
    console.log('FormPicker.js > formSelectHandler', formId, formJson);
    formId && this.props.handleFormId(formId, formJson);
  };

  formSelectButton = form => {
    return (
      <div key={form.rowId}>
        <Dropdown.Item
          onClick={() => {
            this.formSelectHandler(form.rowId, form.formJson);
          }}
        >
          {form.name}
        </Dropdown.Item>
      </div>
    );
  };

  render() {
    const formNodes = [];
    this.props.query.allFormJsons.edges.forEach(edge => {
      formNodes.push(this.formSelectButton(edge.node));
    });

    return (
      <div>
        <DropdownButton id="dropdown-basic-button" title="Please select a form">
          {formNodes}
        </DropdownButton>
      </div>
    );
  }
}

export default createFragmentContainer(FormPicker, {
  query: graphql`
    fragment FormPicker_query on Query {
      allFormJsons {
        edges {
          node {
            rowId
            name
            formJson
          }
        }
      }
    }
  `
});
