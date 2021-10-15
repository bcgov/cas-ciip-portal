import React from "react";
import { shallow, mount } from "enzyme";
import { ReviewSidebar } from "containers/Admin/ApplicationReview/ReviewSidebar";
import { ReviewSidebar_applicationReviewStep } from "__generated__/ReviewSidebar_applicationReviewStep.graphql";

const applicationReviewStep = () => {
  return {
    " $refType": "ReviewSidebar_applicationReviewStep",
    id: "abc",
    rowId: 4,
    isComplete: false,
    reviewStepByReviewStepId: {
      stepName: "technical",
    },
    generalComments: {
      edges: [],
    },
    internalComments: {
      edges: [],
    },
  };
};
const generalComments = () => {
  return {
    edges: [
      {
        node: {
          id: "wxy",
          description: "This is an unresolved general comment.",
          createdAt: "2021-04-08T03:01:35.585Z",
          resolved: false,
          ciipUserByCreatedBy: {
            firstName: "Old",
            lastName: "MacDonald",
          },
        },
      },
      {
        node: {
          id: "vwx",
          description: "This is a resolved general comment.",
          createdAt: "2021-04-08T03:01:35.585Z",
          resolved: true,
          ciipUserByCreatedBy: {
            firstName: "Old",
            lastName: "MacDonald",
          },
        },
      },
    ],
  };
};
const internalComments = () => {
  return {
    edges: [
      {
        node: {
          id: "xyz",
          description: "This is an unresolved internal comment.",
          createdAt: "2021-04-08T03:01:35.585Z",
          resolved: false,
          ciipUserByCreatedBy: {
            firstName: "Old",
            lastName: "MacDonald",
          },
        },
      },
      {
        node: {
          id: "cde",
          description: "This is a resolved internal comment.",
          createdAt: "2021-04-08T03:01:35.585Z",
          resolved: true,
          ciipUserByCreatedBy: {
            firstName: "Old",
            lastName: "MacDonald",
          },
        },
      },
    ],
  };
};

const applicationReviewStepWithComments = () => {
  return {
    ...applicationReviewStep(),
    internalComments: internalComments(),
    generalComments: generalComments(),
  };
};

const applicationReviewStepWithAllCommentsResolved = () => {
  return {
    ...applicationReviewStep(),
    internalComments: { edges: [internalComments().edges[1]] },
    generalComments: { edges: [generalComments().edges[1]] },
  };
};

