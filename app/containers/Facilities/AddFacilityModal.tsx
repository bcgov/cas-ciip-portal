import React, {useState} from 'react';
import {graphql, createFragmentContainer} from 'react-relay';
import {AddFacilityModal_query} from 'AddFacilityModal_query.graphql';
import {Button, Modal, Card} from 'react-bootstrap';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import addFacilitySchema from 'components/facility/addFacilitySchema';
import OrganisationRowIdField from './OrganisationRowIdField';
import SearchDropdownWidget from 'components/Forms/SearchDropdownWidget';
import NumberField from 'containers/Forms/NumberField';

interface Props {
  query: AddFacilityModal_query;
  onAddFacility?: (...args: any[]) => void;
}

const AddFacilityModal: React.FunctionComponent<Props> = (props) => {
  const {onAddFacility, query} = props;
  const [isModalVisible, setModalVisible] = useState(false);

  const customFormats = {
    'postal-code': /[a-z]\d[a-z]\s?\d[a-z]\d/i
  };

  const CUSTOM_FIELDS = {
    organisationRowId: (props) => (
      <OrganisationRowIdField query={props.formContext.query} {...props} />
    ),
    NumberField
  };

  const addFacilityUiSchema = {
    organisationRowId: {
      'ui:col-md': 6,
      'ui:widget': 'SearchWidget',
      'ui:field': 'organisationRowId'
    }
  };

  const saveNewFacility = async (e: IChangeEvent) => {
    const {facilityName, facilityType, bcghgid, organisationRowId} = e.formData;
    const variables = {
      input: {
        facility: {
          facilityName,
          facilityType,
          bcghgid,
          organisationId: organisationRowId
        }
      }
    };
    setModalVisible(!isModalVisible);
    console.log(variables);
    onAddFacility(variables);
  };

  return (
    <>
      <Card style={{marginTop: '50px'}}>
        <Card.Body>
          <Card.Title>
            Can&apos;t find the Facility you&apos;re looking for?
          </Card.Title>
          <Card.Text>
            You can add a facility if it is new or hasn&apos;t reported before.
          </Card.Text>
          <Button
            variant="outline-primary"
            onClick={() => setModalVisible(!isModalVisible)}
          >
            Add a new Facility
          </Button>
        </Card.Body>
      </Card>
      <Modal
        centered
        size="lg"
        show={isModalVisible}
        onHide={() => setModalVisible(false)}
      >
        <Modal.Header>
          <h5>Add a new Facility</h5>
        </Modal.Header>
        <Modal.Body>
          <JsonSchemaForm
            schema={addFacilitySchema}
            uiSchema={addFacilityUiSchema}
            customFormats={customFormats}
            formContext={{query}}
            fields={CUSTOM_FIELDS}
            widgets={{SearchWidget: SearchDropdownWidget}}
            showErrorList={false}
            FieldTemplate={FormFieldTemplate}
            ObjectFieldTemplate={FormObjectFieldTemplate}
            onSubmit={saveNewFacility}
          >
            <div>
              <Button
                style={{marginRight: '10px'}}
                type="submit"
                variant="primary"
              >
                Save
              </Button>
              <Button
                variant="danger"
                onClick={() => setModalVisible(!isModalVisible)}
              >
                Close
              </Button>
            </div>
          </JsonSchemaForm>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default createFragmentContainer(AddFacilityModal, {
  query: graphql`
    fragment AddFacilityModal_query on Query {
      ...OrganisationRowIdField_query
    }
  `
});
