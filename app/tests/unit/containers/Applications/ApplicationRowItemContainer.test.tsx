import React from "react";
import { shallow } from "enzyme";
import { ApplicationRowItem } from "containers/Applications/ApplicationRowItemContainer";
import { ApplicationRowItemContainer_application } from "ApplicationRowItemContainer_application.graphql";

describe("ApplicationRowItem", () => {
  it("should render the application", () => {
    const application: ApplicationRowItemContainer_application = {
      id: "123",
      rowId: 1,
      operatorName: "blah",
      facilityName: "foo",
      latestSubmittedRevisionStatus: "APPROVED",
      reportingYear: 2018,
      submissionDate: "2020-09-02T11:14:08.254553-07:00",
      " $refType": "ApplicationRowItemContainer_application",
    };
    const render = shallow(<ApplicationRowItem application={application} />);
    expect(render).toMatchSnapshot();
  });
});
