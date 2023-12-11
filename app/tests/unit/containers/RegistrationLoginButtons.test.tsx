import React from "react";
import { shallow } from "enzyme";
import { RegistrationLoginButtonsComponent } from "containers/RegistrationLoginButtons";

describe("The RegistrationLoginButtons component", () => {
  const useRouter = jest.spyOn(require("next/router"), "useRouter");
  useRouter.mockImplementation(() => ({
    query: {},
  }));

  it("should render the date where the current application window closes", () => {
    const component = shallow(
      <RegistrationLoginButtonsComponent
        query={{
          " $refType": "RegistrationLoginButtons_query",
          openedReportingYear: {
            applicationCloseTime: "2020-01-01T23:59:59-07:00",
          },
        }}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.find("Card p").first().text()).toStartWith(
      "Operators must submit a CIIP application form by January 1st, 2020."
    );
  });

  it("should render a message about the application window being closed", () => {
    const component = shallow(
      <RegistrationLoginButtonsComponent
        query={{
          " $refType": "RegistrationLoginButtons_query",
          openedReportingYear: null,
        }}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.find("Card p").first().text()).toStartWith(
      "In 2024, CIIP applications will be accepted from May 21 to June 28."
    );
  });
});
