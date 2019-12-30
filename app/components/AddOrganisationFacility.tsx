import React, {useState} from 'react';
import {Button, Modal} from 'react-bootstrap';
import JsonSchemaForm, {IChangeEvent} from 'react-jsonschema-form';
import FormFieldTemplate from 'containers/Forms/FormFieldTemplate';
import FormObjectFieldTemplate from 'containers/Forms/FormObjectFieldTemplate';
import addOperatorSchema from 'components/organisation/addOrganisationSchema';
import addFacilitySchema from 'components/facility/addFacilitySchema';

interface Props {
  onAddOrganisation?: (...args: any[]) => void;
  onAddFacility?: (...args: any[]) => void;
  organisationRowId?: number;
  reportingYear?: number;
}

const AddOrganisationFacility: React.FunctionComponent<Props> = props => {
  const {
    onAddOrganisation,
    onAddFacility,
    organisationRowId,
    reportingYear
  } = props;
  const [modalShow, setModalShow] = useState(false);

  const customFormats = {
    'postal-code': /[A-Z]\d[A-Z]\s?\d[A-Z]\d/i,
    duns: /^\d{9}$/
  };

  const saveNewFacility = async (e: IChangeEvent) => {
    const {
      facilityName,
      facilityType,
      bcghgid,
      naicsCode,
      mailingAddress
    } = e.formData;
    const variables = {
      input: {
        facility: {
          facilityName,
          facilityType,
          bcghgid,
          naicsCode,
          ...mailingAddress,
          // TODO: Our facility table currently stores reportingYear as a string. Should it be an int? It's also a string in swrs & init functions
          reportingYear: String(reportingYear),
          organisationId: organisationRowId
        }
      }
    };
    setModalShow(!modalShow);
    onAddFacility(variables);
  };

  const saveNewOrganisation = async (e: IChangeEvent) => {
    const {operatorName, operatorTradeName, duns, mailingAddress} = e.formData;
    const variables = {
      input: {
        operator: {
          operatorName,
          operatorTradeName,
          duns,
          ...mailingAddress
        }
      }
    };
    setModalShow(!modalShow);
    onAddOrganisation(variables);
  };

  return (
    <>
      {onAddFacility ? (
        <Button onClick={() => setModalShow(!modalShow)}>Add Facility +</Button>
      ) : (
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
      )}
      <Modal
        centered
        size="xl"
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        {onAddFacility ? (
          <Modal.Header>Add Facility</Modal.Header>
        ) : (
          <Modal.Header>Add Organisation</Modal.Header>
        )}
        <Modal.Body>
          <JsonSchemaForm
            schema={onAddFacility ? addFacilitySchema : addOperatorSchema}
            customFormats={customFormats}
            showErrorList={false}
            FieldTemplate={FormFieldTemplate}
            ObjectFieldTemplate={FormObjectFieldTemplate}
            onSubmit={onAddFacility ? saveNewFacility : saveNewOrganisation}
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
