import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {JSONSchema6} from 'json-schema';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';

interface Props {
  onAddOrganisation?: (...args: any[]) => void;
}

const AddOrganisation: React.FunctionComponent<Props> = props => {
  const {onAddOrganisation} = props;
  const [modalShow, setModalShow] = useState(false);
  const addOperatorSchema: JSONSchema6 = {
    type: 'object',
    title: 'Operator Details',
    properties: {
      name: {
        type: 'string',
        title: 'Legal name'
      },
      tradeName: {
        type: 'string',
        title: 'Trade name'
      },
      duns: {
        type: 'string',
        title: 'DUNS number',
        format: 'duns'
      },
      bcCorporateRegistryNumber: {
        type: 'string',
        title: 'BC Corporate Registry number'
      },
      naics: {
        type: 'string',
        title: 'NAICS code'
      },
      mailingAddress: {
        title: 'Operator Mailing Address',
        $ref: '#/definitions/address'
      }
    },
    definitions: {
      address: {
        type: 'object',
        properties: {
          operatorMailingAddress: {
            title: 'Street address',
            type: 'string'
          },
          operatorCity: {
            title: 'City',
            type: 'string'
          },
          operatorProvince: {
            title: 'Province or Territory',
            type: 'string',
            enum: [
              'Alberta',
              'British Columbia',
              'Manitoba',
              'New Brunswick',
              'Newfoundland and Labrador',
              'Northwest Territories',
              'Nova Scotia',
              'Nunavut',
              'Ontario',
              'Prince Edward Island',
              'Quebec',
              'Saskatchewan',
              'Yukon'
            ]
          },
          operatorPostalCode: {
            title: 'Postal Code',
            type: 'string',
            format: 'postal-code'
          }
        }
      }
    }
  };

  const customFormats = {
    'postal-code': /[A-Z]\d[A-Z]\s?\d[A-Z]\d/i,
    duns: /^\d{9}$/
  };

  const saveNewOrganisation = async (e: IChangeEvent) => {
    const {operatorName, mailingAddress} = e.formData;
    const variables = {
      input: {
        operator: {
          operatorName,
          ...mailingAddress
        }
      }
    };
    setModalShow(!modalShow);
    onAddOrganisation(variables);
  };

  return (
    <>
      <p id="add-organisation" onClick={() => setModalShow(!modalShow)}>
        I can&apos;t find my organisation
        <style jsx>
          {`
            #add-organisation {
              color: blue;
            }
            #add-organisation:hover {
              text-decoration: underline;
              cursor: pointer;
            }
          `}
        </style>
      </p>
      <Modal
        centered
        size="xl"
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header>Add Organisation</Modal.Header>
        <Modal.Body>
          <JsonSchemaForm
            schema={addOperatorSchema}
            customFormats={customFormats}
            showErrorList={false}
            FieldTemplate={FormFieldTemplate}
            ObjectFieldTemplate={FormObjectFieldTemplate}
            onSubmit={saveNewOrganisation}
          >
            <Button type="submit" variant="primary">
              Save
            </Button>
            <Button variant="danger" onClick={() => setModalShow(!modalShow)}>
              Close
            </Button>
          </JsonSchemaForm>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddOrganisation;