describe("ReviewSidebar", () => {
  it("should match the last accepted snapshot (with comments)", async () => {
    const relay = { environment: null };
    const data = applicationReviewStepWithComments();
    const r = shallow(
      <ReviewSidebar
        isFinalized={false}
        applicationReviewStep={data as ReviewSidebar_applicationReviewStep}
        onClose={() => {}}
        relay={relay as any}
      />
    );
    expect(r).toMatchSnapshot();
  });
  it("should match the last accepted snapshot (no comments)", async () => {
    const relay = { environment: null };
    const data = applicationReviewStep();
    const r = shallow(
      <ReviewSidebar
        isFinalized={false}
        applicationReviewStep={data as ReviewSidebar_applicationReviewStep}
        onClose={() => {}}
        relay={relay as any}
      />
    );
    expect(r).toMatchSnapshot();
  });
  it("should match the last accepted snapshot (review finalized, decision has been made)", async () => {
    const relay = { environment: null };
    const data = applicationReviewStepWithAllCommentsResolved();
    const r = shallow(
      <ReviewSidebar
        isFinalized
        applicationReviewStep={data as ReviewSidebar_applicationReviewStep}
        onClose={() => {}}
        relay={relay as any}
      />
    );
    expect(r).toMatchSnapshot();
  });
  it("should not initially show resolved comments", () => {
    const relay = { environment: null };
    const data = applicationReviewStepWithComments();
    const r = shallow(
      <ReviewSidebar
        isFinalized={false}
        applicationReviewStep={data as ReviewSidebar_applicationReviewStep}
        onClose={() => {}}
        relay={relay as any}
      />
    );
    expect(
      r.find("ReviewComment").everyWhere((n) => n.prop("isResolved") === false)
    ).toBeTrue();
  });
  it('toggling "Show/Hide resolved comments" should show/hide resolved comments', async () => {
    const relay = { environment: null };
    const data = applicationReviewStepWithComments();
    const r = shallow(
      <ReviewSidebar
        isFinalized={false}
        applicationReviewStep={data as ReviewSidebar_applicationReviewStep}
        onClose={() => {}}
        relay={relay as any}
      />
    );
    // Show resolved comments:
    r.find("Button")
      .filterWhere((n) => n.text() === "Show resolved comments")
      .simulate("click");
    expect(
      r
        .find("ReviewComment")
        .someWhere(
          (n) =>
            n.prop("description") === "This is a resolved internal comment."
        )
    ).toBeTrue();
    expect(
      r
        .find("ReviewComment")
        .someWhere(
          (n) => n.prop("description") === "This is a resolved general comment."
        )
    ).toBeTrue();
    // Hide resolved comments:
    r.find("Button")
      .filterWhere((n) => n.text() === "Hide resolved comments")
      .simulate("click");
    expect(
      r
        .find("ReviewComment")
        .someWhere(
          (n) =>
            n.prop("description") === "This is a resolved internal comment."
        )
    ).toBeFalse();
    expect(
      r
        .find("ReviewComment")
        .someWhere(
          (n) => n.prop("description") === "This is a resolved general comment."
        )
    ).toBeFalse();
  });
  it('clicking the "x" button calls the onClose handler', () => {
    const onClose = jest.fn();
    const relay = { environment: null };
    const data = applicationReviewStepWithComments();
    const r = shallow(
      <ReviewSidebar
        isFinalized={false}
        applicationReviewStep={data as ReviewSidebar_applicationReviewStep}
        onClose={onClose}
        relay={relay as any}
      />
    );
    r.find("button#close").simulate("click");
    expect(onClose).toBeCalled();
  });
  it("a confirmation modal is shown when there are unresolved comments on trying to mark the step completed", () => {
    const spy = jest
      .spyOn(
        require("mutations/application_review_step/updateApplicationReviewStepMutation"),
        "default"
      )
      .mockImplementation(() => {});
    const relay = { environment: null };
    const data = applicationReviewStepWithComments();
    const r = mount(
      <ReviewSidebar
        isFinalized={false}
        applicationReviewStep={data as ReviewSidebar_applicationReviewStep}
        onClose={() => {}}
        relay={relay as any}
      />
    );
    r.find("Button#markCompleted").simulate("click");
    expect(r.find("GenericConfirmationModal").exists()).toBeTrue();
    expect(spy).not.toHaveBeenCalled();
  });
  it("no confirmation modal is shown when all comments are resolved and marking the step completed", () => {
    const spy = jest
      .spyOn(
        require("mutations/application_review_step/updateApplicationReviewStepMutation"),
        "default"
      )
      .mockImplementation(() => {});

    const data = applicationReviewStepWithAllCommentsResolved() as ReviewSidebar_applicationReviewStep;
    const relay = { environment: null };
    const r = mount(
      <ReviewSidebar
        isFinalized={false}
        applicationReviewStep={data}
        onClose={() => {}}
        relay={relay as any}
      />
    );
    r.find("Button#markCompleted").simulate("click");
    expect(r.find("GenericConfirmationModal").exists()).toBeFalse();
    expect(spy).toBeCalledWith(null, {
      input: {
        id: "abc",
        applicationReviewStepPatch: {
          isComplete: true,
        },
      },
    });
    expect(
      r.find("Button").filterWhere((n) => n.text() === "Mark incomplete")
    ).toBeTruthy();
  });
  it("marking the review step completed disables the ability to resolve/delete comments", () => {
    const spy = jest
      .spyOn(
        require("mutations/application_review_step/updateApplicationReviewStepMutation"),
        "default"
      )
      .mockImplementation(() => {});
    const relay = { environment: null };
    const data = applicationReviewStepWithComments();
    const r = mount(
      <ReviewSidebar
        isFinalized={false}
        applicationReviewStep={data as ReviewSidebar_applicationReviewStep}
        onClose={() => {}}
        relay={relay as any}
      />
    );
    expect(r.find("ReviewComment").first().prop("viewOnly")).toBeFalse();

    r.find("Button#markCompleted").simulate("click");
    r.find("Button#confirm").simulate("click");
    expect(spy).toBeCalledWith(null, {
      input: {
        id: "abc",
        applicationReviewStepPatch: {
          isComplete: true,
        },
      },
    });
    expect(
      r.find("Button").filterWhere((n) => n.text() === "Mark incomplete")
    ).toBeTruthy();
  });
  it("marking the review step incomplete enables the ability to resolve/delete comments", () => {
    const spy = jest
      .spyOn(
        require("mutations/application_review_step/updateApplicationReviewStepMutation"),
        "default"
      )
      .mockImplementation(() => {});
    const relay = { environment: null };
    const data = {
      ...applicationReviewStepWithComments(),
      isComplete: true,
    };
    const r = shallow(
      <ReviewSidebar
        isFinalized={false}
        applicationReviewStep={data as ReviewSidebar_applicationReviewStep}
        onClose={() => {}}
        relay={relay as any}
      />
    );
    expect(r.find("ReviewComment").first().prop("viewOnly")).toBeTrue();

    r.find(".mark-incomplete Button").simulate("click");
    expect(spy).toBeCalledWith(null, {
      input: {
        id: "abc",
        applicationReviewStepPatch: {
          isComplete: false,
        },
      },
    });
    expect(
      r
        .find("Button")
        .filterWhere((n) => n.text() === "Mark this review step complete")
    ).toBeTruthy();
  });
  it("toggles a modal for adding review comments", () => {
    const relay = { environment: null };
    const r = shallow(
      <ReviewSidebar
        isFinalized={false}
        applicationReviewStep={
          applicationReviewStep() as ReviewSidebar_applicationReviewStep
        }
        onClose={() => {}}
        relay={relay as any}
      />
    );
    expect(r.find("AddReviewCommentModal").prop("show")).toBeFalse();
    r.find("Button#new-comment").simulate("click");
    expect(r.find("AddReviewCommentModal").prop("show")).toBeTrue();
    const modalOnHide: () => void = r
      .find("AddReviewCommentModal")
      .prop("onHide");
    modalOnHide();
    expect(r.find("AddReviewCommentModal").prop("show")).toBeFalse();
  });
  it("saves new review comments and adds them to the application review step", () => {
    const commentText = "this is a test comment";
    const isInternalComment = false;
    const spy = jest
      .spyOn(
        require("mutations/application_review_step/createReviewCommentMutation"),
        "default"
      )
      .mockImplementation(() => {});
    const relay = { environment: null };
    const r = shallow(
      <ReviewSidebar
        isFinalized={false}
        applicationReviewStep={
          applicationReviewStep() as ReviewSidebar_applicationReviewStep
        }
        onClose={() => {}}
        relay={relay as any}
      />
    );
    expect(spy).not.toHaveBeenCalled();
    const modalOnSubmit = r.find("AddReviewCommentModal").prop("onSubmit");
    modalOnSubmit({ commentText, isInternalComment });
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it("sets the title for the add comments modal based on the selected review step", () => {
    const relay = { environment: null };
    const data1 = {
      ...applicationReviewStep(),
      reviewStepByReviewStepId: {
        stepName: "technical",
      },
    };
    const data2 = {
      ...applicationReviewStep(),
      reviewStepByReviewStepId: {
        stepName: "random",
      },
    };
    const r1 = shallow(
      <ReviewSidebar
        isFinalized={false}
        applicationReviewStep={data1 as ReviewSidebar_applicationReviewStep}
        onClose={() => {}}
        relay={relay as any}
      />
    );
    const r2 = shallow(
      <ReviewSidebar
        isFinalized={false}
        applicationReviewStep={data2 as ReviewSidebar_applicationReviewStep}
        onClose={() => {}}
        relay={relay as any}
      />
    );
    expect(
      r1.find("AddReviewCommentModal").prop("title").includes("Technical")
    ).toBeTrue();
    expect(
      r2.find("AddReviewCommentModal").prop("title").includes("Random")
    ).toBeTrue();
  });
});
