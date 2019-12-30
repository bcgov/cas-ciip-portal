import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import addOperatorSchema from 'components/organisation/addOrganisationSchema';

interface Props {
  onAddOrganisation?: (...args: any[]) => void;
}

const AddOrganisationFacility: React.FunctionComponent<Props> = props => {
  const {onAddOrganisation} = props;
  const [modalShow, setModalShow] = useState(false);

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

export default AddOrganisationFacility;
