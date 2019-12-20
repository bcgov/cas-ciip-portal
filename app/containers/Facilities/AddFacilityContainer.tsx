import React, {useState} from 'react';
import {graphql, createFragmentContainer, RelayProp} from 'react-relay';
import {Button, Modal} from 'react-bootstrap';
import {JSONSchema6} from 'json-schema';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import moment from 'moment-timezone';
import {AddFacilityContainer_organisation} from 'AddFacilityContainer_organisation.graphql';
import FormFieldTemplate from '../Forms/FormFieldTemplate';
import FormObjectFieldTemplate from '../Forms/FormObjectFieldTemplate';

interface Props {
  relay: RelayProp;
  organisation: AddFacilityContainer_organisation;
}

export const AddFacility = props => {
  const {organisation} = props;
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
          streetAddress: {
            title: 'Street address',
            type: 'string'
          },
          city: {
            title: 'City',
            type: 'string'
          },
          province: {
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
          postalCode: {
            title: 'Postal Code',
            type: 'string',
            format: 'postal-code'
          }
        }
      }
    }
  };

  const customFormats = {
    'postal-code': /[A-Z]\d[A-Z]\s?\d[A-Z]\d/
  };

  const addFacilityUISchema = {
    benchmark: {
      'ui:col-md': 6
    },
    description: {
      'ui:col-md': 6
    },
    startReportingYear: {
      'ui:col-md': 6,
      'ui:help': 'The first reporting year where this benchmark is used'
    },
    endReportingYear: {
      'ui:col-md': 6,
      'ui:help': 'The last reporting year where this benchmark is used'
    }
  };

  const currentYear = moment().format('YYYY');

  const saveNewFacility = (e: IChangeEvent) => {
    // Const {environment} = props.relay;
    const variables = {
      ...e.formData,
      currentYear,
      organisationId: organisation.rowId
    };
    console.log(variables);
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
            uiSchema={addFacilityUISchema}
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

export default createFragmentContainer(AddFacility, {
  organisation: graphql`
    fragment AddFacilityContainer_organisation on Organisation {
      rowId
    }
  `
});
