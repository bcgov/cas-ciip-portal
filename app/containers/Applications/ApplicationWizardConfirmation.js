import React from 'react';
import {Card, Table, Button} from 'react-bootstrap';
import {createFragmentContainer} from 'react-relay';
import updateApplicationStatusMutation from '../../mutations/application/updateApplicationStatusMutation';

/*
 * The ApplicationWizardConfirmation renders a summary of the data submitted in the application,
 * and allows the user to submit their application.
 */
const ApplicationWizardConfirmation = props => {
  const formResults = props.query.application.formResultsByApplicationId.edges;
  const resultObject = {};
  const capitalRegex = /(?<cap>[A-Z])/g;
  // Create a parsed result object from each formResult page
  formResults.forEach(result => {
    const parsedResult = JSON.parse(result.node.formResult);
    const resultTitle = Object.keys(parsedResult);

    resultObject[resultTitle] = parsedResult;
  });
  // Create an array of keys to traverse the resultObject
  const formArray = Object.keys(resultObject);

  const renderInputs = (formTitle, subTitle, formInput, nest) => {
    let value = resultObject[formTitle][subTitle][0][formInput];
    // Space out camel cased inputs and Capitalize the input for display

    const prettyInput = formInput.replace(capitalRegex, ' $1').trim();

    // If there are nested values, change the location of the value variable
    if (nest) value = resultObject[formTitle][subTitle][0][nest][0][formInput];
    if (typeof value === 'object') return null;
    return (
      <>
        <td style={{width: '50%'}}>
          <strong style={{textTransform: 'capitalize'}}>{prettyInput}:</strong>
        </td>
        <td style={{width: '50%'}}>{value}</td>
      </>
    );
  };

  const renderForm = (formTitle, formSubtitle) => {
    // Space out camel cased titles and capitalize for display

    const prettyTitle = formSubtitle.replace(capitalRegex, ' $1').trim();
    // Get a list of keys for the form inputs
    const inputs = Object.keys(resultObject[formTitle][formSubtitle][0]);

    const nested = [];
    // Check for nested values (Electricity & heat have values nested under extra objects)
    if (
      typeof resultObject[formTitle][formSubtitle][0][inputs[0]] === 'object'
    ) {
      inputs.forEach(input => {
        nested.push(input);
      });
    }

    return (
      <Card key={(formTitle, formSubtitle)} style={{marginTop: '10px'}}>
        <Card.Header as="h5" style={{textTransform: 'capitalize'}}>
          {prettyTitle}
        </Card.Header>
        <Card.Body>
          {nested.length > 0 ? (
            nested.map(nest => (
              <Table key={nest}>
                <thead
                  className="text-center"
                  style={{
                    width: '100%',
                    textTransform: 'capitalize',
                    textDecoration: 'underline'
                  }}
                >
                  <tr>
                    <td>
                      <strong>{nest}</strong>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr />

                  {Object.keys(
                    resultObject[formTitle][formSubtitle][0][nest][0]
                  ).map(input => (
                    <tr key={(formTitle, formSubtitle, nest, input)}>
                      {renderInputs(formTitle, formSubtitle, input, nest)}
                    </tr>
                  ))}
                </tbody>
              </Table>
            ))
          ) : (
            <Table>
              <tbody>
                {inputs.map(input => (
                  <tr key={(formTitle, formSubtitle, input)}>
                    {renderInputs(formTitle, formSubtitle, input)}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    );
  };

  // Change application status to 'pending' on application submit
  const submitApplication = async () => {
    const {environment} = props.relay;
    const variables = {
      input: {
        id:
          props.query.application.applicationStatusesByApplicationId.edges[0]
            .node.id,
        applicationStatusPatch: {
          applicationStatus: 'pending'
        }
      }
    };
    const response = await updateApplicationStatusMutation(
      environment,
      variables
    );
    console.log(response);
  };

  return (
    <>
      {formArray.map(formTitle =>
        Object.keys(resultObject[formTitle]).map(formSubtitle =>
          renderForm(formTitle, formSubtitle)
        )
      )}

      <Button
        className="float-right"
        style={{marginTop: '10px'}}
        onClick={submitApplication}
      >
        Submit
      </Button>
    </>
  );
};

export default createFragmentContainer(ApplicationWizardConfirmation, {});
