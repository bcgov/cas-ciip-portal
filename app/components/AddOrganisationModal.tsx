import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {IChangeEvent} from '@rjsf/core';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import addOperatorSchema from 'components/organisation/addOrganisationSchema';
import JsonSchemaForm from './helpers/LoadingOnSubmitForm';

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
      <p style={{marginTop: '20px'}}>Operation not in the list?</p>
      <Button
        variant="outline-primary"
        onClick={() => setModalVisible(!isModalVisible)}
      >
        Add Operation +
      </Button>
      <Modal
        centered
        size="lg"
        show={isModalVisible}
        onHide={() => setModalVisible(false)}
        aria-labelledby="add-new-operator"
      >
        <Modal.Header id="add-new-operator">
          <h2 className="h5">Add a new Operation</h2>
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
