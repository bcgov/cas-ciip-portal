import React from "react";
import { shallow } from "enzyme";
import { ReviewComment } from "components/Admin/ApplicationReview/ReviewComment";

describe("ReviewComment", () => {
  it("interactable (viewOnly = false) comments should match the last accepted snapshot", async () => {
    const unresolved = shallow(
      <ReviewComment
        id="abc"
        description="Here is a comment for testing."
        createdAt="2021-04-08T03:01:35.585Z"
        createdBy="Old MacDonald"
        isResolved={false}
        viewOnly={false}
        onResolveToggle={() => {}}
        onDelete={() => {}}
      />
    );
    expect(unresolved).toMatchSnapshot();
    const resolved = shallow(
      <ReviewComment
        id="abc"
        description="Here is a comment for testing."
        createdAt="2021-04-08T03:01:35.585Z"
        createdBy="Old MacDonald"
        isResolved
        viewOnly={false}
        onResolveToggle={() => {}}
        onDelete={() => {}}
      />
    );
    expect(resolved).toMatchSnapshot();
  });
  it("non-interactable (viewOnly) comments should match the last accepted snapshot", async () => {
    const unresolved = shallow(
      <ReviewComment
        id="abc"
        description="Here is a comment for testing."
        createdAt="2021-04-08T03:01:35.585Z"
        createdBy="Old MacDonald"
        isResolved={false}
        viewOnly
        onResolveToggle={() => {}}
        onDelete={() => {}}
      />
    );
    const resolved = shallow(
      <ReviewComment
        id="abc"
        description="Here is a comment for testing."
        createdAt="2021-04-08T03:01:35.585Z"
        createdBy="Old MacDonald"
        isResolved
        viewOnly
        onResolveToggle={() => {}}
        onDelete={() => {}}
      />
    );
    expect(unresolved).toMatchSnapshot();
    expect(resolved).toMatchSnapshot();
  });
  it("clicking Resolve/Unresolve should call the onResolveToggle handler", async () => {
    const onResolveToggle = jest.fn();
    const onUnresolveToggle = jest.fn();
    const unresolved = shallow(
      <ReviewComment
        id="abc"
        description="Here is a comment for testing."
        createdAt="2021-04-08T03:01:35.585Z"
        createdBy="Old MacDonald"
        isResolved={false}
        viewOnly={false}
        onResolveToggle={onResolveToggle}
        onDelete={() => {}}
      />
    );
    const resolved = shallow(
      <ReviewComment
        id="abc"
        description="Here is a comment for testing."
        createdAt="2021-04-08T03:01:35.585Z"
        createdBy="Old MacDonald"
        isResolved
        viewOnly={false}
        onResolveToggle={onUnresolveToggle}
        onDelete={() => {}}
      />
    );
    const resolveBtn = unresolved.find("Button").first();
    expect(resolveBtn.text()).toEqual("Resolve");
    unresolved.find("Button").first().simulate("click");
    expect(onResolveToggle).toBeCalledTimes(1);

    const unresolveBtn = resolved.find("Button").first();
    expect(unresolveBtn.text()).toEqual("Unresolve");
    resolved.find("Button").first().simulate("click");
    expect(onUnresolveToggle).toBeCalledTimes(1);
  });
  it("clicking Delete should call the onDelete handler", async () => {
    const onDelete = jest.fn();
    const r = shallow(
      <ReviewComment
        id="abc"
        description="Here is a comment for testing."
        createdAt="2021-04-08T03:01:35.585Z"
        createdBy="Old MacDonald"
        isResolved={false}
        viewOnly={false}
        onResolveToggle={() => {}}
        onDelete={onDelete}
      />
    );
    const deleteBtn = r.find('Button[aria-label="Delete"]');
    deleteBtn.simulate("click");
    expect(onDelete).toBeCalledTimes(1);
  });
});
