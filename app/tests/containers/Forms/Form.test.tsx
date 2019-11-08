import React from 'react';
import {render} from 'enzyme';
import {FormComponent} from '../../../containers/Forms/Form';
import adminForm from '../../../../schema/data/portal/form_json/administration.json';
import fuelForm from '../../../../schema/data/portal/form_json/fuel.json';
import electricityAndHeatForm from '../../../../schema/data/portal/form_json/electricity_and_heat.json';
import productionForm from '../../../../schema/data/portal/form_json/production.json';

describe('Form', () => {
  it.skip('should match the snapshot with the administration form', async () => {
    // TODO: radio button input name is a random number. Figure out why that is.
    /** (Dylan): In node_modules/react-jsonSchema-form/lib/components/widgets/RadioWidget there is a 'var name = Math.random().toString();'
        The comment above this line says: // Generating a unique field name to identify this set of radio buttons.
    */
    const r = render(
      <FormComponent
        query={{
          ' $refType': 'Form_query',
          ' $fragmentRefs': {
            FuelFields_query: true,
            ProductionFields_query: true
          },
          result: {
            formResult: {},
            formJsonByFormId: {
              formJson: adminForm
            }
          }
        }}
      />
    );
    expect(r).toMatchSnapshot();
  });

  it('should match the snapshot with the fuel form', async () => {
    // TODO: figure out how to test fragment container under fuel
    const TestRenderer = () => (
      <FormComponent
        query={{
          ' $refType': 'Form_query',
          ' $fragmentRefs': {
            FuelFields_query: true,
            ProductionFields_query: true
          },
          result: {
            formResult: [],
            formJsonByFormId: {
              formJson: fuelForm
            }
          }
        }}
      />
    );
    const r = render(<TestRenderer />);
    expect(r).toMatchSnapshot();
  });

  it('should match the snapshot with the electricity and heat form', async () => {
    const r = render(
      <FormComponent
        query={{
          ' $refType': 'Form_query',
          ' $fragmentRefs': {
            FuelFields_query: true,
            ProductionFields_query: true
          },
          result: {
            formResult: {},
            formJsonByFormId: {
              formJson: electricityAndHeatForm
            }
          }
        }}
      />
    );
    expect(r).toMatchSnapshot();
  });

  it('should match the snapshot with the production form', async () => {
    const r = render(
      <FormComponent
        query={{
          ' $refType': 'Form_query',
          ' $fragmentRefs': {
            FuelFields_query: true,
            ProductionFields_query: true
          },
          result: {
            formResult: {},
            formJsonByFormId: {
              formJson: productionForm
            }
          }
        }}
      />
    );
    expect(r).toMatchSnapshot();
  });
});
