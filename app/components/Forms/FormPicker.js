import React, {Component} from 'react';
import {graphql, QueryRenderer} from 'react-relay';
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

  formPicker = ({error, props}) => {
    const formNodes = [];
    if (props) {
      const allForms = props.allFormJsons.nodes;
      allForms.forEach(form => {
        formNodes.push(this.formSelectButton(form));
      });
    } else if (error) console.error(error);

    return (
      <div>
        <DropdownButton id="dropdown-basic-button" title="Please select a form">
          {formNodes}
        </DropdownButton>
      </div>
    );
  };

  render() {
    return (
      <>
        <QueryRenderer
          environment={environment}
          query={graphql`
            query FormPickerQuery {
              allFormJsons {
                nodes {
                  rowId
                  name
                  formJson
                }
              }
            }
          `}
          render={this.formPicker}
        />
      </>
    );
  }
}

export default FormPicker;
