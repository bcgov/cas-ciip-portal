import React from "react";
import { shallow } from "enzyme";
import { FormComponent } from "containers/Forms/Form";
import { Form_query } from "__generated__/Form_query.graphql";
import { Form_ciipFormResult } from "__generated__/Form_ciipFormResult.graphql";

describe("The Form Component", () => {
  const queryFragment: Form_query = {
    " $fragmentRefs": {
      NaicsField_query: true,
      FuelField_query: true,
      ProductField_query: true,
      FuelRowIdField_query: true,
      ProductRowIdField_query: true,
      EmissionCategoryRowIdField_query: true,
    },
    " $refType": "Form_query",

    products: {
      edges: [],
    },
  };

  const ciipFormResultFragment: Form_ciipFormResult = {
    " $refType": "Form_ciipFormResult",
    formResult: {},
    formJsonByFormId: {
      formJson: { schema: {} },
      ciipApplicationWizardByFormId: {
        formPosition: 0,
      },
      name: "Foo",
    },
  };

  it("should match the snapshot", () => {
    const wrapper = shallow(
      <FormComponent
        isSaved
        query={queryFragment}
        ciipFormResult={ciipFormResultFragment}
        onComplete={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the save & continue / save & exit buttons", () => {
    const wrapper = shallow(
      <FormComponent
        isSaved
        query={queryFragment}
        ciipFormResult={ciipFormResultFragment}
        onComplete={jest.fn()}
      />
    );
    expect(wrapper.find("Button")).toHaveLength(2);
    expect(wrapper.find("Button").at(0).text()).toBe("Save & Continue");
    expect(wrapper.find("Button").at(1).text()).toBe("Save & Exit");
  });

  it("should not render an alert reminder to check the guidance if no product requires emission allocation", () => {
    const wrapper = shallow(
      <FormComponent
        isSaved
        query={queryFragment}
        ciipFormResult={{
          " $refType": "Form_ciipFormResult",
          formResult: [{ requiresEmissionAllocation: false }],
          formJsonByFormId: {
            formJson: { schema: {} },
            ciipApplicationWizardByFormId: {
              formPosition: 3,
            },
            name: "Foo",
          },
        }}
        onComplete={jest.fn()}
      />
    );
    expect(wrapper.find("Alert")).toHaveLength(1);
    expect(wrapper).toMatchSnapshot();
  });

  it("should render alert reminder to check the guidance if any product requires emission allocation", () => {
    const wrapper = shallow(
      <FormComponent
        isSaved
        query={queryFragment}
        ciipFormResult={{
          " $refType": "Form_ciipFormResult",
          formResult: [{ requiresEmissionAllocation: true }],
          formJsonByFormId: {
            formJson: { schema: {} },
            ciipApplicationWizardByFormId: {
              formPosition: 3,
            },
            name: "Foo",
          },
        }}
        onComplete={jest.fn()}
      />
    );
    expect(wrapper.find("Alert")).toHaveLength(2);
    expect(wrapper).toMatchSnapshot();
  });
});
