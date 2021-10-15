import React, { ReactElement } from "react";
import { shallow } from "enzyme";
import { DefaultLayoutComponent } from "layouts/default-layout";
import { defaultLayout_session } from "__generated__/defaultLayout_session.graphql";

describe("The DefaultLayout component", () => {
  const session: defaultLayout_session = {
    " $refType": "defaultLayout_session",
    ciipUserBySub: {
      " $fragmentRefs": {
        UserProfileDropdown_user: true,
      },
    },
    userGroups: [],
  };

  it("when logged out matches the last accepted Snapshot", () => {
    const wrapper = shallow(<DefaultLayoutComponent session={null} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("when logged in matches the last accepted Snapshot", () => {
    const wrapper = shallow(<DefaultLayoutComponent session={session} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("passes ciip user to render", () => {
    const wrapper = shallow(<DefaultLayoutComponent session={session} />);

    const userProfileDropdown: ReactElement = wrapper
      .find("HeaderLayout")
      .prop("userProfileDropdown");

    expect(userProfileDropdown.props.user).toEqual(session.ciipUserBySub);
  });
});
