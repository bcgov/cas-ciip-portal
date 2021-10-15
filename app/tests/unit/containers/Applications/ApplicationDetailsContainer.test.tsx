import React from "react";
import { shallow } from "enzyme";
import { ApplicationDetailsComponent } from "containers/Applications/ApplicationDetailsContainer";
import { ApplicationDetailsContainer_query } from "__generated__/ApplicationDetailsContainer_query.graphql";
import { ApplicationDetailsContainer_diffQuery } from "__generated__/ApplicationDetailsContainer_diffQuery.graphql";
import { ApplicationDetailsContainer_applicationRevision } from "__generated__/ApplicationDetailsContainer_applicationRevision.graphql";

const useRouter = jest.spyOn(require("next/router"), "useRouter");
useRouter.mockImplementation(() => ({
  asPath: "/path-to-application",
}));

describe("ApplicationDetailsComponent", () => {
  const queryFragment: ApplicationDetailsContainer_query = {
    " $refType": "ApplicationDetailsContainer_query",
    " $fragmentRefs": {
      ApplicationDetailsCardItem_query: true,
    },
  };

  const diffQueryFragment: ApplicationDetailsContainer_diffQuery = {
    " $refType": "ApplicationDetailsContainer_diffQuery",
    old: {
      orderedFormResults: {
        edges: [
          {
            node: {
              id: "abc",
              versionNumber: 0,
              formJsonByFormId: {
                slug: "admin",
              },
              formResult: null,
            },
          },
        ],
      },
    },
    new: {
      orderedFormResults: {
        edges: [
          {
            node: {
              id: "abc",
              versionNumber: 2,
              formJsonByFormId: {
                slug: "admin",
              },
              formResult: null,
            },
          },
        ],
      },
    },
  };

  const applicationRevisionFragment: ApplicationDetailsContainer_applicationRevision = {
    " $refType": "ApplicationDetailsContainer_applicationRevision",
    versionNumber: 2,
    orderedFormResults: {
      edges: [
        {
          node: {
            id: "WyJmb3JtX3Jlc3VsdHMiLDExXQ==",
            versionNumber: 2,
            " $fragmentRefs": {
              ApplicationDetailsCardItem_formResult: true,
            },
          },
        },
      ],
    },
    applicationByApplicationId: {
      id: "abc",
      latestSubmittedRevision: {
        versionNumber: 2,
      },
      applicationRevisionsByApplicationId: {
        edges: [
          {
            node: {
              id: "asdfgasd0",
              versionNumber: 0,
            },
          },
        ],
      },
    },
  };
  it("should match the snapshot with the ApplicationDetails component", async () => {
    const renderer = shallow(
      <ApplicationDetailsComponent
        liveValidate={false}
        review={false}
        relay={null}
        query={queryFragment}
        diffQuery={diffQueryFragment}
        applicationRevision={applicationRevisionFragment}
      />
    );
    expect(renderer).toMatchSnapshot();
  });
  it("should not render the `show diff` checkbox if review=false", async () => {
    const renderer = shallow(
      <ApplicationDetailsComponent
        liveValidate={false}
        review={false}
        relay={null}
        query={queryFragment}
        diffQuery={diffQueryFragment}
        applicationRevision={applicationRevisionFragment}
      />
    );
    expect(renderer.find("FormCheck").length).toBe(0);
  });
  it("should render the `show diff` checkbox if review=true", async () => {
    const renderer = shallow(
      <ApplicationDetailsComponent
        review
        liveValidate={false}
        relay={null}
        query={queryFragment}
        diffQuery={diffQueryFragment}
        applicationRevision={applicationRevisionFragment}
      />
    );
    expect(renderer.find("FormCheck").length).toBe(1);
  });
});
