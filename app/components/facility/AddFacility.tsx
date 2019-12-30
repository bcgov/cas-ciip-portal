import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {JSONSchema6} from 'json-schema';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';

interface Props {
  onAddFacility: (...args: any[]) => void;
  organisationRowId: number;
  reportingYear: number;
}

const AddFacility = props => {
  const {onAddFacility, organisationRowId, reportingYear} = props;
  const [modalShow, setModalShow] = useState(false);
  const addFacilitySchema: JSONSchema6 = {
    type: 'object',
    title: 'Facility Details',
    properties: {
      facilityName: {
        title: 'Facility Name',
        type: 'string'
      },
      facilityType: {
        type: 'string',
        title: 'Facility Type',
        enum: ['IF_a', 'IF_b', 'L_c', 'SFO', 'LFO', 'EIO']
      },
      bcghgid: {
        type: 'string',
        title: 'BCGHG ID Number'
      },
      naics: {
        type: 'string',
        title: 'NAICS Code'
      },
      mailingAddress: {
        title: 'Facility Mailing Address',
        $ref: '#/definitions/address'
      }
    },
    definitions: {
      address: {
        type: 'object',
        properties: {
          facilityMailingAddress: {
            title: 'Street address',
            type: 'string'
          },
          facilityCity: {
            title: 'City',
            type: 'string'
          },
          facilityProvince: {
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
          facilityPostalCode: {
            title: 'Postal Code',
            type: 'string',
            format: 'postal-code'
          }
        }
      }
    }
  };

  const customFormats = {
    'postal-code': /[A-Z]\d[A-Z]\s?\d[A-Z]\d/i
  };

  const saveNewFacility = async (e: IChangeEvent) => {
    const {facilityName, facilityType, mailingAddress} = e.formData;
    const variables = {
      input: {
        facility: {
          facilityName,
          facilityType,
          ...mailingAddress,
          // TODO: Our facility table currently stores reportingYear as a string. Should it be an int? It's also a string in swrs & init functions
          reportingYear: String(reportingYear),
          organisationId: organisationRowId
        }
      }
    };

    onAddFacility(variables);
  };

  return (
    <>
      <Button onClick={() => setModalShow(!modalShow)}>Add Facility +</Button>
      <Modal
        centered
        size="xl"
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header>Add Facility</Modal.Header>
        <Modal.Body>
          <JsonSchemaForm
            schema={addFacilitySchema}
            customFormats={customFormats}
            showErrorList={false}
            FieldTemplate={FormFieldTemplate}
            ObjectFieldTemplate={FormObjectFieldTemplate}
            onSubmit={saveNewFacility}
          >
            <Button type="submit" variant="primary">
              Save Facility
            </Button>
          </JsonSchemaForm>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddFacility;
