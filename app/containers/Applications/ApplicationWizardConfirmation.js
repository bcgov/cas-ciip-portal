import React from 'react';
import {Card, Table, Button} from 'react-bootstrap';

/*
 * The ApplicationWizardConfirmation renders a summary of the data submitted in the application,
 * and allows the user to submit their application.
 */
const ApplicationWizardConfirmation = props => {
  const formResults = props.query.application.formResultsByApplicationId.edges;
  const resultObject = {};
  const capitalRegex = /(?<cap>[A-Z])/g;
  formResults.forEach(result => {
    const parsedResult = JSON.parse(result.node.formResult);
    const resultTitle = Object.keys(parsedResult);
    resultObject[resultTitle] = parsedResult;
  });

  const formArray = Object.keys(resultObject);

  const renderInputs = (formTitle, formInput, nest) => {
    let value = resultObject[formTitle][formTitle][0][formInput];
    const prettyInput = formInput.replace(capitalRegex, ' $1').trim();

    if (nest) value = resultObject[formTitle][formTitle][0][nest][0][formInput];

    return (
      <>
        <td style={{width: '50%'}}>
          <strong style={{textTransform: 'capitalize'}}>{prettyInput}:</strong>
        </td>
        <td style={{width: '50%'}}>{value}</td>
      </>
    );
  };

  const renderForm = formTitle => {
    const prettyTitle = formTitle.replace(capitalRegex, ' $1').trim();
    const formInputs = Object.keys(resultObject[formTitle][formTitle][0]);
    const nested = [];
    if (
      typeof resultObject[formTitle][formTitle][0][formInputs[0]] === 'object'
    ) {
      formInputs.forEach(input => {
        nested.push(input);
      });
    }

    return (
      <Card key={formTitle} style={{marginTop: '10px'}}>
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
                    <td>{nest}</td>
                  </tr>
                </thead>
                <tbody>
                  <tr />
                  {Object.keys(
                    resultObject[formTitle][formTitle][0][nest][0]
                  ).map(input => (
                    <tr key={input}>{renderInputs(formTitle, input, nest)}</tr>
                  ))}
                </tbody>
              </Table>
            ))
          ) : (
            <Table>
              <tbody>
                {formInputs.map(input => (
                  <tr key={input}>{renderInputs(formTitle, input)}</tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    );
  };

  return (
    <>
      {formArray.map(formTitle => renderForm(formTitle))}

      <Button
        className="float-right"
        style={{marginTop: '10px'}}
        onClick={() => console.log('Submitted')}
      >
        Submit
      </Button>
    </>
  );
};

export default ApplicationWizardConfirmation;
