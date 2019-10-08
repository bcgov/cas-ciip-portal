import React, {Component} from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {DropdownButton, Dropdown} from 'react-bootstrap';

class FormPicker extends Component {
  formSelectHandler = (formId, formJson) => {
    console.log('FormPicker.js > formSelectHandler', formId, formJson);
    formId && this.props.handleFormId(formId, formJson);
  };

  formSelectButton = form => {
    return (
      <div key={form.id}>
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
    const {query} = this.props;
    const {allFormJsons} = query || {};
    const {edges} = allFormJsons || {};
    const formNodes = edges
      ? edges.map(({node}) => this.formSelectButton(node))
      : [];

    return (
      <div>
        <DropdownButton id="dropdown-basic-button" title="Please select a form">
          {formNodes}
        </DropdownButton>
      </div>
    );
  }
}

// export default FormPicker;
export default createFragmentContainer(FormPicker, {
  query: graphql`
    fragment FormPicker_query on Query {
      allFormJsons {
        edges {
          node {
            id
            rowId
            name
            formJson
          }
        }
      }
    }
  `
});
