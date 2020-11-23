import React from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import {JSONSchema6} from 'json-schema';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';

interface Props {
  handleEvent: (action: string, column?: string, value?: string) => void;
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
      handleEvent(
        'applySearch',
        displayNameToColumnNameMap[e.formData.searchField],
        e.formData.searchValue
      );
    }
  };

  const handleClear = () => {
    handleEvent('applySearch', undefined, undefined);
  };

  const schema: JSONSchema6 = {
    type: 'object',
    properties: {
      searchField: {
        title: 'Search By:',
        type: 'string',
        enum: dropdownSortItems
      },
      searchValue: {
        title: 'Search Term:',
        type: 'string'
      }
    }
  };

  const uiSchema = {
    searchField: {
      'ui:col-md': 5
    },
    searchValue: {
      'ui:col-md': 7
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
          <ButtonGroup>
            <Button variant="success" type="submit">
              Search
            </Button>
            <Button variant="danger" onClick={handleClear}>
              Reset
            </Button>
          </ButtonGroup>
        </div>
      </JsonSchemaForm>

      <style jsx global>{`
        .search-actions {
          text-align: right;
          margin-top: 32px;
        }
      `}</style>
    </div>
  );
};

export default SearchBox;
