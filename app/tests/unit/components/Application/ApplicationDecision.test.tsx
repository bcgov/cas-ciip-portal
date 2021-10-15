import React from "react";
import { shallow } from "enzyme";
import ApplicationDecision from "components/Application/ApplicationDecision";

describe("ApplicationDecision", () => {
  it("matches the last accepted snapshot (no reviewer comments; APPROVED)", () => {
    const r = shallow(
      <ApplicationDecision
        reviewComments={[]}
        decision="APPROVED"
        actionRequired={false}
      />
    );

    expect(r).toMatchSnapshot();
  });

  it("matches the last accepted snapshot (no reviewer comments; REJECTED)", () => {
    const r = shallow(
      <ApplicationDecision
        reviewComments={[]}
        decision="REJECTED"
        actionRequired={false}
      />
    );

    expect(r).toMatchSnapshot();
  });

  it("matches the last accepted snapshot (with reviewer comments; REJECTED)", () => {
    const r = shallow(
      <ApplicationDecision
        reviewComments={[
          "We cannot accept applications from facilities that are either not regulated under GGIRCA, or which paid no carbon tax in 2020.",
        ]}
        decision="REJECTED"
        actionRequired={false}
      />
    );

    expect(r).toMatchSnapshot();
  });

  it("matches the last accepted snapshot (with reviewer comments; REQUESTED_CHANGES)", () => {
    const r = shallow(
      <ApplicationDecision
        reviewComments={[
          'The operator name is slightly different from a previous match we have on file: should it be "Virtucon Limited" instead of "Virtucon Ltd"?',
          "Another comment.",
        ]}
        decision="REQUESTED_CHANGES"
        actionRequired
      />
    );

    expect(r).toMatchSnapshot();
  });
});
