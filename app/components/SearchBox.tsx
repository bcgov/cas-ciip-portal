import React from 'react';
import {Button, ButtonGroup, Col} from 'react-bootstrap';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import {JSONSchema6} from 'json-schema';
import FormFieldTemplate from '../containers/Forms/FormFieldTemplate';
import FormObjectFieldTemplate from '../containers/Forms/FormObjectFieldTemplate';

interface Props {
  handleEvent: (...args: any[]) => void;
  dropdownSortItems: string[];
  displayNameToColumnNameMap: object;
  searchDisplay: string;
}

const SearchBox: React.FunctionComponent<Props> = ({
  handleEvent,
  dropdownSortItems,
  displayNameToColumnNameMap
}) => {
  const handleSubmit = (e: IChangeEvent) => {
    if (e.formData.searchField !== undefined) {
      handleEvent(
        'applySearchField',
        displayNameToColumnNameMap[e.formData.searchField]
      );
      handleEvent('applySearchValue', e.formData.searchValue);
    }
  };

  const handleClear = () => {
    handleEvent('applySearchField', undefined);
    handleEvent('applySearchValue', undefined);
  };

  const schema: JSONSchema6 = {
    type: 'object',
    properties: {
      searchField: {
        type: 'string',
        title: '  ',
        enum: dropdownSortItems
      },
      searchValue: {
        type: 'string',
        title: '  '
      }
    }
  };

  const uiSchema = {
    searchField: {
      'ui:placeholder': 'Search By: ',
      'ui:col-md': 2
    },
    searchValue: {
      'ui:col-md': 3
    }
  };

  return (
    <>
      <JsonSchemaForm
        schema={schema}
        uiSchema={uiSchema}
        showErrorList={false}
        FieldTemplate={FormFieldTemplate}
        ObjectFieldTemplate={FormObjectFieldTemplate}
        onSubmit={handleSubmit}
      >
        <Col md={{offset: 3}}>
          <ButtonGroup style={{marginLeft: '20px'}}>
            <Button
              style={{marginRight: '5px'}}
              variant="success"
              onClick={handleClear}
            >
              Reset
            </Button>
            <Button type="submit">Search</Button>
          </ButtonGroup>
        </Col>
      </JsonSchemaForm>

      <br />
    </>
  );
};

export default SearchBox;
