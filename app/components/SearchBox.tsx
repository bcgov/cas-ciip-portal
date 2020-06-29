import React from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import {JSONSchema6} from 'json-schema';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';

interface Props {
  handleEvent: (action: string, value?: string) => Promise<void>;
  dropdownSortItems: string[];
  displayNameToColumnNameMap: object;
}

const SearchBox: React.FunctionComponent<Props> = ({
  handleEvent,
  dropdownSortItems,
  displayNameToColumnNameMap
}) => {
  const handleSubmit = async (e: IChangeEvent) => {
    if (e.formData.searchField) {
      await handleEvent(
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
        enum: dropdownSortItems
      },
      searchValue: {
        type: 'string'
      }
    }
  };

  const uiSchema = {
    searchField: {
      'ui:placeholder': 'Search By: ',
      'ui:col-md': 5,
      classNames: 'hide-title'
    },
    searchValue: {
      'ui:col-md': 7,
      classNames: 'hide-title'
    }
  };

  return (
    <div className="search-form">
      <JsonSchemaForm
        schema={schema}
        uiSchema={uiSchema}
        showErrorList={false}
        FieldTemplate={FormFieldTemplate}
        ObjectFieldTemplate={FormObjectFieldTemplate}
        onSubmit={handleSubmit}
      >
        <div className="search-actions">
          <ButtonGroup style={{marginLeft: '20px'}}>
            <Button variant="success" type="submit">
              Search
            </Button>
            <Button variant="danger" onClick={handleClear}>
              Reset
            </Button>
          </ButtonGroup>
        </div>
      </JsonSchemaForm>
      {/* Hide searchField / searchValue JsonSchemaForm titles  */}
      <style jsx global>
        {`
          .hide-title label.form-label {
            display: none;
          }
        `}
      </style>

      <br />
    </div>
  );
};

export default SearchBox;
