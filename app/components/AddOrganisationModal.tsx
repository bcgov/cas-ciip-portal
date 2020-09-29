import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import addOperatorSchema from 'components/organisation/addOrganisationSchema';

interface Props {
  onAddOrganisation?: (...args: any[]) => void;
}

const AddOrganisationModal: React.FunctionComponent<Props> = (props) => {
  const {onAddOrganisation} = props;
  const [isModalVisible, setModalVisible] = useState(false);

  const customFormats = {
    'postal-code': /[a-z]\d[a-z]\s?\d[a-z]\d/i
  };

  const saveNewOrganisation = async (e: IChangeEvent) => {
    const {operatorName, craBusinessNumber} = e.formData;
    const variables = {
      input: {
        organisation: {
          operatorName,
          craBusinessNumber
        }
      }
    };
    setModalVisible(!isModalVisible);
    onAddOrganisation(variables);
  };

  return (
    <>
      <p style={{marginTop: '20px'}}>Operator not in the list?</p>
      <Button
        variant="outline-primary"
        onClick={() => setModalVisible(!isModalVisible)}
      >
        Add Operator +
      </Button>
      <Modal
        centered
        size="lg"
        show={isModalVisible}
        onHide={() => setModalVisible(false)}
      >
        <Modal.Header>
          <h5>Add a new Operator</h5>
        </Modal.Header>
        <Modal.Body>
          <JsonSchemaForm
            schema={addOperatorSchema}
            customFormats={customFormats}
            showErrorList={false}
            FieldTemplate={FormFieldTemplate}
            ObjectFieldTemplate={FormObjectFieldTemplate}
            onSubmit={saveNewOrganisation}
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

export default AddOrganisationModal;
